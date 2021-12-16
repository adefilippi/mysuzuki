import { XHTTP } from "../";

export class Api {
    static END_POINTS = {
        passwordRequestTokens: () => "api/password-request-tokens",
        updatePasswordRequestTokens: (id) => `api/password-request-tokens/${id}`,
    };

    static create(params) {
        return XHTTP(Api.END_POINTS.passwordRequestTokens(), {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        }, true);
    }

    static update(id, params) {
        return XHTTP(Api.END_POINTS.updatePasswordRequestTokens(id), {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        }, true);
    }
}
