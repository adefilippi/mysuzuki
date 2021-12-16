import { XHTTP } from "../../";

export class Api {
    static END_POINTS = {
        getInformationFromVin: (vin, lastName, clientId) => `api/vins/${vin}?lastName=${lastName}&clientId=${clientId}`
    };

    static getInformationFromVin({ vin, lastName, clientId }) {
        return XHTTP(
            Api.END_POINTS.getInformationFromVin(vin, lastName, clientId),
            {
                method: "get",
                headers: {
                    "content-type": "application/json"
                }
            },
            true
        );
    }
}
