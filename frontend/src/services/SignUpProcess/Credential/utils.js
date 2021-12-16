export class Utils {
    static isValidated(state) {
        return state && state.SignUpProcess && state.SignUpProcess.Credential && !state.SignUpProcess.Credential.get("error") && !state.SignUpProcess.Credential.get("empty");
    }

    static getRehydrateValueFromAction(action) {
        return action && action.payload && action.payload.SignUpProcess ? action.payload.SignUpProcess.Credential || Utils.getInitialState() : Utils.getInitialState();
    }

    static getInitialState() {
        return {
            empty: true,
            rehydrated: false,
            loading: false
        };
    }
}
