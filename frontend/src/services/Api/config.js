function getRoot() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        return `${process.env.REACT_APP_DEVELOPEMENT_API_ROOT}:${process.env.REACT_APP_DEVELOPEMENT_API_PORT}/`;
    }
    if (process.env.NODE_ENV === "production") {
        return `${process.env.REACT_APP_PRODUCTION_API_ROOT}:${process.env.REACT_APP_PRODUCTION_API_PORT}/`;
    }

    return `${process.env.REACT_APP_DEVELOPEMENT_API_ROOT}:${process.env.REACT_APP_DEVELOPEMENT_API_PORT}/`;
}

function getId() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        return `${process.env.REACT_APP_DEVELOPEMENT_API_CLIENT_ID}`;
    }
    if (process.env.NODE_ENV === "production") {
        return `${process.env.REACT_APP_PRODUCTION_API_CLIENT_ID}`;
    }
    return `${process.env.REACT_APP_DEVELOPEMENT_API_CLIENT_ID}`;
}

function getAppToken() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        return `${process.env.REACT_APP_DEVELOPEMENT_API_APP_TOKEN}`;
    }
    if (process.env.NODE_ENV === "production") {
        return `${process.env.REACT_APP_PRODUCTION_API_APP_TOKEN}`;
    }
    return `${process.env.REACT_APP_DEVELOPEMENT_API_APP_TOKEN}`;
}

export const Config = {
    root: getRoot(),
    client_id: getId(),
    appToken: getAppToken()
};
