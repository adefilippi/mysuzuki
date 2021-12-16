import { Api } from "./api";
import { ActionTypes } from "./actionTypes";
import { Utils } from "./utils";
import { AuthenticationUtils } from "../";
export class Actioner {
    static setStaffSizes(sizes) {
        return {
            type: ActionTypes.SET_STAFF_SIZES,
            sizes
        };
    }

    static getStaffSizes() {
        return (dispatch, getState) => {
            const accessToken = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.getStaffSizes(accessToken).then((ApiStaffSizes) => {
                const staffSizes = Utils.serializeStaffSizesFromApi(ApiStaffSizes);
                dispatch(Actioner.setStaffSizes(staffSizes));
                return Promise.resolve(staffSizes);
            });
        };
    }
}
