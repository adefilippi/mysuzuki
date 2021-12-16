import { fromJS } from "immutable";
import { ActionTypes } from "./actionTypes";

const initialState = () => new fromJS([]);

export const Reducer = (state = initialState(), action) => {
    switch (action.type) {
        case ActionTypes.SET_GAMES:
            return [...state, ...fromJS(action.games)];
        case ActionTypes.RESET_GAMES:
            return initialState();
        default:
            return state;
    }
};
