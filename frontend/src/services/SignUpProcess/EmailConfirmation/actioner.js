import { Utils as AuthenticationUtils } from "../../Authentication/utils";
import { Api } from "./api";
import { UserInformationsActioner } from "../../";
import { ActionTypes } from "./actionTypes";

export class Actioner {

    static storeToken(token) {
        return {
            type: ActionTypes.STORE_CONFIRMATION_TOKEN,
            token
        }
    }

    static storeEmailConfirmationToken(token) {
        return (dispatch) => {
            dispatch(Actioner.storeToken(token));
            return Promise.resolve();
        };
    }

    static sendConfirmationEmail() {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.sendConfirmationEmail(access_token)
                .then((data) => {
                    dispatch(UserInformationsActioner.applyPatchToUser({ emailConfirmationSentAt: new Date() }));
                    return Promise.resolve(data);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        };
    }

    static getEmailConfirmation(token) {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.checkConfirmationEmail(access_token, token.get("token"))
                .then((data) => {
                    dispatch(UserInformationsActioner.applyPatchToUser({ enabled: true }));
                    dispatch(Actioner.storeToken({confirmed: true}));
                    return Promise.resolve(data);
                })
                .catch((error) => {
                    return Promise.reject(error);
                })
            ;
        };
    }
}
