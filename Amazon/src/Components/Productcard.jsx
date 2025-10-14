import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";

export default function Productcard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <div className="p-image">
        <img src={product.image || `https://via.placeholder.com/200?text=${encodeURIComponent(product.name||product.title)}`} alt={product.name || product.title} />
      </div>
      <div className="p-body">
        <h4 className="p-title">{product.name || product.title}</h4>
        <div className="p-price">₹{(product.price).toLocaleString()}</div>
        <div className="p-actions">
          <button className="btn-yellow" onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          <button className="btn-outline" onClick={() => { dispatch(addToCart(product)); window.location = '/cart'; }}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}