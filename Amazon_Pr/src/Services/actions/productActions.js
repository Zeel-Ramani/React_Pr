import { 
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS, 
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  SET_SEARCH_QUERY,
  SET_CATEGORY_FILTER,
  SET_PRICE_FILTER,
  SET_RATING_FILTER,
  CLEAR_FILTERS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART
} from './actionTypes';
import { v4 as uuidv4 } from 'uuid';

// Mock product data
const mockProducts = [
  {
    id: '1',
    title: "Wireless Bluetooth Headphones with Noise Cancellation",
    price: 2999,
    originalPrice: 4999,
    image: "/api/placeholder/300/300",
    rating: { rate: 4.5, count: 1245 },
    description: "High-quality wireless headphones with active noise cancellation, perfect for music lovers and professionals.",
    category: "electronics",
    brand: "Sony",
    inStock: true,
    features: ["Noise Cancellation", "30hrs Battery", "Fast Charging"],
    specifications: {
      "Battery": "30 hours",
      "Connectivity": "Bluetooth 5.0",
      "Weight": "250g"
    }
  },
  {
    id: '2',
    title: "Smart Watch with Fitness Tracking",
    price: 4999,
    originalPrice: 7999,
    image: "/api/placeholder/300/300",
    rating: { rate: 4.3, count: 892 },
    description: "Advanced smartwatch with heart rate monitoring, GPS, and multiple sports modes.",
    category: "electronics",
    brand: "Samsung",
    inStock: true,
    features: ["Heart Rate Monitor", "GPS", "Water Resistant"],
    specifications: {
      "Display": "1.4 inch AMOLED",
      "Battery": "7 days",
      "Compatibility": "Android & iOS"
    }
  },
  {
    id: '3',
    title: "Men's Casual Shirt - Regular Fit",
    price: 899,
    originalPrice: 1499,
    image: "/api/placeholder/300/300",
    rating: { rate: 4.0, count: 2341 },
    description: "Comfortable cotton shirt for casual wear, available in multiple colors.",
    category: "fashion",
    brand: "H&M",
    inStock: true,
    features: ["100% Cotton", "Machine Wash", "Regular Fit"],
    specifications: {
      "Fabric": "100% Cotton",
      "Fit": "Regular",
      "Care": "Machine Wash"
    }
  },
  {
    id: '4',
    title: "Kitchen Mixer Grinder - 3 Jars",
    price: 3499,
    originalPrice: 4999,
    image: "/api/placeholder/300/300",
    rating: { rate: 4.2, count: 567 },
    description: "Powerful mixer grinder with 3 stainless steel jars for all your kitchen needs.",
    category: "home",
    brand: "Bajaj",
    inStock: true,
    features: ["3 Jars", "550W Motor", "Stainless Steel"],
    specifications: {
      "Power": "550 Watts",
      "Jars": "3 Stainless Steel",
      "Warranty": "2 years"
    }
  },
  {
    id: '5',
    title: "Running Shoes for Men",
    price: 1999,
    originalPrice: 2999,
    image: "/api/placeholder/300/300",
    rating: { rate: 4.4, count: 1234 },
    description: "Comfortable running shoes with extra cushioning for maximum performance.",
    category: "fashion",
    brand: "Nike",
    inStock: false,
    features: ["Air Cushion", "Breathable", "Lightweight"],
    specifications: {
      "Sole": "Rubber",
      "Closure": "Lace-up",
      "Material": "Mesh"
    }
  },
  {
    id: '6',
    title: "Laptop Backpack with USB Charging",
    price: 1299,
    originalPrice: 1999,
    image: "/api/placeholder/300/300",
    rating: { rate: 4.1, count: 789 },
    description: "Waterproof laptop backpack with dedicated USB charging port.",
    category: "fashion",
    brand: "Skybags",
    inStock: true,
    features: ["USB Charging", "Waterproof", "Multiple Compartments"],
    specifications: {
      "Capacity": "25L",
      "Material": "Polyester",
      "Compatibility": "Up to 15.6 inch"
    }
  }
];

const getProductsFromStorage = () => {
  const stored = localStorage.getItem('amazonProducts');
  return stored ? JSON.parse(stored) : mockProducts;
};

const saveProductsToStorage = (products) => {
  localStorage.setItem('amazonProducts', JSON.stringify(products));
};

// Action Creators
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    
    setTimeout(() => {
      const products = getProductsFromStorage();
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: products
      });
    }, 500);
    
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    
    setTimeout(() => {
      const products = getProductsFromStorage();
      const product = products.find(p => p.id === id);
      if (product) {
        dispatch({
          type: PRODUCT_DETAILS_SUCCESS,
          payload: product
        });
      } else {
        dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload: 'Product not found'
        });
      }
    }, 500);
    
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.message
    });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    
    setTimeout(() => {
      const products = getProductsFromStorage();
      const newProduct = {
        id: uuidv4(),
        ...productData,
        rating: { rate: 0, count: 0 },
        createdAt: new Date().toISOString()
      };
      
      const updatedProducts = [...products, newProduct];
      saveProductsToStorage(updatedProducts);
      
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: newProduct
      });
    }, 500);
    
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.message
    });
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    
    setTimeout(() => {
      const products = getProductsFromStorage();
      const updatedProducts = products.map(product =>
        product.id === id ? { ...product, ...productData } : product
      );
      saveProductsToStorage(updatedProducts);
      
      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: { id, ...productData }
      });
    }, 500);
    
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.message
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    
    setTimeout(() => {
      const products = getProductsFromStorage();
      const filteredProducts = products.filter(product => product.id !== id);
      saveProductsToStorage(filteredProducts);
      
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
        payload: id
      });
    }, 500);
    
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.message
    });
  }
};

// Filter Actions
export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query
});

export const setCategoryFilter = (category) => ({
  type: SET_CATEGORY_FILTER,
  payload: category
});

export const setPriceFilter = (priceRange) => ({
  type: SET_PRICE_FILTER,
  payload: priceRange
});

export const setRatingFilter = (minRating) => ({
  type: SET_RATING_FILTER,
  payload: minRating
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS
});

// Cart Actions
export const addToCart = (product, quantity = 1) => ({
  type: ADD_TO_CART,
  payload: { ...product, quantity }
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const updateCartQuantity = (productId, quantity) => ({
  type: UPDATE_CART_QUANTITY,
  payload: { productId, quantity }
});

export const clearCart = () => ({
  type: CLEAR_CART
});