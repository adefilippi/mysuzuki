import { Map, fromJS } from "immutable";
import { ActionTypes } from "./actionTypes";
import { REHYDRATE } from "redux-persist/constants";
import { Utils } from "./utils";

const initialState = () => new Map(Utils.getInitialState());

export const Reducer = (state = initialState(), action) => {
    switch (action.type) {
        case REHYDRATE:
            const rehydrateValue = Utils.getRehydrateValueFromAction(action);
            return new fromJS({ ...rehydrateValue, rehydrated: true, error: null });
        case ActionTypes.SET_ACCOUNT:
            return new fromJS({ ...action.account, loading: state.get("loading") });
        case ActionTypes.SET_LOADING:
            return state.set("loading", action.loading);
        case ActionTypes.SET_ERROR:
            return new fromJS({ error: action.error, loading: state.get("loading") });
        default:
            return state;
    }
};
