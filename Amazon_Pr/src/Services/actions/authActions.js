import { 
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL
} from './actionTypes';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    setTimeout(() => {
      if (email && password) {
        const user = {
          id: 1,
          name: email === 'admin@amazon.com' ? 'Admin User' : 'John Doe',
          email: email,
          isAdmin: email === 'admin@amazon.com'
        };
        localStorage.setItem('userInfo', JSON.stringify(user));
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: user
        });
      } else {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: 'Invalid credentials'
        });
      }
    }, 1000);
    
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.message
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    setTimeout(() => {
      if (name && email && password) {
        const user = {
          id: 1,
          name: name,
          email: email,
          isAdmin: false
        };
        localStorage.setItem('userInfo', JSON.stringify(user));
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: user
        });
      } else {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: 'Please fill all fields'
        });
      }
    }, 1000);
    
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.message
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  dispatch({ type: USER_LOGOUT });
};