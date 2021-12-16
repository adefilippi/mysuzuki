import { Api } from "./api";
import { APIUtils } from "../index";
import { PATHS } from "../../routes";

export class Actioner {
    static create(values) {
        return () => {
            return Api
                .create({
                    ...values,
                    callbackUrl: `${APIUtils.getCurrentBaseUrl()}${PATHS.FORGOT_PASSWORD}`
                })
                .then((passwordRequestToken) => {
                    return Promise.resolve(passwordRequestToken);
                })
                .catch((error) => {
                    return Promise.reject(error);
                })
            ;
        };
    }

    static update(id, values) {
        return () => {
            return Api
                .update(id, values)
                .then((passwordRequestToken) => {
                    return Promise.resolve(passwordRequestToken);
                })
                .catch((error) => {
                    return Promise.reject(error);
                })
                ;
        };
    }
}
