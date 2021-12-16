import { Api } from "./api";
import { Utils } from "./utils";
import { ActionTypes } from "./actionTypes";
import { AuthenticationUtils } from "../";
export class Actioner {
    static setDealerships = (dealerships) => {
        return {
            type: ActionTypes.SET_DEALERSHIPS,
            dealerships
        };
    };

    static setError = (error) => {
        return {
            type: ActionTypes.SET_DEALERSHIPS_ERROR,
            error
        };
    };

    static setLoading = (loading) => {
        return {
            type: ActionTypes.SET_LOADING,
            loading
        };
    };

    static getDealershipsAroundLocation = (location, radius) => {
        return (dispatch, getState) => {
            dispatch(Actioner.setLoading(true));
            return Api.getDealershipAroundLocation(AuthenticationUtils.getAccessTokenFromState(getState()), { ...location, distance: radius })
                .then((apiDealerships) => {
                    const dealerships = Utils.serializeDealershipsFromApi(apiDealerships);
                    dispatch(Actioner.setDealerships(dealerships));
                    return Promise.resolve(dealerships);
                })
                .catch((error) => {
                    dispatch(Actioner.setError(error));
                    return Promise.reject(error);
                });
        };
    };
}
