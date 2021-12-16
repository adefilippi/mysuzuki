import { Utils } from "./utils";
import { Actioner } from "./actioner";
import { ActionTypes } from "./actionTypes";

import { getManager } from "./manager";

export const Middleware = ({ dispatch, getState }) => (next) => (action) => {
    let authentication = Utils.getMiddlewareAuthentication(getState(), action);

    if (action && action.type === ActionTypes.SET_AUTH) {
        return next(action);
    }

    if (Utils.authenticationIsExpired(authentication)) {
        if (!getManager().isRefreshing) {
            getManager().setIsRefreshing(true);
            next(Actioner.refreshAuthentication(authentication)).then((authentication) => {
                getManager().setIsRefreshing(false);
                return getManager().dequeue(dispatch, getState, authentication);
            });
        }
        return getManager().queueAction(action);
    }

    return next(action);
};
