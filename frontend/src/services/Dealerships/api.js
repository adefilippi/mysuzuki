import { XHTTP } from "../";

export class Api {
    static END_POINTS = {
        getDealershipAroundLocation: (lat, lng, distance) => `api/dealerships?latitude=${lat}&longitude=${lng}&distance=${distance}&closed=false`
    };

    static getDealershipAroundLocation(accessToken, { lat, lng, distance }) {
        return XHTTP(Api.END_POINTS.getDealershipAroundLocation(lat, lng, distance), {
            method: "get",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
}
