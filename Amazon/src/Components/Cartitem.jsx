import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../Redux/cartSlice";

export default function Cartitem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img src={item.image || `https://via.placeholder.com/120?text=${encodeURIComponent(item.name)}`} alt={item.name} />
      <div className="cart-info">
        <h5>{item.name}</h5>
        <div className="cart-price">₹{item.price.toLocaleString()}</div>
        <div className="cart-controls">
          <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
          <span>{item.qty}</span>
          <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
          <button className="remove" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        </div>
      </div>
      <div className="cart-subtotal">₹{(item.price * item.qty).toLocaleString()}</div>
    </div>
  );
}