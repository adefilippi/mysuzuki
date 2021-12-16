export class Utils {
    static getUserEmailFromState(state) {
        if (!state || !state.User || !state.User.Informations) return "";
        return state.User.Informations.get("email");
    }

    static getUserNameFromState(state) {
        if (!state || !state.User || !state.User.Informations || !state.User.Informations.get("lastName")) return "";
        return `${state.User.Informations.get("firstName")} ${state.User.Informations.get("lastName")}`;
    }

    static getUserLastNameFromState(state) {
        if (!state || !state.User || !state.User.Informations || !state.User.Informations.get("lastName")) return "";
        return state.User.Informations.get("lastName");
    }

    static getUserFromState(state) {
        if (!state || !state.User || !state.User.Informations) return null;
        return state.User.Informations;
    }

    static getRehydrateValueFromAction(action) {
        return action && action.payload && action.payload.User ? action.payload.User.Informations || {} : {};
    }

    static isUserEmailConfirmedFromState(state) {
        const user = Utils.getUserFromState(state);
        if (!user) return false;
        return Utils.isUserInformationHydratedFromState(state) && user.get("enabled");
    }

    static isUserInformationHydratedFromState = (state) => {
        const user = Utils.getUserFromState(state);
        if (!user || !user.get("rehydrated")) return false;
        return true;
    };

    static hasUserCompleteSignUpFromState = (state) => {
        const user = Utils.getUserFromState(state);
        if (!user || !user.get("rehydrated")) return false;
        return user.get("enabled") || (user.get("emailConfirmationSentAt") !== null && user.get("emailConfirmationSentAt") !== undefined);
    };

    static isEnabled = (state) => {
        const user = Utils.getUserFromState(state);
        if (!user || !user.get("rehydrated")) return false;
        return user.get("enabled") === true;
    };

    static getIsInflatedFromState(state) {
        const user = Utils.getUserFromState(state);
        if (!user || !user.get("@id")) return false;
        return true;
    }

    static formatNationalPhone(phone) {
        if (phone === "") {
            return phone;
        }

        phone = phone
            .replace(/[\s.-]/g, "")
            .match(/\d+/g)
            .map(Number)[0]
            .toString();
        if (phone.length === 10 && phone.charAt(0) === "0") phone = phone.replace("0", "+33");
        if (phone.length === 9 && phone.charAt(0) !== "0") phone = "+33" + phone;
        if (phone.charAt(0) === "3" && phone.charAt(1) === "3") phone = "+" + phone;

        return phone;
    }

    static fromFormToApiParams(values) {
        let params = {};

        if (values.landlinePhone !== undefined) {
            params.landlinePhone = values.landlinePhone ?  this.formatNationalPhone(values.landlinePhone) : null;
        }

        if (values.mobilePhone !== undefined) {
            params.mobilePhone = values.mobilePhone ? this.formatNationalPhone(values.mobilePhone) : null;
        }

        if (values.civ) {
            params.civ = values.civ;
        }

        if (values.firstName) {
            params.firstName = values.firstName;
        }

        if (values.dateOfBirth) {
            params.dateOfBirth = values.dateOfBirth;
        }

        if (undefined !== values.smsOptin && null !== values.smsOptin) {
            params.optin = {
                sms: values.smsOptin
            };
        }

        if (params.mobilePhone === null) {
            params.optin = {
                sms: false,
                email: values.emailOptin || false
            };
        }

        if (undefined !== values.emailOptin && null !== values.emailOptin) {
            params.optin = params.optin || {};
            params.optin.email = values.emailOptin;
        }

        if (values.dateOfBirth) {
            params.dateOfBirth = values.dateOfBirth;
        }

        if (values.addressStreet || values.addressAdditional1 || values.addressAdditional2 || values.addressZipCode || values.addressCity) {
            params.address = {
                street: values.addressStreet,
                additional1: values.addressAdditional1,
                additional2: values.addressAdditional2,
                zipCode: values.addressZipCode,
                city: values.addressCity
            };
        }

        params.job = {
            name: values.jobName,
            department: values.jobDepartment,
            organization: {
                name: values.jobOrganizationName,
                numberOfVehicles: parseInt(values.jobOrganizationNumberOfVehicles) || null,
                siret: values.jobOrganizationSiretCode,
                naf: {
                    code: values.jobOrganizationNafCode
                },
                size: parseInt(values.jobOrganizationSize) || null,
            }
        };

        return params;
    }
}
