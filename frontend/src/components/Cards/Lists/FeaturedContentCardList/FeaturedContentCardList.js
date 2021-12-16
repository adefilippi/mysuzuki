import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FeaturedContentCardList.scss';
import { FeaturedContentCard } from '../../FeaturedContentCard';
import classnames from 'classnames';
import { DeviceContextConsumer } from '../../../contexts';
import { translate } from 'react-i18next';

class FeaturedContentCardList extends Component {
  static buttonTextMapping = {
    offer: 'buttonOffer',
    game: 'buttonGame',
    invitation: 'buttonInvite',
    'welcome-offer': 'buttonOffer',
  };

  getListPlaceholderElements = (listSize) => {
    if (listSize % 3 == 0) return;
    const nbOfPlaceholders = 3 - (listSize % 3);
    return [...Array(nbOfPlaceholders)].map((e, i) => (
      <div key={`placeholder-${i}`} className='deal-card-container-placeholder' />
    ));
  };

  render() {
    return (
      <DeviceContextConsumer>
        {({ isMobile, isMobileSmall, isTablet }) => {
          const responsive = { mobile: isMobile, 'mobile-small': isMobileSmall, tablet: isTablet };
          return (
            <div className={classnames({ 'deals-cards': true, ...responsive })}>
              {this.props.featured.map((article) => {
                return (
                  <FeaturedContentCard
                    key={article.content['@id']}
                    content={article.content}
                    type={article.type}
                    goToArticle={this.props.goToArticle}
                    openModal={this.props.openModal}
                    openGameModal={this.props.openGameModal}
                  />
                );
              })}
              {this.props.featured && this.props.featured.length
                ? this.getListPlaceholderElements(this.props.featured.length)
                : false}
            </div>
          );
        }}
      </DeviceContextConsumer>
    );
  }
}

FeaturedContentCardList.defaultProps = {
  featured: {},
  goToArticle: () => {},
  openModal: () => {},
  openGameModel: () => {},
};

FeaturedContentCardList.propTypes = {
  next: PropTypes.string,
  goToArticle: PropTypes.func,
  openModal: PropTypes.func,
  openGameModal: PropTypes.func,
};

const TranslatedComponent = translate('deals', { wait: true })(FeaturedContentCardList);
export { TranslatedComponent as FeaturedContentCardList };
