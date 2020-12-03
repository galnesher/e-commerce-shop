import { CREATE_USER, CLEAR_REGISTER, LOGIN_USER, LOGOUT_USER } from "../types";


const userReducer = (state = { isLogged: false }, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                user: action.payload,
                isLogged: action.isLogged,
                data: action.data,
            }
        case LOGOUT_USER:
            return {
                user: action.payload,
                isLogged: action.isLogged,
            }
        case CREATE_USER:
            return { user: action.payload }
        case CLEAR_REGISTER:
            return { user: null };
        default:
            return state
    }
}

export { userReducer };