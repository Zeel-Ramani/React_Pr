import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../Services/actions/authActions'
import { setSearchQuery } from '../../Services/actions/productActions'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.cart)
  const { filters } = useSelector(state => state.productList)
  
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || '')

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(setSearchQuery(searchQuery))
    navigate('/')
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-amazon-dark py-2">
        <div className="container">
          <Link className="navbar-brand me-3" to="/">
            <span className="text-warning fw-bold fs-3">amazon</span>
          </Link>

          <div className="text-white me-3 delivery-location">
            <div className="small text-secondary">Deliver to</div>
            <div className="fw-bold">
              <i className="fas fa-map-marker-alt me-1"></i>
              India
            </div>
          </div>

          <form className="d-flex flex-grow-1 me-3" onSubmit={handleSearch}>
            <div className="input-group">
              <select className="form-select bg-light">
                <option>All</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home</option>
              </select>
              <input
                type="text"
                className="form-control"
                placeholder="Search Amazon.in"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
              />
              <button className="btn btn-warning" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>

          {/* Language */}
          <div className="dropdown me-3">
            <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
              <i className="fas fa-flag me-1"></i>
              EN
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">English</a></li>
              <li><a className="dropdown-item" href="#">Hindi</a></li>
            </ul>
          </div>

          {/* User Account */}
          <div className="dropdown me-3">
            <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
              <div className="text-start">
                <div className="small">{userInfo ? `Hello, ${userInfo.name}` : 'Hello, sign in'}</div>
                <div className="fw-bold">Account & Lists</div>
              </div>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {userInfo ? (
                <>
                  <li><span className="dropdown-item-text small">Welcome, {userInfo.name}</span></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/profile">Your Profile</Link></li>
                  <li><Link className="dropdown-item" to="/orders">Your Orders</Link></li>
                  {userInfo.isAdmin && (
                    <li><Link className="dropdown-item" to="/add-product">Add Product</Link></li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Sign Out</button></li>
                </>
              ) : (
                <>
                  <li><Link className="dropdown-item" to="/login">Sign in</Link></li>
                  <li><Link className="dropdown-item" to="/register">New customer? Start here</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Returns & Orders */}
          <Link className="btn btn-outline-light me-3" to="/orders">
            <div className="text-start">
              <div className="small">Returns</div>
              <div className="fw-bold">& Orders</div>
            </div>
          </Link>

          {/* Cart */}
          <Link className="btn btn-outline-light position-relative" to="/cart">
            <i className="fas fa-shopping-cart fa-lg"></i>
            <span className="fw-bold ms-1">Cart</span>
            {cartItemsCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Secondary Nav */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-amazon-secondary py-1">
        <div className="container">
          <div className="navbar-nav flex-row">
            <div className="nav-item dropdown">
              <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <i className="fas fa-bars me-1"></i>
                All
              </button>
              <ul className="dropdown-menu">
                <li><h6 className="dropdown-header">Shop By Category</h6></li>
                <li><a className="dropdown-item" href="#">Electronics</a></li>
                <li><a className="dropdown-item" href="#">Fashion</a></li>
                <li><a className="dropdown-item" href="#">Home & Kitchen</a></li>
                <li><a className="dropdown-item" href="#">Books</a></li>
              </ul>
            </div>
            <a className="nav-link" href="#">Today's Deals</a>
            <a className="nav-link" href="#">Customer Service</a>
            <a className="nav-link" href="#">Registry</a>
            <a className="nav-link" href="#">Gift Cards</a>
            <a className="nav-link" href="#">Sell</a>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header