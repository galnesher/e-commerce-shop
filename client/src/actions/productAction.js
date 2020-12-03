import { FETCH_PRODUCTS } from '../types';
import { serverURL } from '../util';



export const fetchProducts = () => async (dispatch) => {
    const res = await fetch(serverURL + "/api/product/");
    const data = await res.json();
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
    });
}



