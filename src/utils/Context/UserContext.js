"use client"
import { createContext, useEffect, useReducer } from 'react';
import Service from '../Services/UserService';
import { useState } from 'react';
// Initial state
const initialState = {
  user: null,
  loading: true,
  error: null,
  passwordExpired: false,  // New state for password expired
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,  // get user from action payload
        loading: false,
        error: null,
        passwordExpired: action.payload.passwordExpired,  // get password expired state from action payload
      };
    case 'FETCH_USER_FAILURE':
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
        passwordExpired: false,
      };
    default:
      return state;
  }
};

export const UserContext = createContext();

export const useUser = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fetched, setFetched] = useState(false);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        dispatch({ type: 'FETCH_USER' });
        const response = await Service.getCurrentUser(token);

        // dispatch with user and password expired state
        dispatch({
          type: 'SET_USER',
          payload: {
            user: response.data.data,
            passwordExpired: response.data.passwordExpired,
          }
        });
      } catch (error) {
        dispatch({ type: 'FETCH_USER_FAILURE', payload: error.message });
      }
    } else {
      dispatch({ type: 'FETCH_USER_FAILURE', payload: 'No token found' });
    }
  };

  useEffect(() => {
    if (!fetched) {
      fetchUser();
      setFetched(true);
    }
  }, [fetched]);

  const logout = async () => {
    try {
      dispatch({ type: 'LOGOUT' });
      const token = localStorage.getItem('token');
      await Service.logout(token);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return { ...state, dispatch, logout, fetchUser };
};