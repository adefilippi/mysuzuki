export class Utils {
    static getArticlesFromState(state) {
        const articles = state.Articles;
        return !Array.isArray(articles) ? articles.toJS() : articles;
    }

    static getNewsFromState(state) {
        const news = state.News;
        return !Array.isArray(news) ? news.toJS() : news;
    }

    static getArticleFromState(state, slug) {
        const articles = state.Articles;
        const article = articles.find((article) => article.get("slug") === slug);
        return article;
    }
}
