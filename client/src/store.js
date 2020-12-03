import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';
import { orderReducer } from './reducers/orderRducers';
import { productsReducer } from './reducers/productsReducer';
import { userReducer } from './reducers/userReducer';
import { adminReducer } from './reducers/adminReducer';



const initailState = { user: { isLogged: localStorage.getItem('token') ? true : false } };
const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        products: productsReducer,
        cart: cartReducer,
        user: userReducer,
        order: orderReducer,
        admin: adminReducer,
    }),
    initailState,

    composeEnhancer(applyMiddleware(thunk))
);

export default store;