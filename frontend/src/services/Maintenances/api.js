import { XHTTP } from "../";

export class Api {
    static END_POINTS = {
        maintenances: () => "api/maintenances",
    };

    static create(accessToken, params) {
        return XHTTP(Api.END_POINTS.maintenances(), {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(params)
        });
    }

    static update(accessToken, id, params) {
        return XHTTP(id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(params)
        });
    }

    static remove(accessToken, id) {
        return XHTTP(id, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
        });
    }
}
