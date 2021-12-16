import { fromJS } from "immutable";
import { ActionTypes } from "./actionTypes";
import { REHYDRATE } from "redux-persist/constants";
import { Utils } from "./utils";
import { ActionTypes as UserActionTypes } from "../actionTypes";

const initialState = () => new fromJS([]);

export const Reducer = (state = initialState(), action) => {
    switch (action.type) {
        case REHYDRATE:
            const rehydrateValue = Utils.getRehydrateValueFromAction(action);
            return new fromJS(rehydrateValue);
        case UserActionTypes.SIGNOUT:
            return initialState();
        case ActionTypes.SET_VEHICLES:
            return fromJS(action.vehicles);
        case ActionTypes.SET_VEHICLE:
            return state.update(state.findIndex((vehicle) => vehicle.get("@id") === action.vehicle["@id"]), (vehicle) => fromJS(action.vehicle));
        default:
            return state;
    }
};
