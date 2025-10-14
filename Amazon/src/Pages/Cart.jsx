import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Cartitem from "../Components/Cartitem";
import { clearCart } from "../Redux/cartSlice";

export default function Cart() {
  const items = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <section className="cart-section">
      <div className="cart-left">
        <h2>Shopping Cart</h2>
        {items.length === 0 ? <p className="muted">Your cart is empty.</p> : items.map(it => <Cartitem key={it.id} item={it} />)}
      </div>
      <aside className="cart-right">
        <div className="cart-summary">
          <h4>Order Summary</h4>
          <div className="summary-row"><span>Items</span><span>{items.reduce((s,i) => s + i.qty, 0)}</span></div>
          <div className="summary-row total"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
          <button className="btn-yellow" onClick={() => { if (items.length === 0) return alert('Cart empty'); dispatch(clearCart()); alert('Thanks for purchase!'); }}>Proceed to Buy</button>
        </div>
      </aside>
    </section>
  );
}