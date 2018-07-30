import { warn, message, danger, fail, GitHubUser } from 'danger';
import * as _ from 'lodash';

const { git, github } = danger;
const { commits, modified_files, created_files, deleted_files } = git;
const { pr } = github;
const allFiles = _.sortBy(
  [
    ...created_files.map(file => `+ ${file}`),
    ...modified_files.map(file => `  ${file}`),
    ...deleted_files.map(file => `- ${file}`),
  ],
  line => line.substring(2),
);
const assigneeId = pr.assignee && pr.assignee.id;
const fileChanged = path => modified_files.includes(path);
const output = (title, suggestion) =>
  `<details><summary>${title}</summary><i>${suggestion}</i></details>`;

// The typedefs for requested_reviewers are incorrect (assume it's just GHUser[])
const categorisedReviewers = github.requested_reviewers as any;
const requestedReviewers: GitHubUser[] = categorisedReviewers.users;

const samId = 4071936;
function Danger() {
  if (
    modified_files.includes('dangerfile.ts') &&
    !(
      pr.user.id === samId || requestedReviewers.find(user => user.id === samId)
    )
  ) {
    fail(':bowtie: Nice try.');
    return;
  }

  checkCommitMeta();
  checkPrMeta();
  checkChangeContents();
}

function checkChangeContents() {
  const packageChanged = fileChanged('package.json');
  const lockfileChanged = fileChanged('package-lock.json');
  if (packageChanged && !lockfileChanged) {
    warn(
      output(
        'Changes were made to package.json, but not to package-lock.json',
        'Perhaps you need to run `npm install`?',
      ),
    );
  }
  // Warn when there is a big PR
  const bigPRThreshold = 250;
  const totalChanges = pr.additions + pr.deletions;
  if (totalChanges > bigPRThreshold) {
    warn(
      output(
        `This PR touches ${totalChanges} lines`,
        'Could it be split into smaller chunks to make reviewing easier?',
      ),
    );
  }
}

function checkCommitMeta() {
  const modifiedMD = allFiles.join('\n');
  message('Changed Files in this PR\n```diff\n' + modifiedMD + '\n```');

  const [testFiles, codeFiles] = _(created_files)
    .map(file => file.match(/.+\.[tj]sx?$/)[0])
    .filter(_.identity)
    .partition(fileName => fileName.match(/\.test\./))
    .value();

  const filesMissingTests = _.reject(codeFiles, fileName =>
    _.some(testFiles, testFileName => testFileName.startsWith(fileName)),
  );

  if (filesMissingTests.length) {
    warn(
      output(
        `There are ${
          filesMissingTests.length
        } new files that do not appear to have tests`,
        `The files were:<pre>${filesMissingTests.join('\n')}</pre>`,
      ),
    );
  }

  commits.forEach(checkIndividualCommits);
}

function checkIndividualCommits(commit) {
  const { sha } = commit;
  const [firstLine, otherLines] = commit.message.split('\n');
  const firstChar = firstLine.substring(0, 1);
  const lastChar = firstLine.substring(firstLine.length - 1);
  const summary = `${sha} <i>"${_.truncate(firstLine)}"</i>`;
  if (firstChar !== firstChar.toUpperCase()) {
    fail(
      output(
        `The commit message for ${summary} starts with a lowercase character.`,
        'Commit titles should start with an uppercase character (or a symbol).',
      ),
    );
  }

  if (lastChar.match(/\W/)) {
    warn(
      output(
        `The first line of the commit message for ${summary} ends with a non-alphanumeric character.`,
        'Commit titles should not end with punctuation.',
      ),
    );
  }

  if (firstLine.length > 50) {
    warn(
      output(
        `The first line of the commit message for ${summary} is quite long.`,
        'Long titles on commit messages can be hard to read.',
      ),
    );
  }

  if (!!_.get(otherLines, 0)) {
    fail(
      output(
        `There is text in the second line of the commit message for ${summary}.`,
        "It's easier to read if there's an empty line between the title and body.",
      ),
    );
  }
}

function checkPrMeta() {
  // No PR is too small to warrant a short summary
  if (!pr.body || pr.body.length < 10) {
    fail(
      output(
        'This pull request does not have a description of its intention or impact.',
        "It's helpful to reviewers to describe the effect of the change in the PR.",
      ),
    );
  }

  const reviewerCount = requestedReviewers.length;
  if (assigneeId !== samId || reviewerCount < 2) {
    warn(
      output(
        'Please assign Sam to merge this PR, and include people who should review.',
        'Assignment + review requests are on the right of the PR page.',
      ),
    );
  }

  const issueRegex = /(#|\bGH-)\d+\b/;
  const foundIssue = pr.title.match(issueRegex) || pr.body.match(issueRegex);
  if (!foundIssue) {
    warn(
      output(
        "It doesn't look like the pull request references a GitHub issue.",
        'Is this fixing an issue? If so, you can reference it as #issuenumber in the PR.',
      ),
    );
  }
}

Danger();
