import { ActionTypes } from "./actionTypes";
import { Utils } from "./utils";
import { REHYDRATE } from "redux-persist/constants";
import { Map, fromJS } from "immutable";

const initialState = new Map({
    rehydrated: false
});

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case REHYDRATE:
            const rehydratationValue = Utils.getAuthenticationStateFromRehydrateAction(action);
            return fromJS({ ...rehydratationValue, rehydrated: true });
        case ActionTypes.SET_AUTH:
            return fromJS({ ...action.auth, initialized: true, rehydrated: true });
        case ActionTypes.ERROR_ON_SIGNING:
            return state.set("error", action.error).set("initialized", true);
        case ActionTypes.REMOVE_ERROR:
            return state.set("error", false);
        default:
            return state;
    }
};

export { Reducer };
