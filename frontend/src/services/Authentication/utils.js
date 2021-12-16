import { REHYDRATE } from "redux-persist/constants";
import { ActionTypes } from "./actionTypes";

export class Utils {
    static serializeAuthenticationFromAPI(auth) {
        if (!auth) {
            return null;
        }
        return {
            access_token: auth.access_token,
            expiration_date: Utils.getExpirationDateFromAuth(auth.expires_in),
            refresh_token: auth.refresh_token
        };
    }

    static getAuthenticationStateFromSetAuthAction(action) {
        if (!action) {
            return null;
        }
        return {
            access_token: action.access_token,
            expiration_date: action.expiration_date,
            refresh_token: action.refresh_token
        };
    }

    static getMiddlewareAuthentication(state, action) {
        let authentication = null;
        if (action && action.type == REHYDRATE) {
            authentication = Utils.getAuthenticationStateFromRehydrateAction(action);
        } else if (action && action.type == ActionTypes.SET_AUTH) {
            authentication = Utils.getAuthenticationStateFromSetAuthAction(action);
        } else if (state && state.Authentication && state.Authentication.get("rehydrated")) {
            authentication = state.Authentication.toJS();
        }
        return authentication;
    }

    static getAuthenticationStateFromRehydrateAction(action) {
        return action && action.payload && action.payload.Authentication ? action.payload.Authentication : null;
    }

    static authenticationIsExpired(authentication) {
        if (!authentication || !authentication.expiration_date) {
            return false;
        }
        return authentication.expiration_date - new Date().getTime() < 0;
    }

    static getExpirationDateFromAuth(delay) {
        return new Date().getTime() + Number(delay) * 999;
    }

    static getAccessTokenFromState(state) {
        return state && state.Authentication && state.Authentication.get("access_token");
    }

    static isAuthenticated(state) {
        return !!Utils.getAccessTokenFromState(state);
    }
}
