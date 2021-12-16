export class Utils {
    static serializeDealsFromApi(dealsFromApi) {
        return dealsFromApi && dealsFromApi["hydra:member"];
    }

    static serializePaginationFromApi(dealsFromApi) {
        return dealsFromApi && dealsFromApi["hydra:view"] && dealsFromApi["hydra:view"]["hydra:next"];
    }

    static getDealsFromState(state) {
        const deals = state.User.Deals;
        return !Array.isArray(deals) ? deals.toJS() : deals;
    }
}
