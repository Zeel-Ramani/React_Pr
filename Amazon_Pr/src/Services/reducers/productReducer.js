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
  CLEAR_FILTERS
} from '../actions/actionTypes';

const initialState = {
  products: [],
  filteredProducts: [],
  product: null,
  loading: false,
  error: null,
  filters: {
    searchQuery: '',
    category: 'all',
    priceRange: { min: 0, max: 50000 },
    minRating: 0
  },
  categories: ['all', 'electronics', 'fashion', 'home', 'books', 'sports']
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
    case PRODUCT_DETAILS_REQUEST:
    case PRODUCT_CREATE_REQUEST:
    case PRODUCT_UPDATE_REQUEST:
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        filteredProducts: action.payload,
        error: null
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: null
      };

    case PRODUCT_CREATE_SUCCESS:
      const newProducts = [...state.products, action.payload];
      return {
        ...state,
        loading: false,
        products: newProducts,
        filteredProducts: newProducts,
        error: null
      };

    case PRODUCT_UPDATE_SUCCESS:
      const updatedProducts = state.products.map(product =>
        product.id === action.payload.id ? action.payload : product
      );
      return {
        ...state,
        loading: false,
        products: updatedProducts,
        filteredProducts: updatedProducts,
        product: state.product?.id === action.payload.id ? action.payload : state.product,
        error: null
      };

    case PRODUCT_DELETE_SUCCESS:
      const filteredProducts = state.products.filter(product => product.id !== action.payload);
      return {
        ...state,
        loading: false,
        products: filteredProducts,
        filteredProducts: filteredProducts,
        product: state.product?.id === action.payload ? null : state.product,
        error: null
      };

    case PRODUCT_LIST_FAIL:
    case PRODUCT_DETAILS_FAIL:
    case PRODUCT_CREATE_FAIL:
    case PRODUCT_UPDATE_FAIL:
    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case SET_SEARCH_QUERY:
      const searchQuery = action.payload;
      let searchFiltered = state.products;
      
      if (searchQuery) {
        searchFiltered = state.products.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      return {
        ...state,
        filters: { ...state.filters, searchQuery },
        filteredProducts: searchFiltered
      };

    case SET_CATEGORY_FILTER:
      const category = action.payload;
      let categoryFiltered = state.products;
      
      if (category !== 'all') {
        categoryFiltered = state.products.filter(product => product.category === category);
      }
      
      return {
        ...state,
        filters: { ...state.filters, category },
        filteredProducts: categoryFiltered
      };

    case SET_PRICE_FILTER:
      const priceRange = action.payload;
      const priceFiltered = state.products.filter(product =>
        product.price >= priceRange.min && product.price <= priceRange.max
      );
      
      return {
        ...state,
        filters: { ...state.filters, priceRange },
        filteredProducts: priceFiltered
      };

    case SET_RATING_FILTER:
      const minRating = action.payload;
      const ratingFiltered = state.products.filter(product =>
        product.rating.rate >= minRating
      );
      
      return {
        ...state,
        filters: { ...state.filters, minRating },
        filteredProducts: ratingFiltered
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: initialState.filters,
        filteredProducts: state.products
      };

    default:
      return state;
  }
};

export default productReducer;