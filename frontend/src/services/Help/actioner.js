import { Api } from "./";
import { Utils } from "./utils";

export class Actioner {
    static sendIssue = (values) => {
        const params = Utils.formatValues(values);
        return () => {
            if (values.attachment) {
                return Api.createAttachment(values.attachment)
                    .then((data) => {
                        params.attachment = data["@id"];
                        return Api.createIssue(params)
                            .then((data) => {
                                return Promise.resolve(data);
                            })
                            .catch((error) => {
                                return Promise.reject(error);
                            })
                        ;

                    })
                    .catch((error) => {
                        return Promise.reject(error);
                    })
                ;
            }
            delete params.attachment;
            return Api.createIssue(params)
                .then((data) => {
                    return Promise.resolve(data);
                })
                .catch((error) => {
                    return Promise.reject(error);
                })
            ;
        };
    };
}
