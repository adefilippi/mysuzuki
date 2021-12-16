import { fromJS } from "immutable";
import { ActionTypes } from "./actionTypes";
import { ActionTypes as UserActionTypes } from "../User/actionTypes";

const initialState = () => new fromJS([]);

export const Reducer = (state = initialState(), action) => {
    switch (action.type) {
        case UserActionTypes.SIGNOUT:
        case ActionTypes.RESET_TOPICS:
            return initialState();
        case ActionTypes.SET_TOPICS:
            return fromJS(action.topics);
        default:
            return state;
    }
};
