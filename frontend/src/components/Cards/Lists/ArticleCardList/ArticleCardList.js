import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { ArticleCard } from "../../ArticleCard";

import "./ArticleCardList.scss";

class ArticleCardList extends Component {

    getListPlaceholderElements = batchSize => {
        return [...Array(batchSize)].map((e, i) => <div key={`placeholder-${i}`} className="article-card-placeholder" />);
    };

    render() {
        return (
            <section className="article-card-list">
                { this.props.articles.map((article, index) => (
                    <ArticleCard
                        key={index}
                        type={article.category}
                        imageAlt={this.props.t("imageAlt")}
                        imageUrl={article.image.small}
                        largeImageUrl={article.image.large}
                        title={article.title}
                        slug={article.slug}
                        text={article.excerpt}
                        goToArticle={this.props.goToArticle}
                    />
                ))}
                { this.getListPlaceholderElements(4) }
            </section>
        );
    }
}

ArticleCardList.defaultProps = {
    articles: [],
    goToArticle: () => {},
};

ArticleCardList.propTypes = {
  articles: PropTypes.array, //TODO vérifier si c'est un Array ou un Object
  goToArticle: PropTypes.func,
};

const TranslatedArticleCardList = translate("articles", {wait :true})(ArticleCardList);
export { TranslatedArticleCardList as ArticleCardList };
