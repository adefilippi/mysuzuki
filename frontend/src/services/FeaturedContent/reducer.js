import { fromJS } from 'immutable';
import { ActionTypes as UserActionTypes } from '../User/actionTypes';
import { ActionTypes } from './actionTypes';

const initialState = () => new fromJS([]);

export const Reducer = (state = initialState(), action) => {
  switch (action.type) {
    case UserActionTypes.SIGNOUT:
    case ActionTypes.RESET_FEATURED_CONTENTS:
      return initialState();
    case ActionTypes.SET_FEATURED_CONTENTS:
      return fromJS([...state, ...action.featuredContents]);
    default:
      return state;
  }
}
