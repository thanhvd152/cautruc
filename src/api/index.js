import { NavigationActions } from 'react-navigation';
import { Dimensions } from 'react-native'
let store = null
let navigationState = null
var deviceWidth = Dimensions.get('window').width
var deviceHeight = Dimensions.get('window').height
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
    navigate: (routeName, params, action) => {
        navigationState.dispatch(
            NavigationActions.navigate({
                routeName,
                params,
                action: action,
            })
        )
    },
    showLoading: () => {
        navigationState.dispatch(
            NavigationActions.navigate({
                routeName: 'loading',
            })
        )
    },
    showMessage: (content, title) => {
        navigationState.dispatch(
            NavigationActions.navigate({
                routeName: 'message',
                params: { content, title }
            })
        )
    },
    reset: (index, route) => {
        navigationState.dispatch(
            NavigationActions.reset({
                index: index,
                actions: [NavigationActions.navigate({ routeName: route })],
            })
        )
    },
    pop: () => {
        navigationState.pop()
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
    },
    getRealDeviceHeight: () => {
        return deviceHeight
    },
    getRealDeviceWidth: () => {
        return deviceWidth
    },
}

export default api;