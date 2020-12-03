import { CHECK_ROLE, CREATE_PRODUCT, CREATE_PRODUCT_ERROR, DELETE_PRODUCT, DELETE_PRODUCT_ERROR, FETCH_ADMIN_PRODUCTS, FETCH_ORDERS, FETCH_USERS } from '../types';
import { serverURL } from '../util';

export const checkRole = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    const res = await fetch(serverURL + "/api/user/checkrole", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'token': token,
        },
    });
    const data = await res.json();
    if (data === true) {
        dispatch({
            type: CHECK_ROLE,
            payload: data,
        });
    }
}

export const fetchUsers = () => async (dispatch) => {
    const res = await fetch(serverURL + "/api/user/");
    const data = await res.json();
    dispatch({
        type: FETCH_USERS,
        users: data,
    });
}

export const deleteProductById = (productId) => async (dispatch) => {
    fetch(serverURL + '/api/product/delete', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productId),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data === true) {
                dispatch({
                    type: DELETE_PRODUCT,
                    payload: data
                })
            } else {
                dispatch({
                    type: DELETE_PRODUCT_ERROR,
                    error: data
                })
            }
        });
}

export const createProduct = (product) => async (dispatch) => {
    fetch(serverURL + '/api/product/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data === product) {
                dispatch({
                    type: CREATE_PRODUCT,
                    payload: data
                });
            }
            else {
                dispatch({
                    type: CREATE_PRODUCT_ERROR,
                    error: data
                });
            }
        })
}

export const fetchAdminProducts = () => async (dispatch) => {
    const res = await fetch(serverURL + "/api/product/");
    const data = await res.json();
    dispatch({
        type: FETCH_ADMIN_PRODUCTS,
        payload: data,
    });
}



//Orders Action
export const fetchOrders = () => (dispatch) => {
    fetch(serverURL + '/api/order').then((res) => res.json()).then((data) => {
        dispatch(
            {
                type: FETCH_ORDERS,
                payload: data
            })
    })
}