import { XHTTP } from "../../";

export class Api {
    static END_POINTS = {
        getUserInformations: () => `api/users/current`,
        updateUserInformations: () => `api/users/current`
    };

    static getUserInformations(access_token) {
        return XHTTP(Api.END_POINTS.getUserInformations(), {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            }
        });
    }

    static updateUserInformations(access_token, params) {
        return XHTTP(Api.END_POINTS.updateUserInformations(), {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(params)
        });
    }
}
