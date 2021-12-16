import { XHTTP } from "../";

export class Api {
    static END_POINTS = {
        getStaffSizes: () => "api/staff-sizes"
    };

    static getStaffSizes(access_token) {
        return XHTTP(Api.END_POINTS.getStaffSizes(), {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            }
        });
    }
}
