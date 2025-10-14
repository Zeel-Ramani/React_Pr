import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";

export default function Header() {
  const items = useSelector((state) => state.cart.items || []);
  const totalCount = items.reduce((s, i) => s + (i.qty || 0), 0);

  return (
    <header className="amz-header">
      <div className="amz-topbar">
        <Link to="/" className="amz-logo">mini<span>amazon</span></Link>
        <nav className="amz-nav">
          <Link to="/" className="amz-link">Home</Link>
          <Link to="/cart" className="amz-cart">
            <FiShoppingCart size={20} />
            <span className="amz-cart-text">Cart</span>
            {totalCount > 0 && <span className="amz-badge">{totalCount}</span>}
          </Link>
        </nav>
      </div>
      <div className="amz-searchbar">
        <div className="amz-search-left">Deliver to India</div>
        <div className="amz-search-center">
          <input placeholder="Search for products, brands and more" />
          <button>Search</button>
        </div>
        <div className="amz-search-right">Hello, Guest</div>
      </div>
    </header>
  );
}