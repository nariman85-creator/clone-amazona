import React, { useEffect } from 'react';
import Product from '../components/Product';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../ACTIONS/productActions';

function HomeScreen() {
  const productList=useSelector(state=>state.productList);
  const dispatch=useDispatch();
  const {loading,error,products}=productList;
  useEffect(()=>{
    dispatch(listProducts());
  },[]);

    return (
     <div>

      {loading ? (
       <Loading />
      ) : error ? (
       <MessageBox variant="danger">{error}</MessageBox>
      ) : (
       <div className="row center">
        {products.map((product) => (
         <Product key={product._id} product={product} />
        ))}
       </div>
      )}
     </div>
    );
}

export default HomeScreen
