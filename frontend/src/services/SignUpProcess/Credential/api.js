import { XHTTP } from "../../";

export class Api {
    static END_POINTS = {
        getAccountFromCredential: () => `api/users`
    };

    static getAccountFromCredential({ email, password, lastName, vin, emailOptin }) {
        return XHTTP(
            Api.END_POINTS.getAccountFromCredential(),
            {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    lastName: lastName,
                    email: email,
                    plainPassword: password,
                    optin: {
                        email: emailOptin
                    },
                    vehicles: [
                        {
                            vin: vin
                        }
                    ]
                })
            },
            true
        );
    }
}
