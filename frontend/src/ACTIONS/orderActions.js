import Axios from "../../node_modules/axios/index";
import { CART_EMPTY } from "../constants/cartConstants";
import {
 ORDER_CREATE_FAIL,
 ORDER_CREATE_REGUEST,
 ORDER_CREATE_SUCCESS,
} from '../constants/orderConstats';

export const createOrder=(order)=>async(dispatch,getState)=>{
    dispatch({ type: ORDER_CREATE_REGUEST, payload: order });
    try{
        const {userSignIn:{userInfo}}=getState();
        const {data}=await Axios.post('/api/orders',order,{
            headers:{
                'Authorization':`Bearer ${userInfo.token}`,
            }
        });
        dispatch({type:ORDER_CREATE_SUCCESS,payload:data.order});
        dispatch({type:CART_EMPTY});
        localStorage.removeItem('cartItems')

    }catch(error){
        dispatch({type:ORDER_CREATE_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
}