export class Utils {
    static isValidated(state) {
        return state && state.SignUpProcess && state.SignUpProcess.Vehicle && !state.SignUpProcess.Vehicle.get("error") && !state.SignUpProcess.Vehicle.get("empty");
    }

    static getVehicleUpdateParamsFromFormValues(formValues = {}) {
        return {
            vehicleParams: {
                mileage: parseInt(formValues.mileage),
                annualMileage: parseInt(formValues.annualMileage),
                purchaseDate: formValues.purchaseDate
            }
        };
    }

    static getUserInformationsUpdateParamsFromFormValues(formValues = {}) {
        return {
            userParams: {
                job: {
                    name: formValues.jobName,
                    department: formValues.jobDepartment,
                    organization: {
                        name: formValues.jobOrganizationName,
                        numberOfVehicles: parseInt(formValues.jobOrganizationNumberOfVehicles),
                        siret: formValues.jobOrganizationSiretCode,
                        naf: {
                            code: formValues.jobOrganizationNafCode
                        },
                        size: parseInt(formValues.jobOrganizationSize)
                    }
                }
            }
        };
    }

    static getRehydrateValueFromAction(action) {
        return action && action.payload && action.payload.SignUpProcess ? action.payload.SignUpProcess.Vehicle || Utils.getInitialState() : Utils.getInitialState();
    }

    static getInitialState() {
        return {
            empty: true,
            rehydrated: false,
            loading: false
        };
    }
}
