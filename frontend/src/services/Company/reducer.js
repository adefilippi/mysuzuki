import { Map, fromJS } from "immutable";
import { ActionTypes } from "./actionTypes";

const initialState = () => new Map({ empty: true });

export const Reducer = (state = initialState(), action) => {
    switch (action.type) {
        case ActionTypes.SET_STAFF_SIZES:
            return state.set("staffSizes", fromJS(action.sizes));
        default:
            return state;
    }
};
