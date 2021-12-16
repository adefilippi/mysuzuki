import { Api } from "./api";
import { ActionTypes } from "./actionTypes";

export class Actioner {
    static setInformationFromSerial = (informations) => {
        return {
            type: ActionTypes.SET_INFORMATION_FROM_VIN,
            informations
        };
    };

    static setError = (error) => {
        return {
            type: ActionTypes.SET_ERROR_FROM_VIN,
            error
        };
    };

    static setLoading = (loading) => {
        return {
            type: ActionTypes.SET_LOADING,
            loading
        };
    };

    static getInformationsFromSerial = (serial) => {
        return (dispatch, getState) => {
            dispatch(Actioner.setLoading(true));
            return Api.getInformationFromVin(serial)
                .then((informations) => {
                    dispatch(Actioner.setInformationFromSerial(informations));
                    return Promise.resolve(informations);
                })
                .catch((error) => {
                    dispatch(Actioner.setError(error));
                    return Promise.reject(error);
                });
        };
    };
}
