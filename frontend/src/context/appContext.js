import React, { useState, useReducer, useContext } from 'react';
import reducer from './reducer';
import axios from 'axios';

import { DISPLAY_ALERT, CLEAR_ALERT } from '../constants/alertConstants';
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
} from '../constants/registerConstants';

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from '../constants/loginConstants';

import { TOGGLE_SIDEBAR } from '../constants/sidebarConstants';
import { LOGOUT_USER } from '../constants/loginConstants';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  issueLocation: userLocation || '',
  showSidebar: false,
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Alert actions

  const displayAlert = () => {
    dispatch({
      type: DISPLAY_ALERT,
    });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };

  // local storage for login and register

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('location');
  };

  // login and register

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_REQUEST });
    try {
      const { data } = await axios.post(`/api/v1/auth/register`, currentUser);

      const { user, token, location } = data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_REQUEST });
    try {
      const { data } = await axios.post('/api/v1/auth/login', currentUser);
      const { user, token, location } = data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        logoutUser,
        toggleSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
