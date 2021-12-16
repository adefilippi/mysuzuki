import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { APIUtils } from "../../../services";
import "./ArticleCard.scss";

class ArticleCard extends Component {
    goToArticle = (type, slug) => this.props.goToArticle(type, slug);

    render() {
        return (
            <article className="article-card" onClick={() => this.goToArticle(this.props.type, this.props.slug)}>
                <figure className="article-card-figure">
                    <header className="article-card-header">
                        { this.props.t(`types.${this.props.type.toLowerCase()}`) }
                    </header>
                    <img
                        src={this.props.imageUrl}
                        srcSet={[
                            this.props.imageUrl && `${this.props.imageUrl} 1x`,
                            this.props.largeImageUrl && `${this.props.largeImageUrl} 2x`,
                        ]}
                        alt={this.props.imageAlt}
                        className="article-card-figure-image"
                    />
                    <figcaption className="article-card-figcaption">
                        <h2 className="article-card-figure-title">
                            {this.props.title}
                        </h2>
                        <p className="article-card-figure-text">
                            {this.props.text}
                        </p>
                    </figcaption>
                </figure>
            </article>
        );
    }
}

ArticleCard.defaultProps = {
  type: "",
  imageUrl: "",
  imageAlt: "",
  title: "",
  text: "",
  goToArticle: () => {},
};

ArticleCard.propTypes = {
    type: PropTypes.string,
    imageUrl: PropTypes.string,
    imageAlt: PropTypes.string,
    title: PropTypes.string,
    slug: PropTypes.string,
    text: PropTypes.string,
    goToArticle: PropTypes.func,
    largeImageUrl: PropTypes.string,
};


const TranslatedArticleCard = translate("articles", {wait: true})(ArticleCard);
export { TranslatedArticleCard as ArticleCard };
