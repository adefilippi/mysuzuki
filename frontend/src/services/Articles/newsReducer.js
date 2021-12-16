import { fromJS } from "immutable";
import { ActionTypes } from "./actionTypes";

const initialState = () => new fromJS([]);

export const Reducer = (state = initialState(), action) => {
    switch (action.type) {
        case ActionTypes.RESET_NEWS:
            return initialState();
        case ActionTypes.SET_NEWS:
            return fromJS([...state,...action.news]);
        default:
            return state;
    }
};
