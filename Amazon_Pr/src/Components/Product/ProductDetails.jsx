import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails, addToCart } from '../../Services/actions/productActions'

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { product, loading, error } = useSelector(state => state.productDetails)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [dispatch, id])

  const handleAddToCart = () => {
    dispatch(addToCart(product, quantity))
    alert('Product added to cart!')
  }

  const renderRatingStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span 
        key={i} 
        className={`fa fa-star ${i < Math.floor(rating) ? 'text-warning' : 'text-muted'}`}
      ></span>
    ))
  }

  if (loading) return (
    <div className="container text-center mt-4 py-5">
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading product details...</p>
    </div>
  )
  
  if (error) return (
    <div className="container alert alert-danger mt-4 text-center">
      <i className="fas fa-exclamation-triangle me-2"></i>
      {error}
    </div>
  )
  
  if (!product) return (
    <div className="container alert alert-warning mt-4 text-center">
      <i className="fas fa-search me-2"></i>
      Product not found
    </div>
  )

  // Mock multiple images for demonstration
  const productImages = [
    product.image,
    "https://m.media-amazon.com/images/I/41X9qNxoJKL._SR480,440_.jpg",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300"
  ]

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Product Images */}
        <div className="col-md-6">
          <div className="row">
            <div className="col-3">
              {productImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`img-thumbnail mb-2 cursor-pointer ${selectedImage === index ? 'border-warning' : ''}`}
                  alt={`${product.title} view ${index + 1}`}
                  style={{ cursor: 'pointer', height: '80px', objectFit: 'cover' }}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
            <div className="col-9">
              <img 
                src={productImages[selectedImage]} 
                className="img-fluid rounded" 
                alt={product.title}
              />
            </div>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="col-md-6">
          <h2 className="mb-3">{product.title}</h2>
          
          <div className="mb-3">
            <div className="d-flex align-items-center mb-2">
              {renderRatingStars(product.rating?.rate || product.rating)}
              <span className="ms-2 text-primary">
                {product.rating?.count || 0} ratings
              </span>
            </div>
          </div>
          
          <hr />
          
          <div className="mb-4">
            <h3 className="text-success mb-2">₹{product.price.toLocaleString()}</h3>
            {product.originalPrice && (
              <div>
                <span className="text-muted text-decoration-line-through me-2">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-success">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                </span>
              </div>
            )}
            <small className="text-muted">Inclusive of all taxes</small>
          </div>
          
          <div className="mb-4">
            <h5 className="mb-3">About this item</h5>
            <p className="text-muted">{product.description}</p>
          </div>
          
          <div className="mb-4">
            <div className="row">
              <div className="col-6">
                <strong>Brand</strong>
                <p>{product.brand}</p>
              </div>
              <div className="col-6">
                <strong>Category</strong>
                <p className="text-capitalize">{product.category}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="form-label fw-bold">Quantity:</label>
            <select 
              className="form-select w-auto"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <div className="d-grid gap-2">
            <button 
              className="btn btn-warning btn-lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            
            <button className="btn btn-outline-secondary btn-lg">
              Buy Now
            </button>
          </div>
          
          <div className="mt-4">
            <div className="card">
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fas fa-shipping-fast text-success me-2"></i>
                  Delivery Options
                </h6>
                <p className="mb-1">
                  <strong>FREE delivery</strong> on orders over ₹500
                </p>
                <p className="mb-0 text-muted">
                  Delivery in 2-4 business days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails