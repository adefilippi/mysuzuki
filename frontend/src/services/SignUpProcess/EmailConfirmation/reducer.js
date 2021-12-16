import { Map, fromJS } from "immutable";
import { ActionTypes } from "./actionTypes";
import { REHYDRATE } from "redux-persist/constants";
import { Utils } from "./utils";

const initialState = () => new Map({});

export const Reducer = (state = initialState(), action) => {
    switch (action.type) {
        case REHYDRATE:
            const rehydrateValue = Utils.getRehydrateValueFromAction(action);
            return new fromJS({ ...rehydrateValue, rehydrated: true, error: null });
        case ActionTypes.STORE_CONFIRMATION_TOKEN:
            return fromJS(action.token);
        default:
            return state;
    }
};
