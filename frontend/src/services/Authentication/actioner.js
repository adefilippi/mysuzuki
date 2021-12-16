import { ActionTypes } from "./actionTypes";
import { Api } from "./api";
import { Utils } from "./utils";
import { UserActioner } from "../index";

export class Actioner {
    static setAuth(auth) {
        return {
            type: ActionTypes.SET_AUTH,
            auth
        };
    }

    static errorOnSigning(error) {
        return {
            type: ActionTypes.ERROR_ON_SIGNING,
            error
        };
    }

    static removeError() {
        return {
            type: ActionTypes.REMOVE_ERROR
        };
    }

    static setAuthFromCredentials(credentials) {
        return (dispatch, getState) => {
            return Api.getAuthFromCredentials(credentials)
                .then((auth) => {
                    dispatch(Actioner.setAuth(Utils.serializeAuthenticationFromAPI(auth)));
                    return Promise.resolve(auth);
                })
                .catch((error) => {
                    dispatch(Actioner.errorOnSigning(error));
                    return Promise.reject(error);
                });
        };
    }

    static setAuthFromToken(token) {
        const auth = {
            access_token: token,
            expiration_date: Utils.getExpirationDateFromAuth(3600),
            refresh_token: 'no_refresh_token'
        };

        return (dispatch, getState) => {
            try {
                dispatch(Actioner.setAuth(auth));
                return Promise.resolve(auth);
            }
            catch (error) {
                return Promise.reject(error);
            }
        }
    }

    static refreshAuthentication(givenAuth) {
        return (dispatch, getState) => {
            const authentication = givenAuth || getState().authentication.toJS();
            if (!Utils.authenticationIsExpired(authentication)) return Promise.resolve(authentication);
            return Api.refreshAuth(authentication)
                .then((auth) => {
                    dispatch(Actioner.setAuth(Utils.serializeAuthenticationFromAPI(auth)));
                    return Promise.resolve(auth);
                })
                .catch((error) => {
                    return dispatch(UserActioner.signout());
                });
        };
    }

    static signout() {
        return (dispatch) => {
            dispatch(Actioner.setAuth({}));
            return Promise.resolve();
        };
    }
}
