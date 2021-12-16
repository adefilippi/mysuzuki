import { XHTTP, APIUtils, APIConfig } from "../";

export class Api {
    static END_POINTS = {
        getAuthFromCredentials: () => `oauth/v2/token`,
        refreshAuth: () => `oauth/v2/token`
    };

    static getAuthFromCredentials({ email, password }) {
        return XHTTP(Api.END_POINTS.getAuthFromCredentials(), {
            method: "post",
            headers: {},
            body: APIUtils.toFormData({
                client_id: APIConfig.client_id,
                grant_type: "password",
                username: email,
                password: password
            })
        });
    }

    static refreshAuth({ refresh_token }) {
        return XHTTP(Api.END_POINTS.refreshAuth(), {
            method: "post",
            headers: {},
            body: APIUtils.toFormData({
                client_id: APIConfig.client_id,
                grant_type: "refresh_token",
                refresh_token
            })
        });
    }
}
