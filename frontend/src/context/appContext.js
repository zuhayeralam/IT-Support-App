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

import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../constants/userProfileConstants';

import { TOGGLE_SIDEBAR } from '../constants/sidebarConstants';
import { LOGOUT_USER } from '../constants/loginConstants';
import { HANDLE_CHANGE, CLEAR_VALUES } from '../constants/stateChangeConstants';
import {
  CREATE_ISSUE_FAIL,
  CREATE_ISSUE_REQUEST,
  CREATE_ISSUE_SUCCESS,
} from '../constants/addIssueConstants';
import {
  GET_ISSUES_REQUEST,
  GET_ISSUES_SUCCESS,
} from '../constants/getIssueConstants';
import {
  SET_EDIT_ISSUE,
  EDIT_ISSUE_REQUEST,
  EDIT_ISSUE_SUCCESS,
  EDIT_ISSUE_FAIL,
} from '../constants/editIssueConstants';

import { DELETE_ISSUE_REQUEST } from '../constants/deleteIssueConstants';

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
  isEditing: false,
  editIssueId: '',
  description: '',
  department: '',
  issueTypeOptions: [
    'hardware',
    'external-device',
    'software',
    'configuration',
  ],
  issueType: 'hardware',
  statusOptions: ['processing', 'declined', 'pending'],
  status: 'pending',
  issues: [],
  totalIssues: 0,
  numOfPages: 1,
  page: 1,
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

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

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);

      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_FAIL,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createIssue = async () => {
    dispatch({ type: CREATE_ISSUE_REQUEST });
    try {
      const { description, department, issueLocation, issueType, status } =
        state;
      await authFetch.post('/issues', {
        description,
        department,
        issueLocation,
        issueType,
        status,
      });
      dispatch({ type: CREATE_ISSUE_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_ISSUE_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getIssues = async () => {
    let url = `/issues`;

    dispatch({ type: GET_ISSUES_REQUEST });
    try {
      const { data } = await authFetch(url);
      const { issues, totalIssues, numOfPages } = data;
      dispatch({
        type: GET_ISSUES_SUCCESS,
        payload: {
          issues,
          totalIssues,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };

  const setEditIssue = (id) => {
    dispatch({ type: SET_EDIT_ISSUE, payload: { id } });
  };

  const editIssue = async () => {
    dispatch({ type: EDIT_ISSUE_REQUEST });

    try {
      const { description, department, issueLocation, issueType, status } =
        state;
      await authFetch.patch(`/issues/${state.editIssueId}`, {
        department,
        description,
        issueLocation,
        issueType,
        status,
      });
      dispatch({ type: EDIT_ISSUE_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_ISSUE_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteIssue = async (issueId) => {
    dispatch({ type: DELETE_ISSUE_REQUEST });
    try {
      await authFetch.delete(`/issues/${issueId}`);
      getIssues();
    } catch (error) {
      logoutUser();
    }
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
        updateUser,
        handleChange,
        clearValues,
        createIssue,
        getIssues,
        setEditIssue,
        deleteIssue,
        editIssue,
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
