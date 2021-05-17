import Base from "@/lib/ts/Base";
import { InjectionKey } from "vue"
import { loadModules, context, modules } from "./modules"
import { createStore, useStore as baseUseStore, Store, createLogger } from "vuex"

export interface State {
    [key: string]: any
}

export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore({
    modules,
    strict: Base.IS_DEV,
    plugins: Base.IS_DEV ? [createLogger()] : []
});

export function useStore() {
    // return baseUseStore(key);
    return baseUseStore();
}

// 热重载
if (import.meta.hot) {
    import.meta.hot?.accept(context.id, () => {
        const { modules } = loadModules()
        store.hotUpdate({
            modules
        })
    })
}

export default store;