/* eslint-disable prettier/prettier */
// import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});
const initialState = {
  sidebarShow: true,
}
// eslint-disable-next-line
const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}
export default store