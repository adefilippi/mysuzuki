import { Api } from "./api";
import { ActionTypes } from "./actionTypes";
import { SerialUtils, AuthenticationActioner, UserActioner, CompanyActioner } from "../../";

export class Actioner {
    static setAccount = (account) => {
        return {
            type: ActionTypes.SET_ACCOUNT,
            account
        };
    };

    static setError = (error) => {
        return {
            type: ActionTypes.SET_ERROR,
            error
        };
    };

    static setLoading = (loading) => {
        return {
            type: ActionTypes.SET_LOADING,
            loading
        };
    };

    static createAccountFromCredential = (credential) => {
        return (dispatch, getState) => {
            const serial = SerialUtils.getSerialFromState(getState());
            dispatch(Actioner.setLoading(true));
            return Api.getAccountFromCredential({ ...credential, ...serial })
                .then((account) => {
                    dispatch(Actioner.setAccount(account));
                    return dispatch(AuthenticationActioner.setAuthFromCredentials(credential)).then(() => {
                        return dispatch(UserActioner.getUser()).then(() => {
                            return dispatch(CompanyActioner.getStaffSizes()).then(() => {
                                dispatch(Actioner.setLoading(false));
                                return Promise.resolve(account);
                            });
                        });
                    });
                })
                .catch((error) => {
                    dispatch(Actioner.setError(error));
                    dispatch(Actioner.setLoading(false));
                    return Promise.reject(error);
                });
        };
    };
}
