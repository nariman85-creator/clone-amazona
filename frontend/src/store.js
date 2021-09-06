import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { productDetailsReducer, productListReducer } from './reducers/productReducer';
import {cartReducer} from './reducers/cartReducers';
import { userSignInReducer,userRegisterReducer } from './reducers/userReducer';
import { orderReducers } from './reducers/orderReducers';

const initialState={
    userSignIn:{
        userInfo:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null
    },
    cart:{
        cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
        shippingAddress:localStorage.getItem("shippingAddress")?JSON.parse(localStorage.getItem("shippingAddress")):{},
        paymentMethod:'PayPal'
    },
};

const reducer = combineReducers({
 productList: productListReducer,
 productDetails: productDetailsReducer,
 cart:cartReducer,
 userSignIn:userSignInReducer,
 userRegister:userRegisterReducer,
 orderCreated:orderReducers,
});

const composeEnnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;
const store =createStore(reducer,
    initialState,
    composeEnnhancer(applyMiddleware(thunk)));
export default store;