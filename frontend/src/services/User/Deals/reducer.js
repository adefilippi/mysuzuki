import { fromJS } from "immutable";
import { ActionTypes } from "./actionTypes";

const initialState = () => new fromJS([]);

export const Reducer = (state = initialState(), action) => {
    switch (action.type) {
        case ActionTypes.SET_DEALS:
            return [...state, ...fromJS(action.deals)];
        case ActionTypes.RESET_DEALS:
            return initialState();
        default:
            return state;
    }
};
