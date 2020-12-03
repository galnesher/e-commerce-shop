import { CLEAR_CART, CLEAR_ORDER, CREATE_ORDER } from "../types"
import { serverURL } from "../util";

export const createOrder = (order) => (dispatch) => {
    const token = localStorage.getItem('token');
    fetch(serverURL + '/api/order/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'token': token,
        },
        body: JSON.stringify(order),
    })
        .then((res) => res.json())
        .then((data) => {
            dispatch({ type: CREATE_ORDER, payload: data });
            localStorage.removeItem("cartItems");
            dispatch(
                { type: CLEAR_CART });
        });
};

export const clearOrder = () => (dispatch) => {
    dispatch({ type: CLEAR_ORDER });
};



