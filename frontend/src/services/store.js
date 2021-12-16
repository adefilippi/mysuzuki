import { createStore, applyMiddleware, compose } from "redux";
import { ApplicationReducer, AuthenticationMiddleware, UserMiddleware, UserDealershipMiddleware } from "./";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

const composeEnhancers = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
let Store = createStore(ApplicationReducer, composeEnhancers(applyMiddleware(AuthenticationMiddleware, thunk, UserMiddleware, UserDealershipMiddleware)));
persistStore(Store, { whitelist: ["Authentication", "SignUpProcess", "User"] });
export { Store };
