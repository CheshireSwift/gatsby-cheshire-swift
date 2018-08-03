declare const graphql: (query: TemplateStringsArray) => void;

declare namespace jest {
  interface Matchers<R> {
    toContainSelector(expected: string): R;
  }
}

declare type Nullable<T> = T | null;
declare type Optional<T> = T | null | undefined;
