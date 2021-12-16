import { ActionTypes } from "./actionTypes";
import { Utils as AuthenticationUtils } from "../../Authentication/utils";
import { Api } from "./api";
import { Utils } from "./utils";

export class Actioner {
    static setUserDeals(deals) {
        return {
            type: ActionTypes.SET_DEALS,
            deals
        };
    }

    static resetDeals() {
        return {
            type: ActionTypes.RESET_DEALS
        };
    }

    static getUserDeals(id) {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.getUserDeals(access_token, id).then((dealsFromApi) => {
                const deals = Utils.serializeDealsFromApi(dealsFromApi);
                dispatch(Actioner.setUserDeals(deals));
                return Promise.resolve({
                    deals: deals,
                    next: Utils.serializePaginationFromApi(dealsFromApi)
                });
            });
        };
    }
}
