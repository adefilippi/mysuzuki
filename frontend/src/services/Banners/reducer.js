import { fromJS } from 'immutable';
import { ActionTypes as UserActionTypes } from '../User/actionTypes';
import { ActionTypes } from './actionTypes';

const initialState = () => new fromJS([]);

export const Reducer = (state = initialState(), action) => {
  switch (action.type) {
    case UserActionTypes.SIGNOUT:
    case ActionTypes.RESET_BANNERS:
      return initialState();
    case ActionTypes.SET_BANNERS:
      return fromJS([...state, ...action.banners]);
    default:
      return state;
  }
};
