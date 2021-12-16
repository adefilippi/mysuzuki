import { Api } from "./api";
import { APIUtils } from "../../Api";
import { AuthenticationUtils } from "../../Authentication";

export class Actioner {
    static getIssueTypes = () => {
        return (dispatch, getState) => {
            return Api.getIssueTypes(AuthenticationUtils.getAccessTokenFromState(getState()))
                .then((data) => {
                    return Promise.resolve(APIUtils.unserializeCollection(data));
                })
                .catch((error) => {
                    return Promise.reject(error);
                })
            ;
        };
    };
}
