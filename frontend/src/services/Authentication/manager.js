import { REHYDRATE } from "redux-persist/constants";
import { Utils } from "./utils";

class ManagerClass {
    constructor() {
        this.isRefreshing = false;
        this.queue = [];
    }

    setIsRefreshing(isRefreshing) {
        this.isRefreshing = isRefreshing;
    }

    queueAction(action) {
        this.queue.push(action);
        return Promise.resolve();
    }

    dequeue(dispatch, getState, auth) {
        this.queue.map((action) => {
            if (action && action.type == REHYDRATE) {
                if (action && action.payload && action.payload.Authentication) {
                    action.payload.Authentication = Utils.serializeAuthenticationFromAPI(auth);
                }
                return dispatch(action);
            }
            return dispatch(action);
        });
        this.queue = [];
        return Promise.resolve();
    }
}

let manager = null;

export const getManager = () => {
    if (!manager) manager = new ManagerClass();
    return manager;
};
