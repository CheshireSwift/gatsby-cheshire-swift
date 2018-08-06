// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, boundActionCreators }) => {
  // For some weird reason the editor doesn't know this syntax
  // Please leave this here
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    if (page.path.match(/^\/indexViktor/)) {
      // It's assumed that `landingPage.js` exists in the `/layouts/` directory
      page.layout = 'indexViktor';

      // Update the page.
      createPage(page);
    }

    resolve();
  });
};
