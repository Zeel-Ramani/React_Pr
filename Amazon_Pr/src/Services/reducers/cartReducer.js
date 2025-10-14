import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART
} from '../actions/actionTypes';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cartItems.find(
        item => item.id === action.payload.id
      );

      let newCartItems;
      if (existingItem) {
        newCartItems = state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newCartItems = [...state.cartItems, action.payload];
      }

      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      return {
        ...state,
        cartItems: newCartItems
      };

    case REMOVE_FROM_CART:
      const filteredItems = state.cartItems.filter(
        item => item.id !== action.payload
      );
      localStorage.setItem('cartItems', JSON.stringify(filteredItems));
      return {
        ...state,
        cartItems: filteredItems
      };

    case UPDATE_CART_QUANTITY:
      const updatedItems = state.cartItems.map(item =>
        item.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return {
        ...state,
        cartItems: updatedItems
      };

    case CLEAR_CART:
      localStorage.removeItem('cartItems');
      return {
        ...state,
        cartItems: []
      };

    default:
      return state;
  }
};

export default cartReducer;