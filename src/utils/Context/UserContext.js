"use client"
import { createContext, useEffect, useReducer } from 'react';
import Service from '../Services/UserService';
import { useState } from 'react';
// Create the initial state
const initialState = {
  user: null,
  loading: true,
  error: null,
};

// Create the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
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
        loading: false, // Set loading to true
        error: null,
      };
    default:
      return state;
  }
};

// User Context
export const UserContext = createContext();

export const useUser = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fetched, setFetched] = useState(false); // New fetched state

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        dispatch({ type: 'FETCH_USER' }); // Set loading state
        const response = await Service.getCurrentUser(token);
        dispatch({ type: 'SET_USER', payload: response.data.data });
      } catch (error) {
        dispatch({ type: 'FETCH_USER_FAILURE', payload: error.message });
      }
    } else {
      dispatch({ type: 'FETCH_USER_FAILURE', payload: 'No token found' });
    }
  };

  useEffect(() => {
    if (!fetched) { // Check if user data has not been fetched
      fetchUser();
      setFetched(true); // Set fetched to true once user data is fetched
    }
  }, [fetched]);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
  };

  return { ...state, dispatch, logout, fetchUser }; // add fetchUser here
};


