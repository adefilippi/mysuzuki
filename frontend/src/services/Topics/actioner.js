import { Api } from "./api";
import { ActionTypes } from "./actionTypes";
import { Utils as AuthenticationUtils } from "../Authentication/utils";
import { Utils as APIUtils } from "../Api/utils";

export class Actioner {
    static set(topics) {
        return {
            type: ActionTypes.SET_TOPICS,
            topics
        };
    }

    static reset() {
        return {
            type: ActionTypes.RESET_TOPICS,
        };
    }

    static get() {
        return (dispatch) => {
            return Api.get().then((data) => {
                const topics = APIUtils.unserializeCollection(data);
                dispatch(Actioner.set(topics));
                return Promise.resolve({topics});
            });
        };
    }
}
