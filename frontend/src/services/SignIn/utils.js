export class Utils {
    static getSignInIsLoadingFromState(state) {
        return state && state.SignIn && state.SignIn.get("loading");
    }

    static getInitialState() {
        return {
            loading: false
        };
    }
}
