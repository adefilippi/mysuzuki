import { fromJS } from "immutable";
import { ActionTypes } from "./actionTypes";
import { ActionTypes as UserActionTypes } from "../User/actionTypes";
import moment from "moment";

const initialState = () => new fromJS([]);

export const Reducer = (state = initialState(), action) => {
    switch (action.type) {
        case UserActionTypes.SIGNOUT:
            return initialState();
        case ActionTypes.SET_MAINTENANCES:
            return fromJS(action.maintenances);
        case ActionTypes.UPDATE_MAINTENANCE:
            return state.map( (item, index) => {
                if(item.get("@id") !== action.maintenance["@id"]) {
                    return item;
                }

                return fromJS(action.maintenance);
            });
        case ActionTypes.ADD_MAINTENANCE:
            const index = state.findIndex((maintenance) => moment(maintenance.get("date")) < moment(action.maintenance.date));
            return fromJS([
                ...state.slice(0, index),
                action.maintenance,
                ...state.slice(index)
            ]);
        case ActionTypes.REMOVE_MAINTENANCE:
            const pos = state.findIndex((maintenance) => maintenance.get("@id") === action.maintenance);
            return fromJS(state.splice(pos, 1));
        default:
            return state;
    }
};
