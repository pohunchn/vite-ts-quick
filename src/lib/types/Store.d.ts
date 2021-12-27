interface StorePropsItem<T> {
    state: () => T;
    // actions: {[key: string]: (state: T, data: any) => void};
    actions: {[key: string]: Function}
}
