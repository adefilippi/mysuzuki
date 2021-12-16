import { XHTTP } from "../../";

export class Api {
    static getDealership(access_token, id) {
        return XHTTP(id, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            }
        });
    }
}
