export class Utils {
    static serializeGamesFromApi(gamesFromApi) {
        return gamesFromApi && gamesFromApi["hydra:member"];
    }

    static serializePaginationFromApi(gamesFromApi) {
        return gamesFromApi && gamesFromApi["hydra:view"] && gamesFromApi["hydra:view"]["hydra:next"];
    }

    static getGamesFromState(state) {
        const games = state.User.Games;
        return !Array.isArray(games) ? games.toJS() : games;
    }
}
