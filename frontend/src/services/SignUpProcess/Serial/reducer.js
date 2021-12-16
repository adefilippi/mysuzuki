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
        case ActionTypes.SET_INFORMATION_FROM_VIN:
            return new fromJS({ ...action.informations, isLoading: false, rehydrated: true });
        case ActionTypes.SET_ERROR_FROM_VIN:
            return new fromJS({ error: action.error, isLoading: false, rehydrated: true });
        case ActionTypes.SET_LOADING:
            return state.set("loading", action.loading);
        default:
            return state;
    }
};
