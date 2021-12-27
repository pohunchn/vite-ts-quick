import { createStore } from "@/lib/ts/Store";

const store = createStore({
    state() {
        return {
            count: 0,
            test: "12321"
        }
    },
    actions: {
        aaa(state: any, count: number) {
            return state.count = count;
        }
    }
})

export default function useTestStore() {
    return store.useStore();
}