import { ActionTypes } from "./actionTypes";
import { Utils as AuthenticationUtils } from "../../Authentication/utils";
import { Api } from "./api";
import { Utils } from "./utils";

export class Actioner {
    static setUserGames(games) {
        return {
            type: ActionTypes.SET_GAMES,
            games
        };
    }

    static resetGames() {
        return {
            type: ActionTypes.RESET_GAMES
        };
    }

    static gameParticipation(response) {
        return {
            type: ActionTypes.PARTICIPATE,
            response
        };
    }

    static getUserGames(id) {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.getUserGames(access_token, id).then((gamesFromApi) => {
                const games = Utils.serializeGamesFromApi(gamesFromApi);
                dispatch(Actioner.setUserGames(games));
                return Promise.resolve({
                    games: games,
                    next: Utils.serializePaginationFromApi(gamesFromApi)
                });
            });
        };
    }

    static participateGame(id) {
        const params = {
            game: id,
        };

        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());

            return Api.participateGame(access_token, params)
                .then((data) => {
                    dispatch(Actioner.gameParticipation(data));
                    return Promise.resolve(data);
                })
                .catch((errors) => {
                    return Promise.reject(errors);
                });
        };
    }

    static userParticipatedToGame() {
        return (dispatch, getState) => {
            const access_token = AuthenticationUtils.getAccessTokenFromState(getState());
            return Api.getParticipations(access_token)
                .then((data) => {
                    const participations = Utils.serializeGamesFromApi(data) || [];
                    return Promise.resolve({
                        participations,
                        next: Utils.serializePaginationFromApi(data),
                    });
                })
                .catch((errors) => {
                    return Promise.reject(errors);
                });
        };
    }
}
