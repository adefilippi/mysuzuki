import { XHTTP } from "../../";

export class Api {
    static END_POINTS = {
        getUserDeals: (id) => {
            if(id && id.charAt(0) === "/"){
                return id.replace("/","");
            }

            return "api/offers";
        },
    };

    static getUserDeals(accessToken, id) {
        return XHTTP(Api.END_POINTS.getUserDeals(id), {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
}
