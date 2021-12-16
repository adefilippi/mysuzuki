export class Utils {
    static isValidated(state) {
        return state && state.SignUpProcess && state.SignUpProcess.Personal && !state.SignUpProcess.Personal.get("error") && !state.SignUpProcess.Personal.get("empty");
    }

    static getRehydrateValueFromAction(action) {
        return action && action.payload && action.payload.SignUpProcess ? action.payload.SignUpProcess.Personal || Utils.getInitialState() : Utils.getInitialState();
    }

    static getInitialState() {
        return {
            empty: true,
            rehydrated: false,
            loading: false
        };
    }

    static formatNationalPhone(phone) {
        if(phone === ""){
            return phone;
        }

        phone = phone.replace(/[\s.-]/g,"").match(/\d+/g).map(Number)[0].toString();
        if(phone.length === 10 && phone.charAt(0) === '0') phone = phone.replace('0','+33');
        if(phone.length === 9 && phone.charAt(0) !== '0') phone = '+33' + phone;
        if(phone.charAt(0) === "3" && phone.charAt(1) === "3") phone =  '+' + phone;

        return phone;
    }

    static getUserInformationsUpdateParamsFromFormValues(formValues = {}) {
        let phones = {};

        if(formValues.landlinePhone){
            phones.landlinePhone = this.formatNationalPhone(formValues.landlinePhone);
        }

        if(formValues.mobilePhone){
            phones.mobilePhone = this.formatNationalPhone(formValues.mobilePhone);
        }

        return {
            userParams: {
                civ: formValues.civ,
                firstName: formValues.firstName,
                address: {
                    street: formValues.addressStreet,
                    additional1: formValues.addressAdditional1,
                    additional2: formValues.addressAdditional2,
                    zipCode: formValues.addressZipCode,
                    city: formValues.addressCity
                },
                ...phones,
                dateOfBirth: formValues.dateOfBirth,
                optin: {
                    sms: formValues.optinSMS,
                    email: formValues.optinEmail
                }
            }
        };
    }
}
