import { XHTTP } from "../../";
import { APIUtils } from "../../Api";

export class Api {
    static END_POINTS = {
        sendConfirmationEmail: () => "api/email-confirmation-tokens",
        checkConfirmationEmail: (token) => `api/email-confirmation-tokens/${token}`,
    };

    static sendConfirmationEmail(access_token) {
        const url =  APIUtils.getCurrentBaseUrl();
        return XHTTP(Api.END_POINTS.sendConfirmationEmail(), {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify({callbackUrl: url + '/bienvenue/'})
        });
    }

    static checkConfirmationEmail(access_token, token) {
        return XHTTP(Api.END_POINTS.checkConfirmationEmail(token), {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
        });
    }
}
