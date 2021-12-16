import { combineReducers } from "redux";
import { SerialReducer } from "./Serial";
import { CredentialReducer } from "./Credential";
import { SignUpProcessVehicleReducer } from "./Vehicle";
import { SignUpProcessPersonalReducer } from "./Personal";
import { SignUpProcessEmailConfirmationReducer } from "./EmailConfirmation";

export const Reducer = combineReducers({
    Serial: SerialReducer,
    Credential: CredentialReducer,
    Vehicle: SignUpProcessVehicleReducer,
    Personal: SignUpProcessPersonalReducer,
    EmailConfirmation: SignUpProcessEmailConfirmationReducer,
});
