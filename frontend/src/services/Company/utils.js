export class Utils {
    static getStaffSizesFromState(state) {
        return state && state.Company && state.Company.get("staffSizes");
    }

    static serializeStaffSizesFromApi(apiStaffSizes) {
        return apiStaffSizes ? apiStaffSizes["hydra:member"] : [];
    }

    static getStaffSizesForChoiceFromState(state) {
        const list = Utils.getStaffSizesFromState(state);
        if (list) {
            return list
                .map((size) => {
                    return {
                        value: size.get("id"),
                        label: size.get("label")
                    };
                })
                .toJS();
        }
        return [];
    }
}
