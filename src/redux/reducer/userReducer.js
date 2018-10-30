let initialState = {
    token: "",
    user: {

    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return Object.assign({}, state, {
                user: action.user
            })
        case 'SET_TOKEN':
            return Object.assign({}, state, {
                token: action.token
            })
        default:
            return state
    }
}

export default userReducer;