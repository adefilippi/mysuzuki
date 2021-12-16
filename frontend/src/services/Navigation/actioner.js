export class Actioner {
    static redirectTo(redirectionName, target = "") {
        return (dispatch, getState) => {
            const url = getState().Navigation.getIn(["redirections", redirectionName]);
            if (!url) return Promise.reject(`can't find url for ${redirectionName}`);
            target === "_blank" ? window.open(url) : window.location.assign(url);
        };
    }

    static onMailTo(email) {
        return (dispatch, getState) => {
            window.location.href = `mailto:${email}`;
            return Promise.resolve();
        };
    }

    static onPhone(phone) {
        return (dispatch, getState) => {
            window.location.href = `tel:${phone}`;
            return Promise.resolve();
        };
    }
}
