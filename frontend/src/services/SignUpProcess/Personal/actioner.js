import { ActionTypes } from "./actionTypes";
import { Utils } from "./utils";
import { UserInformationsActioner } from "../../";
import { Actioner as SignUpEmailConfirmationlActioner } from "../EmailConfirmation/actioner";

export class Actioner {
    static storeStep(stepValues) {
        return (dispatch, getState) => {
            dispatch({
                type: ActionTypes.STORE_PERSONAL_STEP,
                stepValues
            });
            return Promise.resolve(stepValues);
        };
    }

    static setLoading(loading) {
        return {
            type: ActionTypes.SET_LOADING,
            loading
        };
    }

    static submitStep(stepValues) {
        return (dispatch, getState) => {
            const { userParams } = Utils.getUserInformationsUpdateParamsFromFormValues(stepValues);
            dispatch(Actioner.setLoading(true));
            return dispatch(UserInformationsActioner.updateUserInformations(userParams))
                .then(() => {
                    return dispatch(Actioner.storeStep(stepValues)).then(() => {
                        return dispatch(SignUpEmailConfirmationlActioner.sendConfirmationEmail())
                            .then((data) => {
                                dispatch(Actioner.setLoading(false));
                                return Promise.resolve(data);
                            })
                            .catch((error) => {
                                dispatch(Actioner.setLoading(false));
                                return Promise.reject(error);
                            })
                        ;
                    });
                })
                .catch((error) => {
                    dispatch(Actioner.setLoading(false));
                    return Promise.reject(error);
                });
        };
    }
}
