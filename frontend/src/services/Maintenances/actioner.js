import { AuthenticationUtils, MaintenancesActionTypes as ActionTypes } from "../";
import { Api } from "./api";

export class Actioner {
    static addMaintenance(maintenance) {
        return {
            type: ActionTypes.ADD_MAINTENANCE,
            maintenance
        };
    }

    static updateMaintenance(maintenance) {
        return {
            type: ActionTypes.UPDATE_MAINTENANCE,
            maintenance
        };
    }

    static removeMaintenance(id) {
        return {
            type: ActionTypes.REMOVE_MAINTENANCE,
            maintenance: id
        };
    }

    static create(values) {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.create(access_token, values)
                .then((maintenance) => {
                    dispatch(Actioner.addMaintenance(maintenance));
                    return Promise.resolve(maintenance);
                })
                .catch((error) => {
                    return Promise.reject(error);
                })
            ;
        };
    }

    static update(id, values) {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.update(access_token, id, values)
                .then((maintenance) => {
                    dispatch(Actioner.updateMaintenance(maintenance));
                    return Promise.resolve(maintenance);
                })
                .catch((error) => {
                    return Promise.reject(error);
                })
            ;
        };
    }

    static remove(id) {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.remove(access_token, id)
                .then(() => {
                    dispatch(Actioner.removeMaintenance(id));
                    return Promise.resolve();
                })
                .catch((error) => {
                    return Promise.reject(error);
                })
            ;
        };
    }
}
