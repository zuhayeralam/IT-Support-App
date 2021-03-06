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
  LOGOUT_USER,
} from '../constants/loginConstants';

import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../constants/userProfileConstants';

import { TOGGLE_SIDEBAR } from '../constants/sidebarConstants';
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

import {
  SHOW_STATS_REQUEST,
  SHOW_STATS_SUCCESS,
} from '../constants/statsConstants';

import { CLEAR_FILTERS } from '../constants/searchConstants';

import { initialState } from './appContext';
import { CHANGE_PAGE } from '../constants/paginationConstants';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }

  if (action.type === REGISTER_USER_REQUEST) {
    return { ...state, isLoading: true };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      issueLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  }

  if (action.type === REGISTER_USER_FAIL) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGIN_USER_REQUEST) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      issueLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'Login Successful! Redirecting...',
    };
  }

  if (action.type === LOGIN_USER_FAIL) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      issueLocation: '',
      userLocation: '',
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return { ...state, showSidebar: !state.showSidebar };
  }

  if (action.type === UPDATE_USER_REQUEST) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      issueLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
    };
  }

  if (action.type === UPDATE_USER_FAIL) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editIssueId: '',
      description: '',
      department: '',
      issueLocation: state.userLocation,
      issueType: 'hardware',
      status: 'pending',
    };

    return {
      ...state,
      ...initialState,
    };
  }

  if (action.type === CREATE_ISSUE_REQUEST) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_ISSUE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Issue Created!',
    };
  }

  if (action.type === CREATE_ISSUE_FAIL) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_ISSUES_REQUEST) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_ISSUES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      issues: action.payload.issues,
      totalIssues: action.payload.totalIssues,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === SET_EDIT_ISSUE) {
    const issue = state.issues.find((issue) => issue._id === action.payload.id);
    const { _id, description, department, issueLocation, issueType, status } =
      issue;
    return {
      ...state,
      isEditing: true,
      editIssueId: _id,
      description,
      department,
      issueLocation,
      issueType,
      status,
    };
  }

  if (action.type === EDIT_ISSUE_REQUEST) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_ISSUE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Issue Updated!',
    };
  }
  if (action.type === EDIT_ISSUE_FAIL) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === DELETE_ISSUE_REQUEST) {
    return { ...state, isLoading: true };
  }

  if (action.type === SHOW_STATS_REQUEST) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyIssues: action.payload.monthlyIssues,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: '',
      searchStatus: 'all',
      searchType: 'all',
      sort: 'latest',
    };
  }

  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }

  throw new Error(`no such action :${action.type}`);
};
export default reducer;
