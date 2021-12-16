import { AuthenticationActioner } from "../Authentication";
import { ActionTypes } from "./actionTypes";
import { UserActioner } from "../index";

export class Actioner {
    static setLoading(loading) {
        return {
            type: ActionTypes.SET_LOADING,
            loading
        };
    }

    static setError(error) {
        return {
            type: ActionTypes.SET_ERROR,
            error
        };
    }

    static setAccount(account) {
        return {
            type: ActionTypes.SET_ACCOUNT,
            account
        };
    }

    static loginFromCredential = (credential) => {
        return (dispatch) => {
            dispatch(Actioner.setLoading(true));
            return dispatch(AuthenticationActioner.setAuthFromCredentials(credential))
                .then((auth) => {
                    return dispatch(UserActioner.getUser()).then(() => {
                        dispatch(Actioner.setLoading(false));
                        return Promise.resolve(auth);
                    });
                })
                .catch((error) => {
                    dispatch(Actioner.setError(error));
                    dispatch(Actioner.setLoading(false));
                    return Promise.reject(error);
                });
        };
    }

    static loginFromToken = (token) => {
        return (dispatch) => {
            dispatch(Actioner.setLoading(true));
            return dispatch(AuthenticationActioner.setAuthFromToken(token))
                .then((auth) => {
                    return dispatch(UserActioner.getUser())
                        .then(() => {
                            dispatch(Actioner.setLoading(false));
                            return Promise.resolve(auth);
                        })
                        .catch(error => {
                            return Promise.reject(error);
                        });
                })
                .catch((error) => {
                    dispatch(Actioner.setError(error));
                    dispatch(Actioner.setLoading(false));
                    return Promise.reject(error);
                });
        };
    }
}
