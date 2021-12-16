import { combineReducers } from "redux";
import { UserInformationsReducer } from "./Informations";
import { UserVehiclesReducer } from "./Vehicles";
import { UserDealershipReducer } from "./Dealership";
import { UserDealsReducer } from "./Deals";
import { UserGamesReducer } from "./Games";

export const Reducer = combineReducers({
    Informations: UserInformationsReducer,
    Vehicles: UserVehiclesReducer,
    Dealership: UserDealershipReducer,
    Deals: UserDealsReducer,
    Games: UserGamesReducer,
});
