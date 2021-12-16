export class Utils {
    static getSerialFromState(state) {
        return {
            lastName: state.SignUpProcess.Serial.get("lastName"),
            vin: state.SignUpProcess.Serial.get("id"),
            clientId: state.SignUpProcess.Serial.get("clientId"),
        };
    }

    static isValidated(state) {
        return state && state.SignUpProcess && state.SignUpProcess.Serial && !state.SignUpProcess.Serial.get("error") && !state.SignUpProcess.Serial.get("empty");
    }

    static getRehydrateValueFromAction(action) {
        return action && action.payload && action.payload.SignUpProcess ? action.payload.SignUpProcess.Serial || Utils.getInitialState() : Utils.getInitialState();
    }

    static getInitialState() {
        return {
            empty: true,
            rehydrated: false,
            loading: false
        };
    }
}
