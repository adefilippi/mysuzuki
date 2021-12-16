import { fromJS } from "immutable";
import { ActionTypes } from "./actionTypes";
import { REHYDRATE } from "redux-persist/constants";
import { Utils } from "./utils";
import { ActionTypes as UserActionTypes } from "../actionTypes";

const initialState = () => new fromJS({});

export const Reducer = (state = initialState(), action) => {
    switch (action.type) {
        case REHYDRATE:
            const rehydrateValue = Utils.getRehydrateValueFromAction(action);
            return new fromJS(rehydrateValue);
        case UserActionTypes.SIGNOUT:
            return initialState();
        case ActionTypes.SET_DEALERSHIP:
            return fromJS(action.dealership);
        case ActionTypes.SET_LOADING:
            return action.loading ? fromJS({ "@id": action.id, loading: true }) : state.set("loading", false);
        default:
            return state;
    }
};
