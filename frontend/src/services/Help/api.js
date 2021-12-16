import { XHTTP } from "../index";

export class Api {
    static END_POINTS = {
        issues: () => "api/issues",
        attachments: () => "api/attachments",
    };

    static createIssue(params) {
        return XHTTP(Api.END_POINTS.issues(), {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        }, true);
    }

    static createAttachment(file) {
        const form = new FormData();
        form.append('file', file);
        return XHTTP(Api.END_POINTS.attachments(), {
            method: "post",
            body: form
        }, true);
    }
}
