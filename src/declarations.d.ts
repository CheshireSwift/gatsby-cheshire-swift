declare const graphql: (query: TemplateStringsArray) => void;

declare namespace jest {
  interface Matchers<R> {
    toContainSelector(expected: string): R;
  }
}
