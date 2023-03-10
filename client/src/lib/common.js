import { API_ROUTES } from './constants';
import axios from 'axios';
import { useEffect } from 'react';

export function storeTokenInLocalStorage(token) {
  localStorage.setItem('token', token);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem('token');
}

export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      return defaultReturnObject;
    }
    const response = await axios({
      method: 'GET',
      url: API_ROUTES.GET_USER,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { authenticated = false } = response.data;
    return authenticated ? response.data : false;
  }
  catch (err) {
    console.log('getAuthenticatedUser, Something Went Wrong', err);
    return defaultReturnObject;
  }
}

export const processDateString = (dateStr, yearOnly = false) => {
  let retDate = 'Unknown';
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  if(dateStr) {
      if(yearOnly) {
          retDate = dateStr === "0000-00-00" ? '????' : dateStr.substring(0, 4)
      } else {
          retDate = dateStr === "0000-00-00" ? 'Unknown' 
                      : dateStr.indexOf("-00") > -1 ? dateStr.substring(0, 4)
                          : new Date(dateStr).toLocaleDateString(undefined, dateOptions) 
      }
  }

  return retDate;
}

export const useDocumentTitle = (title) => {
    useEffect(() => {
      let newTitle = title !== '' ? title + " - The Zalewski Project" : "The Zalewski Project"
      document.title = newTitle
    }, [title])
}
