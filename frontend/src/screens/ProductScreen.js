import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { detailsProduct } from '../ACTIONS/productActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import Raiting from '../components/Raiting';

function ProductScreen(props) {

    const dispatch=useDispatch();
    const productId=props.match.params.id;
    const [qty,setQty]=useState(1);
    const productDetails=useSelector(state=>state.productDetails);
    const {loading,error,product}=productDetails;
    useEffect(()=>{
       dispatch(detailsProduct(productId));
    },[dispatch,productId]);
    const addToCartHandler=()=>{
       props.history.push(`/cart/${productId}?qty=${qty}`)
    }
    return (
     <div>
      {loading ? (
       <Loading />
      ) : error ? (
       <MessageBox variant="danger">{error}</MessageBox>
      ) : (
       <div>
        <Link to="/">Back To Result</Link>
        <div className="row top">
         <div className="col-2">
          <img src={product.image} alt={product.name} />
         </div>
         <div className="col-1">
          <ul>
           <li>
            <h1>{product.name}</h1>
           </li>
           <li>
            <Raiting rating={product.rating} numReviews={product.numReviews} />
           </li>
           <li>Price:${product.price}</li>
           <li>
            Description:
            <p>{product.description}</p>
           </li>
          </ul>
         </div>
         <div className="col-1">
          <div className="card card-body">
           <ul>
            <li>
             <div className="row">
              <div>Price</div>
              <div className="price">${product.price}</div>
             </div>
            </li>
            <li>
             <div className="row">
              <div>Status</div>
              <div>
               {product.countInStock > 0 ? (
                <span className="success">In Stock</span>
               ) : (
                <span className="danger">Unavailable</span>
               )}
              </div>
             </div>
            </li>
            {product.countInStock>0&&(
               <>
               <li>
                  <div className="row">
                     <div>Qty</div>
                     <div>
                        <select value={qty} onChange={(e)=>setQty(e.target.value)}>
                        {[...Array(product.countInStock).fill().map((_,i)=>(
                           <option key={i+1} value={i+1}>{i+1}</option>
                        ))]}
                        </select>
                     </div>
                  </div>
               </li>
             <li>
             <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
            </li>

               </>
            )}
           </ul>
          </div>
         </div>
        </div>
       </div>
      )}
     </div>
    );
}

export default ProductScreen;
