export interface BaseAction<T extends Array<unknown>, R> {
  run: (...args: T) => R;
}
