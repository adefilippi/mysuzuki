const ISSUE_TYPES_BASE_URL = "/api/issue-types";

export const ISSUE_TYPES = {
    SIGNUP: ISSUE_TYPES_BASE_URL + "/probleme-d-inscription",
    RESEND_CLIENT_ID: ISSUE_TYPES_BASE_URL + "/renvoyer-code-personnel",
    DELETE_ACCOUNT: ISSUE_TYPES_BASE_URL + "/supprimer-mon-compte",
    INFO_ERROR: ISSUE_TYPES_BASE_URL + "/informations-incorrectes",
    DELETE_VEHICLE: ISSUE_TYPES_BASE_URL + "/plus-en-possession-du-vehicule",
    ADD_VEHICLE: ISSUE_TYPES_BASE_URL + "/ajouter-un-vehicule",
    DELETE_OPTINS: ISSUE_TYPES_BASE_URL + "/plus-recevoir-informations-commerciales-suzuki",
};
