import { AuthenticationUtils, UserDealershipActioner } from "../../";
import { Api } from "./api";
import { ActionTypes } from "./actionTypes";

export class Actioner {
    static setLoading(loading) {
        return {
            type: ActionTypes.SET_LOADING,
            loading
        };
    }

    static setUserInformation(userInformations) {
        return {
            type: ActionTypes.SET_INFORMATIONS,
            userInformations
        };
    }

    static applyPatchToUser(patch) {
        return {
            type: ActionTypes.PATCH,
            patch
        };
    }

    static getUserInformations() {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.getUserInformations(access_token).then((informations) => {
                dispatch(Actioner.setUserInformation(informations));
                return Promise.resolve(informations);
            });
        };
    }

    static refreshUserInformations() {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.getUserInformations(access_token).then((informations) => {
                dispatch(Actioner.setUserInformation(informations));
                return Promise.resolve(informations);
            });
        };
    }

    static updateUserInformations(params) {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.updateUserInformations(access_token, params)
                .then((informations) => {
                    dispatch(Actioner.setUserInformation(informations));
                    return Promise.resolve(informations);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        };
    }
}
