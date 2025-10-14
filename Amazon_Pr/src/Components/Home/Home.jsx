import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
  getProducts, 
  setCategoryFilter, 
  setPriceFilter, 
  setRatingFilter, 
  clearFilters,
  deleteProduct 
} from '../../Services/actions/productActions'
import ProductCard from '../Product/ProductCard'

const Home = () => {
  const dispatch = useDispatch()
  const { products, filteredProducts, loading, error, filters } = useSelector(state => state.productList)
  const { userInfo } = useSelector(state => state.auth)
  
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const handleCategoryChange = (category) => {
    dispatch(setCategoryFilter(category))
  }

  const handlePriceChange = (priceRange) => {
    dispatch(setPriceFilter(priceRange))
  }

  const handleRatingChange = (rating) => {
    dispatch(setRatingFilter(rating))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId))
    }
  }

  const getSortedProducts = () => {
    const productsToSort = [...filteredProducts]
    
    switch (sortBy) {
      case 'price-low':
        return productsToSort.sort((a, b) => a.price - b.price)
      case 'price-high':
        return productsToSort.sort((a, b) => b.price - a.price)
      case 'rating':
        return productsToSort.sort((a, b) => b.rating.rate - a.rating.rate)
      default:
        return productsToSort
    }
  }

  const sortedProducts = getSortedProducts()

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-lg-3 d-none d-lg-block">
          <div className="card shadow-sm">
            <div className="card-header bg-warning">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Filters</h5>
                <button className="btn btn-sm btn-outline-dark" onClick={handleClearFilters}>
                  Clear All
                </button>
              </div>
            </div>
            <div className="card-body">
              {/* Category Filter */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Category</h6>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="category" 
                    checked={filters.category === 'all'} 
                    onChange={() => handleCategoryChange('all')}
                  />
                  <label className="form-check-label">All Categories</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="category" 
                    checked={filters.category === 'electronics'} 
                    onChange={() => handleCategoryChange('electronics')}
                  />
                  <label className="form-check-label">Electronics</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="category" 
                    checked={filters.category === 'fashion'} 
                    onChange={() => handleCategoryChange('fashion')}
                  />
                  <label className="form-check-label">Fashion</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="category" 
                    checked={filters.category === 'home'} 
                    onChange={() => handleCategoryChange('home')}
                  />
                  <label className="form-check-label">Home & Kitchen</label>
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Price Range</h6>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="price" 
                    checked={filters.priceRange.min === 0 && filters.priceRange.max === 1000}
                    onChange={() => handlePriceChange({ min: 0, max: 1000 })}
                  />
                  <label className="form-check-label">Under ₹1000</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="price" 
                    checked={filters.priceRange.min === 1000 && filters.priceRange.max === 5000}
                    onChange={() => handlePriceChange({ min: 1000, max: 5000 })}
                  />
                  <label className="form-check-label">₹1000 - ₹5000</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="price" 
                    checked={filters.priceRange.min === 5000 && filters.priceRange.max === 10000}
                    onChange={() => handlePriceChange({ min: 5000, max: 10000 })}
                  />
                  <label className="form-check-label">₹5000 - ₹10000</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="price" 
                    checked={filters.priceRange.min === 10000 && filters.priceRange.max === 50000}
                    onChange={() => handlePriceChange({ min: 10000, max: 50000 })}
                  />
                  <label className="form-check-label">Over ₹10000</label>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Customer Rating</h6>
                {[4, 3, 2, 1].map(rating => (
                  <div key={rating} className="form-check">
                    <input className="form-check-input" type="radio" name="rating" 
                      checked={filters.minRating === rating}
                      onChange={() => handleRatingChange(rating)}
                    />
                    <label className="form-check-label">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`fas fa-star ${i < rating ? 'text-warning' : 'text-muted'}`}></span>
                      ))} & Up
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Product Button for Admin */}
          {userInfo?.isAdmin && (
            <div className="mt-3">
              <Link to="/add-product" className="btn btn-success w-100">
                <i className="fas fa-plus me-2"></i>
                Add New Product
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Filter Button */}
        <div className="col-12 d-lg-none mb-3">
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary w-100" onClick={() => setShowFilters(!showFilters)}>
              <i className="fas fa-filter me-2"></i>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <select className="form-select w-auto" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="col-12 d-lg-none mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Filters</h5>
                {/* Mobile filter content same as desktop */}
              </div>
            </div>
          </div>
        )}

        {/* Products Section */}
        <div className="col-lg-9">
          {/* Hero Banner */}
          <div className="hero-banner mb-4 p-4 bg-warning text-dark rounded">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h1 className="fw-bold">Welcome to Amazon Clone</h1>
                <p className="lead">Shop the latest products at great prices</p>
                <button className="btn btn-dark btn-lg">Shop Now</button>
              </div>
              <div className="col-md-4 text-center">
                <i className="fas fa-shopping-bag fa-6x opacity-75"></i>
              </div>
            </div>
          </div>

          {/* Products Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>{filters.searchQuery ? `Search: "${filters.searchQuery}"` : 'Featured Products'}</h2>
            <div className="d-flex align-items-center gap-3">
              <span className="text-muted">{sortedProducts.length} products</span>
              <select className="form-select w-auto d-none d-lg-block" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.category !== 'all' || filters.minRating > 0 || filters.searchQuery) && (
            <div className="mb-3">
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <strong>Active Filters:</strong>
                {filters.searchQuery && (
                  <span className="badge bg-primary">
                    Search: {filters.searchQuery}
                    <button className="btn-close btn-close-white ms-1" onClick={() => dispatch(setSearchQuery(''))}></button>
                  </span>
                )}
                {filters.category !== 'all' && (
                  <span className="badge bg-success">
                    Category: {filters.category}
                    <button className="btn-close btn-close-white ms-1" onClick={() => handleCategoryChange('all')}></button>
                  </span>
                )}
                {filters.minRating > 0 && (
                  <span className="badge bg-warning text-dark">
                    Rating: {filters.minRating}+
                    <button className="btn-close ms-1" onClick={() => handleRatingChange(0)}></button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading products...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h4>No products found</h4>
              <p>Try adjusting your search or filters</p>
              <button className="btn btn-warning" onClick={handleClearFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="row">
              {sortedProducts.map(product => (
                <div key={product.id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                  <ProductCard 
                    product={product} 
                    onDelete={userInfo?.isAdmin ? handleDeleteProduct : null}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home