import { fromJS } from "immutable";
import { ActionTypes } from "./actionTypes";
import { ActionTypes as UserActionTypes } from "../User/actionTypes";

const initialState = () => new fromJS([]);

export const Reducer = (state = initialState(), action) => {
    switch (action.type) {
        case UserActionTypes.SIGNOUT:
        case ActionTypes.RESET_ARTICLES:
            return initialState();
        case ActionTypes.SET_ARTICLES:
            return fromJS([...state,...action.articles]);
        case ActionTypes.SET_ARTICLE:
            if(state.findIndex((article) => article.get("@id") === action.article["@id"]) !== -1){
                return state;
            }

            return fromJS([...state, action.article]);
        case ActionTypes.SET_ASSOCIATED_ARTICLES:
            return state.update(
                state.findIndex(article => article.get("@id") === action.id),
                article => article.set("associatedArticles", action.articles),
            );
        default:
            return state;
    }
};
