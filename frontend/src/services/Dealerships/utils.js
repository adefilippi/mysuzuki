export class Utils {
    static getDealershipListFromState(state) {
        return state && state.Dealerships && state.Dealerships.get("list");
    }

    static serializeDealershipsFromApi(apiDealerships) {
        return apiDealerships ? apiDealerships["hydra:member"] : [];
    }

    static getDealershipsFromState(state) {
        return state && state.Dealerships;
    }
}
