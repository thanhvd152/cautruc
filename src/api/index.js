import { NavigationActions } from 'react-navigation';
let store = null
let navigationState = null
const api = {
    setStore: (newStore) => {
        store = newStore
    },
    setNavigationState: (newNav) => {
        navigationState = newNav
    },
    setUserInfo: (user) => {
        store.dispatch({ type: 'SET_USER_INFO', user })
    },
    setToken: (token) => {
        store.dispatch({ type: 'SET_TOKEN', token })
    },
    push: (routeName, params, action) => {
        navigationState.dispatch(
            NavigationActions.push({
                routeName,
                params,
                action: action,
            })
        )
    },
    reset: (index, actions) => {
        navigationState.dispatch(
            NavigationActions.reset({
                index,
                actions
            })
        )
    },
    reset: (key) => {
        navigationState.dispatch(
            NavigationActions.back({
                key
            })
        )
    },
    pop: () => {
        navigationState.dispatch(
            NavigationActions.pop()
        )
    },
    replace: () => {
        navigationState.dispatch(
            NavigationActions.replace({
                key,
                newKey,
                routeName,
                params,
                action
            })
        )
    }
}

export default api;