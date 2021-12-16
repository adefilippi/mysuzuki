import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

import { DeviceContextConsumer, ArticleCardList, Loader } from "../../../../../components";
import { ArticlesActioner, ArticlesUtils } from "../../../../../services";
import { PATHS } from "../../../../../routes";

import "./Scene.scss"

class Scene extends Component {
    constructor(props) {
        super(props);
        this.xhr = null;
    }

    getArticle = () => !this.xhr && (this.xhr = this.props
        .getArticle(this.props.match.params.slug)
        .finally(() => this.xhr = null)
        .catch(() => {
            this.props.history.push(PATHS.ARTICLES.ROOT);
        }
    ));

    goToArticle = (type, slug) => type === 'news' ? this.props.history.push(PATHS.ARTICLE.buildNewsPath(slug)) : this.props.history.push(PATHS.ARTICLE.buildPath(slug));

    getAssociatedArticles = () => this.props.getAssociatedArticles(this.props.article.get("@id"));

    updateContent = () => {
        if (!this.props.article) {
            return this.getArticle();
        }
        
        if (!this.props.article.get("associatedArticles")) {
            return this.getAssociatedArticles();
        }
    };

    componentDidMount() {
        this.updateContent();
    }

    componentDidUpdate() {
        this.updateContent();
    }

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTabletPortrait, isTabletLandscape, isTablet }) => {
                    const responsive = {
                        "mobile": isMobile,
                        "mobile-small": isMobileSmall,
                        "tablet": isTablet,
                        "tablet-portrait": isTabletPortrait,
                        "tablet-landscape": isTabletLandscape
                    };

                    const { t, article } = this.props;
                    const articles = article && article.get("associatedArticles");

                    return (
                        <div className="article">
                            <section className="article-header">
                                <h1>{t(article && article.get('category') === 'news' ? "newsTitle" : "adviceTutorialTitle")}</h1>
                                <div className="article-back-container">
                                    <Link
                                        to={article && article.get('category') === 'news' ? PATHS.NEWS.ROOT : PATHS.ARTICLES.ROOT}
                                        className="link"
                                    >
                                        {"< " + t("article.back")}
                                    </Link>
                                </div>
                            </section>
                            { article && article.get("category") ? (
                                <section className="full-width-background article-title-container">
                                    <h3 className="article-category">{t(`types.${article.get("category")}`)}</h3>
                                    <h1 className="article-title">{article.get("title")}</h1>
                                    <p className="article-date">
                                        {new Date(article.get("publishDate")).toLocaleDateString("fr-FR")}
                                    </p>
                                </section>
                            ) : (
                                <div className="deals-loader">
                                    <Loader />
                                </div>
                            )}
                            { article && article.get("body") && (
                                <article 
                                    className="article-body"
                                    dangerouslySetInnerHTML={{__html: article.get("body") }}
                                >
                                </article>
                            )}
                            <h1 className="sticky-title">{t("article.linkedArticles")}</h1>
                            <section className="full-width-background article-links-container">
                                <div className={classnames({
                                    "article-links-overflow": true,
                                    ...responsive
                                })}>
                                    { articles ? (
                                        <ArticleCardList articles={articles} goToArticle={this.goToArticle}/>
                                    ) : (
                                        <div className="deals-loader">
                                            <Loader />
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}


const connected = connect(
    (state, props) => ({
        article: ArticlesUtils.getArticleFromState(state, props.match.params.slug),
    }),
    (dispatch) => ({
        getArticle: (slug) => dispatch(ArticlesActioner.getOne(slug)),
        getAssociatedArticles: (id) => dispatch(ArticlesActioner.getAssociatedArticles(id)),
    })
)(Scene);
const translated = translate("articles", {wait: true})(connected);
export { translated as Scene };
