import { XHTTP } from "../../index";

export class Api {
    static END_POINTS = {
        issues: () => "api/issue-types"
    };

    static getIssueTypes(access_token) {
        const header = access_token ? {
            "Authorization": `Bearer ${access_token}`
        } : {};

        return XHTTP(Api.END_POINTS.issues(), {
            method: "get",
            headers: {
                ...header,
                "Content-Type": "application/json"
            }
        }, !access_token);
    }
}
