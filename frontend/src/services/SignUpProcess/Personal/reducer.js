import { Map, fromJS } from "immutable";
import { ActionTypes } from "./actionTypes";
import { REHYDRATE } from "redux-persist/constants";
import { Utils } from "./utils";

const initialState = () => new Map(Utils.getInitialState());

export const Reducer = (state = initialState(), action) => {
    switch (action.type) {
        case REHYDRATE:
            const rehydrateValue = Utils.getRehydrateValueFromAction(action);
            return new fromJS({ ...rehydrateValue, rehydrated: true });
        case ActionTypes.STORE_PERSONAL_STEP:
            return fromJS({ ...action.stepValues, loading: state.get("loading"), rehydrated: true });
        case ActionTypes.SET_LOADING:
            return state.set("loading", action.loading);
        default:
            return state;
    }
};
