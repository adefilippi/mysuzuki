import { UserInformationsActioner, UserVehiclesActioner, UserDealershipActioner } from "./";
import { ActionTypes } from "./actionTypes";
import { AuthenticationActioner } from "../Authentication";
import { AuthenticationUtils } from "../index";
import { Api as UserApi } from "./api";

export class Actioner {
    static dispatchSignout() {
        return {
            type: ActionTypes.SIGNOUT
        };
    }

    static getUser() {
        return (dispatch, getState) => {
            return dispatch(UserInformationsActioner.getUserInformations())
                .then(() => {
                    return dispatch(UserVehiclesActioner.getUserVehicles())
                        .then(() => {
                            return Promise.resolve();
                        })
                        .catch(error => {
                            return Promise.reject(error);
                        });
                })
                .catch(error => {
                    return Promise.reject(error);
                })
        };
    }

    static refreshUser() {
        return (dispatch, getState) => {
            return Promise.resolve(dispatch(UserInformationsActioner.refreshUserInformations()));
        };
    }

    static signout() {
        return (dispatch) => {
            return dispatch(AuthenticationActioner.signout()).then(() => {
                dispatch(Actioner.dispatchSignout());
                return Promise.resolve();
            });
        };
    }

    static updatePassword(values) {
        return (dispatch, getState) => {
            const params = {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword
            };
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return UserApi.updatePassword(access_token, params)
                .then((data) => {
                    return Promise.resolve(data);
                })
                .catch((errors) => {
                    return Promise.reject(errors);
                });
        };
    }
}
