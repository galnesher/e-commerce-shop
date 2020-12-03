import { CLEAR_REGISTER, CREATE_USER, LOGIN_USER, LOGOUT_USER } from "../types";
import { setUserDetailsStorage, RemoveUserDetailsStorage, serverURL } from '../util'

export const loginUser = (user) => (dispatch) => {
    fetch(serverURL + `/api/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then((res) => res.json())
        .then((data) => {
            if (data.token) {
                setUserDetailsStorage(data)
            }
            const token = localStorage.getItem('token');
            if (token) {

                dispatch(
                    {
                        type: LOGIN_USER,
                        payload: token,
                        data: data.user,
                        isLogged: true
                    }
                )
            }
            else
                dispatch({
                    type: LOGIN_USER,
                    payload: data,
                    isLogged: false
                })

        })
}


export const logoutUser = () => (dispatch) => {
    RemoveUserDetailsStorage()
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch({
            type: LOGOUT_USER,
            payload: {},
            isLogged: false,
            isAdmin: false,
        })
    } else {
        dispatch({
            isLogged: true
        })
    }
}


export const createUser = (user) => (dispatch) => {
    fetch(serverURL + `/api/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then((res) => res.json())
        .then((data) => {
            dispatch(
                {
                    type: CREATE_USER,
                    payload: data,
                }
            )
        })
}

export const clearRegister = () => (dispatch) => {
    dispatch({ type: CLEAR_REGISTER });
}





