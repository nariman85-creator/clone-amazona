import React from 'react';
import {Link} from 'react-router-dom';
import Raiting from './Raiting';

const Product=({product})=>{
    return (
     <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
       <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
       <Link to={`/product/${product._id}`}>
        <h2>{product.name}</h2>
       </Link>
       <Raiting rating={product.rating} numReviews={product.numReviews} />
       <div className="price">
        $<span>{product.price}</span>
       </div>
      </div>
     </div>
    );
}
export default Product;