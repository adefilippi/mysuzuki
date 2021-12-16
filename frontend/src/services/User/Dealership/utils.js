export class Utils {
    static getUserDealershipFromState(state) {
        if (!state || !state.User || !state.User.Dealership) return null;
        return state.User.Dealership;
    }

    static getUserDealershipIdFromState(state) {
        if (!state || !state.User || !state.User.Dealership) return null;
        return state.User.Dealership.get("@id");
    }

    static getRehydrateValueFromAction(action) {
        return action && action.payload && action.payload.User ? action.payload.User.Dealership || {} : {};
    }

    static getDealershipId(dealership) {
        if (!dealership) return null;
        return dealership.get ? dealership.get("@id") : dealership["@id"];
    }
}
