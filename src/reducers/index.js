
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postReducer from './postReducer';
import commentReducer from './commentReducer';
import profilesReducer from './profilesReducer';
import profilesDetailsReducer from './profilesDetailsReducer';
import { DESTROY_SESSION } from '../actions/types'
import { history } from '../routes/routes';
import {
 pushPath
} from 'redux-simple-router';

const appReducer = combineReducers({
 auth: authReducer,
 error: errorReducer,
 post: postReducer,
 comment: commentReducer,
 profiles: profilesReducer,
 profilesDetails: profilesDetailsReducer
})

export const rootReducer = (state, action) => {
 // Clear all data in redux store to initial.
 if (action.type === DESTROY_SESSION) {
  localStorage.removeItem('fbstoken')
  state = undefined;
 }

 return appReducer(state, action);
};