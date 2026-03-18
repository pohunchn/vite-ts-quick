type BroadcastOptions<F extends (...args: any) => any> = Readonly<{
  send: (...args: Parameters<F>) => void;
  on: (callback: (...args: Parameters<F>) => void) => () => void;
  once: (callback: (...args: Parameters<F>) => void) => void;
  off: (callback: (...args: Parameters<F>) => void) => void;
}>;

type BroadcastManager<T = any> = Readonly<
  T extends never
    ? never
    : {
        [K in keyof T]: T[K] extends (...args: any) => any
          ? BroadcastOptions<T[K]>
          : BroadcastManager<T[K]>;
      }
>;
