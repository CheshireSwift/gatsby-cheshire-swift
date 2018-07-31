declare const graphql: (query: TemplateStringsArray) => void;

declare type Nullable<T> = T | null;
declare type Option<T> = T | null | undefined;

declare namespace jest {
  interface Matchers<R> {
    toContainSelector(expected: string): R;
  }
}
