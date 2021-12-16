import { ActionTypes } from "./actionTypes";
import { Utils } from "./utils";
import { UserVehiclesActioner, UserInformationsActioner } from "../../";

export class Actioner {
    static storeStep(stepValues) {
        return {
            type: ActionTypes.STORE_VEHICLE_STEP,
            stepValues
        };
    }

    static setLoading(loading) {
        return {
            type: ActionTypes.STORE_VEHICLE_SET_LOADING,
            loading
        };
    }

    static submitStep(vin, stepValues) {
        return (dispatch, getState) => {
            const { vehicleParams } = Utils.getVehicleUpdateParamsFromFormValues(stepValues);
            const { userParams } = Utils.getUserInformationsUpdateParamsFromFormValues(stepValues);
            dispatch(Actioner.setLoading(true));
            return dispatch(UserVehiclesActioner.updateUserVehicle(vin, vehicleParams))
                .then(() => {
                    return dispatch(UserInformationsActioner.updateUserInformations(userParams)).then(() => {
                        dispatch(Actioner.storeStep(stepValues));
                        dispatch(Actioner.setLoading(false));
                        return Promise.resolve(stepValues);
                    });
                })
                .catch((e) => {
                    dispatch(Actioner.setLoading(false));
                    return Promise.reject(e);
                });
        };
    }
}
