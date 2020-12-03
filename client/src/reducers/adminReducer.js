import { CHECK_ROLE, CREATE_PRODUCT, FETCH_ORDERS, FETCH_USERS, CREATE_PRODUCT_ERROR, DELETE_PRODUCT, DELETE_PRODUCT_ERROR, FETCH_ADMIN_PRODUCTS } from "../types";


const adminReducer = (state = { isAdmin: false }, action) => {
    switch (action.type) {
        case CHECK_ROLE:
            return { isAdmin: action.payload }
        case FETCH_USERS:
            return {
                users: action.users,
                isAdmin: true
            }
        case CREATE_PRODUCT:
            return {
                productCreated: action.payload,
                isAdmin: true
            }
        case CREATE_PRODUCT_ERROR:
            return {
                productCreated: action.error,
                isAdmin: true

            }
        case DELETE_PRODUCT:
            return {
                productDeleted: action.payload,
                isAdmin: true
            }
        case DELETE_PRODUCT_ERROR:
            return {
                productDeleted: action.error,
                isAdmin: true
            }
        case FETCH_ADMIN_PRODUCTS:
            return {
                products: action.payload,

            }

        case FETCH_ORDERS:
            return {
                orders: action.payload,
                isAdmin: true
            }
        default:
            return state
    }
}



export { adminReducer };