import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createProduct, updateProduct, getProductDetails } from '../../Services/actions/productActions'

const ProductForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  
  const { product, loading } = useSelector(state => state.productList)
  const { userInfo } = useSelector(state => state.auth)
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    originalPrice: '',
    description: '',
    category: 'electronics',
    brand: '',
    inStock: true,
    features: [''],
    specifications: {
      "Material": '',
      "Color": '',
      "Weight": ''
    }
  })

  const isEdit = Boolean(id)

  useEffect(() => {
    if (isEdit) {
      dispatch(getProductDetails(id))
    }
  }, [dispatch, id, isEdit])

  useEffect(() => {
    if (isEdit && product) {
      setFormData({
        title: product.title || '',
        price: product.price || '',
        originalPrice: product.originalPrice || '',
        description: product.description || '',
        category: product.category || 'electronics',
        brand: product.brand || '',
        inStock: product.inStock !== undefined ? product.inStock : true,
        features: product.features || [''],
        specifications: product.specifications || {
          "Material": '',
          "Color": '',
          "Weight": ''
        }
      })
    }
  }, [product, isEdit])

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/')
    }
  }, [userInfo, navigate])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSpecChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value
      }
    }))
  }

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }))
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const productData = {
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      features: formData.features.filter(f => f.trim() !== '')
    }

    if (isEdit) {
      dispatch(updateProduct(id, productData))
    } else {
      dispatch(createProduct(productData))
    }
    
    navigate('/')
  }

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-warning text-dark">
              <h4 className="mb-0">
                <i className="fas fa-box me-2"></i>
                {isEdit ? 'Edit Product' : 'Add New Product'}
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Product Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Brand</label>
                    <input
                      type="text"
                      className="form-control"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Pricing */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price (₹) *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Original Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Category & Stock */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Category *</label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home & Kitchen</option>
                      <option value="books">Books</option>
                      <option value="sports">Sports</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-check mt-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="inStock"
                        checked={formData.inStock}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">
                        In Stock
                      </label>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">Description *</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* Features */}
                <div className="mb-3">
                  <label className="form-label">Features</label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeFeature(index)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={addFeature}
                  >
                    <i className="fas fa-plus me-1"></i>Add Feature
                  </button>
                </div>

                {/* Specifications */}
                <div className="mb-4">
                  <label className="form-label">Specifications</label>
                  <div className="row">
                    <div className="col-md-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Material"
                        value={formData.specifications.Material}
                        onChange={(e) => handleSpecChange('Material', e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Color"
                        value={formData.specifications.Color}
                        onChange={(e) => handleSpecChange('Color', e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Weight"
                        value={formData.specifications.Weight}
                        onChange={(e) => handleSpecChange('Weight', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-warning flex-grow-1" disabled={loading}>
                    <i className="fas fa-save me-2"></i>
                    {isEdit ? 'Update Product' : 'Add Product'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductForm