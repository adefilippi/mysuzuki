import { AuthenticationUtils } from "../";
import { ActionTypes } from "./actionTypes"
import { Api } from "./api";
import { APIUtils } from "../Api";

export class Actioner {
    static resetArticles() {
        return {
            type: ActionTypes.RESET_ARTICLES
        };
    }

    static resetNews() {
        return {
            type: ActionTypes.RESET_NEWS
        };
    }

    static setArticles(articles) {
        return {
            type: ActionTypes.SET_ARTICLES,
            articles
        };
    }

    static setNews(news) {
        return {
            type: ActionTypes.SET_NEWS,
            news: news
        };
    }

    static setAssociatedArticles(id, articles) {
        return {
            type: ActionTypes.SET_ASSOCIATED_ARTICLES,
            id,
            articles,
        };
    }

    static setArticle(article) {
        return {
            type: ActionTypes.SET_ARTICLE,
            article
        };
    }

    static getArticles(id, params) {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.get(access_token, id, params).then((data) => {
                const articles = APIUtils.unserializeCollection(data);
                dispatch(Actioner.setArticles(articles));
                return Promise.resolve({
                    articles: articles,
                    next: APIUtils.unserializePagination(data)
                });
            });
        };
    }

    static getNews(id, params) {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.get(access_token, id, params).then((data) => {
                const articles = APIUtils.unserializeCollection(data);
                dispatch(Actioner.setNews(articles));
                return Promise.resolve({
                    news: articles,
                    next: APIUtils.unserializePagination(data)
                });
            });
        };
    }

    static getAssociatedArticles(id) {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.getAssociatedArticles(access_token, id).then((data) => {
                const articles = APIUtils.unserializeCollection(data);
                dispatch(Actioner.setAssociatedArticles(id, articles));
                return Promise.resolve();
            });
        };
    }

    static getOne(slug) {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api
                .getOne(access_token, slug)
                .then((data) => {
                    dispatch(Actioner.setArticle(data));
                    return Promise.resolve(data);
                })
                .catch(() => {
                    return Promise.reject();
                })
            ;
        };
    }

    static getTags() {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.getTags(access_token).then((data) => {
                const tags = APIUtils.unserializeCollection(data);
                return Promise.resolve({
                    tags,
                });
            });
        };
    }

    static getVehicles() {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.getVehicles(access_token).then((data) => {
                const vehicles = APIUtils.unserializeCollection(data);
                return Promise.resolve({
                    vehicles,
                });
            });
        };
    }
}
