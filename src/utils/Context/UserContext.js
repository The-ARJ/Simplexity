"use client"
import { createContext, useEffect, useReducer, useState } from 'react';
import Service from '../Services/UserService';

const initialState = {
  user: null,
  loading: true,
  error: null,
  passwordExpired: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
        passwordExpired: action.payload.passwordExpired,
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
    case 'RESET_TIMEOUT':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const UserContext = createContext();

export const useUser = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fetched, setFetched] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let inactivityTimeout;

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        dispatch({ type: 'FETCH_USER' });
        const response = await Service.getCurrentUser(token);

        dispatch({
          type: 'SET_USER',
          payload: {
            user: response.data.data,
            passwordExpired: response.data.passwordExpired,
          }
        });

        setIsLoggedIn(true); // Set the login status to true when the user is logged in
      } catch (error) {
        dispatch({ type: 'FETCH_USER_FAILURE', payload: error.message });
        setIsLoggedIn(false); // Set the login status to false when there's an error or no token
      }
    } else {
      dispatch({ type: 'FETCH_USER_FAILURE', payload: 'No token found' });
      setIsLoggedIn(false); // Set the login status to false when there's no token
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

  useEffect(() => {
    const resetTimeout = () => {
      clearTimeout(inactivityTimeout);
      if (isLoggedIn) {
        inactivityTimeout = setTimeout(() => {
          window.alert('You have been inactive for a long time. You are logged out due to inactivity.');
          logout();
        }, 120000);
      }
    };

    const onActivity = () => {
      resetTimeout();
      dispatch({ type: 'RESET_TIMEOUT' }); // Dispatch an action to reset the loading state
    };

    document.addEventListener('mousemove', onActivity);
    document.addEventListener('keydown', onActivity);

    resetTimeout();

    return () => {
      document.removeEventListener('mousemove', onActivity);
      document.removeEventListener('keydown', onActivity);
      clearTimeout(inactivityTimeout);
    };
  }, [fetched, isLoggedIn]);

  return { ...state, dispatch, logout, fetchUser };
};
