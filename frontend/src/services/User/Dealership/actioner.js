import { AuthenticationUtils, UserInformationsActioner, UserInformationsUtils } from "../../";
import { Api } from "./api";
import { Utils } from "./utils";
import { ActionTypes } from "./actionTypes";
import { fromJS } from "immutable";

export class Actioner {
    static setUserDealership(dealership) {
        return {
            type: ActionTypes.SET_DEALERSHIP,
            dealership
        };
    }

    static setLoading(loading, id) {
        return {
            type: ActionTypes.SET_LOADING,
            id,
            loading
        };
    }

    static getUserDealershipFromId(id) {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.getDealership(access_token, id).then((dealership) => {
                dispatch(Actioner.setUserDealership(dealership));
                return Promise.resolve(dealership);
            });
        };
    }

    static updateUserDealership(dealership) {
        return (dispatch, getState) => {
            const dealershipId = Utils.getDealershipId(dealership);
            dispatch(Actioner.setLoading(true, dealershipId));
            return dispatch(UserInformationsActioner.updateUserInformations({ dealership: dealershipId })).then((informations) => {
                return dispatch(Actioner.getUserDealershipFromId(informations.dealership)).then((dl) => {
                    dispatch(Actioner.setLoading(false, dealershipId));
                    return Promise.resolve(dl);
                });
            });
        };
    }
}
