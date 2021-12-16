import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import React, { Component } from 'react';
import classnames from "classnames";

class FeaturedContentCard extends Component {
  actionByType = (type) => {
    if (type === 'article') {
      this.props.goToArticle(this.props.content.category, this.props.content.slug);
    }

    if (type === 'offer') {
      this.props.openModal(this.props.content);
    }

    if (type === 'game') {
      this.props.openGameModal(this.props.content);
    }
  };

  render() {
    const contentType = this.props.content.category || this.props.content.type || this.props.type;
    const title = contentType === 'welcome-offer' ? this.props.t('welcome-title') : this.props.content.title;
    return (
      <article className='article-card article-card--deals' onClick={() => this.actionByType(this.props.type)}>
        <figure className='article-card-figure'>
          <header className='article-card-header'>{this.props.t(`dealCard.dealType.${contentType}`)}</header>
          <img
            src={this.props.content.image && this.props.content.image.small}
            srcSet={
              ([this.props.content.image && this.props.content.image.small && `${this.props.content.image.small} 1x`],
              [this.props.content.image && this.props.content.image.large && `${this.props.content.image.large} 2x`])
            }
            alt={this.props.imageAlt}
            className='article-card-figure-image'
          />
          <figcaption className='article-card-figcaption article-card-figcaption--deals'>
            <h2 className='article-card-figure-title'>
              {contentType !== 'welcome-offer' && this.props.content.reductionType && (
                <em>
                  -{this.props.content.value}
                  {this.props.content.reductionType === 'pourcent' ? '%' : '€'}
                </em>
              )}
              {title}
            </h2>
            <p className='article-card-figure-text'>{this.props.content.excerpt || this.props.content.summary}</p>
          </figcaption>
        </figure>
      </article>
    );
  }
}

FeaturedContentCard.defaultProps = {
  type: '',
  content: {},
  goToArticle: () => {},
  openModal: () => {},
  openGameModal: () => {},
};

FeaturedContentCard.propTypes = {
  type: PropTypes.string,
  content: PropTypes.object,
  goToArticle: PropTypes.func,
  openModal: PropTypes.func,
  openGameModal: PropTypes.func,
};

const TranslatedFeaturedContentCard = translate('deals', { wait: true })(FeaturedContentCard);
export { TranslatedFeaturedContentCard as FeaturedContentCard };
