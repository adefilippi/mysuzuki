import { Map, List } from "immutable";

export class Utils {
    static ENERGY_TYPES = {
        ES: "ES",
        GO: "GO"
    };

    static getUserFirstVehicleFromState(state) {
        return (state && state.User && state.User.Vehicles && state.User.Vehicles.get(0)) || new Map({});
    }

    static getUserVehiclesFromState(state) {
        return (state && state.User && state.User.Vehicles) || new List([]);
    }

    static getUserVehiclesNameFromState(state) {
        const vehicles = Utils.getUserVehiclesFromState(state);

        return [...new Set(vehicles.toJS().map(vehicle => vehicle.model))];
    }

    static serializeVehiclesFromApi(vehiclesFromApi) {
        return vehiclesFromApi && vehiclesFromApi["hydra:member"];
    }

    static serializeVehicleFromApi(vehicleFromApi) {
        return vehicleFromApi;
    }

    static getUpdateParamsFromValues(values) {
        return { ...values };
    }

    static getRehydrateValueFromAction(action) {
        return action && action.payload && action.payload.User ? action.payload.User.Vehicles || [] : [];
    }

    static userHasAVehicleWithIdFromState(vehicleId, state) {
        const vehicles = Utils.getUserVehiclesFromState(state);
        return vehicles.findIndex((v) => v.get("vin") === vehicleId) > -1;
    }

    static getVehicleById(vehicleId, state) {
        const vehicles = Utils.getUserVehiclesFromState(state);
        return vehicles.find((v) => v.get("vin") === vehicleId);
    }

    static getVehicleModelInfosIntoString(vehicle, t) {
        const infosToDisplay = ["model", "color", "energy"];
        let infos = [];
        infosToDisplay.map((info) => {
            if (vehicle.get(info)) {
                infos.push(t(vehicle.get(info)));
            }
        });
        return infos.join(" - ").toLowerCase();
    }

}
