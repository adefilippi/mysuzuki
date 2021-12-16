import { REHYDRATE } from "redux-persist/constants";
import { UserActioner, AuthenticationUtils } from "../";

const Middleware = ({ dispatch, getState }) => (next) => (action) => {
    if (action && action.type === REHYDRATE) {
        if (AuthenticationUtils.isAuthenticated(getState())) dispatch(UserActioner.getUser());
    }
    return next(action);
};

export { Middleware };
