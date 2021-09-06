import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import { signout } from './ACTIONS/userActions';
import ShippingAddress from './screens/ShippingAddress';
import PaymentMethodScreens from './screens/PaymentMethodScreens';
import PlaceOrder from './screens/PlaceOrder';

function App() {
const cart =useSelector(state=>state.cart);
const cartItems=cart.cartItems;
const userSignIn=useSelector(state=>state.userSignIn);
const {userInfo}=userSignIn;
const dispatch=useDispatch();
const signoutHandler=()=>{
 dispatch(signout());
};
  return (
   <BrowserRouter>
    <div className="grid-container">
     <header className="row">
      <div>
       <Link to="/">amazona</Link>
      </div>
      <div>
       <Link to="/cart">
        Cart
        {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
       </Link>
      </div>
      <div>
       {userInfo ? (
        <div className="dropdown">
         <Link to="#">
          {userInfo.name} <i className="fa fa-caret-down"></i>
         </Link>
         <ul className="dropdown-content">
          <Link to="#signout" onClick={signoutHandler}>
           Sign Out
          </Link>
         </ul>
        </div>
       ) : (
        <Link to="/signin">Sign In</Link>
       )}
      </div>
     </header>

     <main>
      <Route exact path="/product/:id" component={ProductScreen} />
      <Route exact path="/" component={HomeScreen} />
      <Route exact path="/cart/:id?" component={CartScreen} />
      <Route exact path="/register" component={RegisterScreen} />
      <Route exact path="/shipping" component={ShippingAddress} />
      <Route exact path="/payment" component={PaymentMethodScreens} />
      <Route exact path="/placeorder" component={PlaceOrder} />
      <Route exact path="/signin" component={SigninScreen} />
     </main>
     <footer className="row center">All right reserved</footer>
    </div>
   </BrowserRouter>
  );
}

export default App;
