import {XHTTP} from "../index";

export class Api {
    static get() {
        return XHTTP("api/topics", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        }, true);
    }
}
