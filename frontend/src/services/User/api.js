import { XHTTP } from "../";

export class Api {
    static END_POINTS = {
        passwordChanges: () => "api/password-changes"
    };

    static updatePassword(access_token, params) {
        return XHTTP(Api.END_POINTS.passwordChanges(), {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(params)
        });
    }
}
