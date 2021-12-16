export class Utils {
    static getToken(state) {
        if (!state || !state.SignUpProcess || !state.SignUpProcess.EmailConfirmation) return null;
        return state.SignUpProcess.EmailConfirmation;
    }

    static getRehydrateValueFromAction(action) {
        return action && action.payload && action.payload.SignUpProcess ? action.payload.SignUpProcess.EmailConfirmation || {} : {};
    }
}
