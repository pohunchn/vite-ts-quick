interface StoreUser {
    text: string
}

const state: StoreUser = {
    text: "未修改"
}

const mutations = {
    setText(state: StoreUser, payload: AnyObject) {
        state.text = payload.text;
    }
}

const actions = {
    setText(context: any, payload: AnyObject) {
        context.commit("setText", payload);
    }
}

const getters =  {
    getText(state: StoreUser) {
        return state.text
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}