import { Map, fromJS } from "immutable";
import { ActionTypes } from "./actionTypes";

const initialState = () =>
    fromJS({
        list: [],
        loading: false
    });

export const Reducer = (state = initialState(), action) => {
    switch (action.type) {
        case ActionTypes.SET_DEALERSHIPS:
            return state.set("list", fromJS(action.dealerships)).set("loading", false);
        case ActionTypes.SET_DEALERSHIPS_ERROR:
            return new fromJS({ list: [], error: action.error, isLoading: false });
        case ActionTypes.SET_LOADING:
            return state.set("loading", action.loading).set("list", action.loading ? fromJS([]) : state.get("list"));
        default:
            return state;
    }
};
