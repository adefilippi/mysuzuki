import { XHTTP } from "../../";

export class Api {
    static END_POINTS = {
        getUserGames: (id) => {
            if(id && id.charAt(0) === "/"){
                return id.replace("/","");
            }

            return "api/games";
        },
        participate: () => "api/participations",
        getParticipations: () => "api/participations",
    };

    static getUserGames(accessToken, id) {
        return XHTTP(Api.END_POINTS.getUserGames(id), {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
        });
    }

    static participateGame(access_token, params) {
        return XHTTP(Api.END_POINTS.participate(), {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(params)
        });
    }

    static getParticipations(access_token) {
        return XHTTP(Api.END_POINTS.getParticipations(), {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
        });
    }
}
