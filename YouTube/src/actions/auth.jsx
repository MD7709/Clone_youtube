// actions/auth.js
import * as api from '../api';
import { setCurrentUser } from './currentUser';

export const login = (authData) => async (dispatch) => {
  try {
    const { data } = await api.login(authData);
    dispatch({ type: "AUTH", data });
    localStorage.setItem('profile', JSON.stringify(data));
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))));
  } catch (error) {
    alert(`Login failed: ${error.message}`);
  }
};

export const updatePoints = (id, points) => async (dispatch) => {
  try {
    const { data } = await api.updatePoints(id, points);
    dispatch(setCurrentUser(data));
  } catch (error) {
    console.log(error);
  }
};
