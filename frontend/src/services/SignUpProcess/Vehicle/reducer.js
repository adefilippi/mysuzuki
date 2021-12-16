import { Map, fromJS } from "immutable";
import { ActionTypes } from "./actionTypes";
import { REHYDRATE } from "redux-persist/constants";
import { Utils } from "./utils";

const initialState = () => new Map(Utils.getInitialState());

export const Reducer = (state = initialState(), action) => {
    switch (action.type) {
        case REHYDRATE:
            const rehydrateValue = Utils.getRehydrateValueFromAction(action);
            return new fromJS({ ...rehydrateValue, rehydrated: true, error: false });
        case ActionTypes.STORE_VEHICLE_STEP:
            return fromJS({ ...action.stepValues, loading: state.get("loading") });
        case ActionTypes.STORE_VEHICLE_SET_LOADING:
            return state.set("loading", action.loading);
        default:
            return state;
    }
};
