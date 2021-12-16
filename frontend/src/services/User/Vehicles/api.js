import { XHTTP } from "../../";

export class Api {
    static END_POINTS = {
        getUserVehicles: () => `api/vehicles`,
        updateUserVehicle: (vin) => `api/vehicles/${vin}`,
        maintenances: (vin) => `api/vehicles/${vin}/maintenances`,
    };

    static getUserVehicles(accessToken) {
        return XHTTP(Api.END_POINTS.getUserVehicles(), {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    static updateUserVehicle(accessToken, vin, params = {}) {
        return XHTTP(Api.END_POINTS.updateUserVehicle(vin), {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(params)
        });
    }

    static update(accessToken, id, params = {}) {
        return XHTTP(id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(params)
        });
    }

    static getMaintenances(accessToken, vehicleId) {
        return XHTTP(Api.END_POINTS.maintenances(vehicleId), {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
}
