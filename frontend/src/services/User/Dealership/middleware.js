import { UserInformationsActionTypes, UserDealershipActioner, UserDealershipUtils } from "../";

const Middleware = ({ dispatch, getState }) => (next) => (action) => {
    if (action && action.type === UserInformationsActionTypes.SET_INFORMATIONS) {
        if (action && action.userInformations && action.userInformations.dealership && action.userInformations.dealership !== UserDealershipUtils.getUserDealershipIdFromState(getState())) {
            dispatch(UserDealershipActioner.getUserDealershipFromId(action.userInformations.dealership));
        }
    }
    return next(action);
};

export { Middleware };
