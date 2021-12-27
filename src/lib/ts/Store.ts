import { reactive, readonly } from "vue";

class StoreBase<T> {

    private _state;
    private _actions;

    public constructor(state: StorePropsItem<T extends object ? T : never>) {
        this._state = reactive(state.state());
        this._actions = state.actions;
    }

    public useStore() {
        let func = this._actions;
        return {
            state: readonly(this._state),
            run: (key: keyof typeof func, data: any) => {
                func[key](this._state, data);
            }
        }
    }

}

export function createStore<T>(store: StorePropsItem<T extends object ? T : never>) {
    return new StoreBase(store);
}