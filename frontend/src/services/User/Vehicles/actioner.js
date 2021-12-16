import { AuthenticationUtils } from "../../";
import { Api } from "./api";
import { Utils } from "./utils";
import { ActionTypes } from "./actionTypes";
import { APIUtils } from "../../Api";
import { MaintenancesActionTypes } from "../../Maintenances";

export class Actioner {
    static setUserVehicles(vehicles) {
        return {
            type: ActionTypes.SET_VEHICLES,
            vehicles
        };
    }

    static setMaintenances(maintenances) {
        return {
            type: MaintenancesActionTypes.SET_MAINTENANCES,
            maintenances
        };
    }

    static setUserVehicle(vehicle) {
        return {
            type: ActionTypes.SET_VEHICLE,
            vehicle
        };
    }

    static getUserVehicles() {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.getUserVehicles(access_token).then((vehiclesFromApi) => {
                const vehicles = Utils.serializeVehiclesFromApi(vehiclesFromApi);
                dispatch(Actioner.setUserVehicles(vehicles));
                return Promise.resolve(vehicles);
            });
        };
    }

    static updateUserVehicle(vin, params) {
        return (dispatch, getState) => {
            const accessToken = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.updateUserVehicle(accessToken, vin, {
                purchaseDate: params.purchaseDate,
                mileage: parseInt(params.mileage,0),
                annualMileage: parseInt(params.annualMileage,0) > 0 ? parseInt(params.annualMileage,0) : null,
            }).then((vehicleFromApi) => {
                const vehicle = Utils.serializeVehicleFromApi(vehicleFromApi);
                dispatch(Actioner.setUserVehicle(vehicle));
                return Promise.resolve(vehicle);
            });
        };
    }

    static update(id, params) {
        return (dispatch, getState) => {
            const accessToken = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.update(accessToken, id, {
                mileage: parseInt(params.mileage,0),
                annualMileage: parseInt(params.annualMileage,0) > 0 ? parseInt(params.annualMileage,0) : null,
            }).then((vehicleFromApi) => {
                const vehicle = Utils.serializeVehicleFromApi(vehicleFromApi);
                dispatch(Actioner.setUserVehicle(vehicle));
                return Promise.resolve(vehicle);
            });
        };
    }

    static getMaintenances(id) {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.getMaintenances(access_token, id).then((maintenances) => {
                maintenances = APIUtils.unserializeCollection(maintenances);
                dispatch(Actioner.setMaintenances(maintenances));
                return Promise.resolve(maintenances);
            });
        };
    }
}
