import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DealCardList.scss';
import { DealCard } from '../../DealCard';
import classnames from 'classnames';
import { DeviceContextConsumer } from '../../../contexts';
import { translate } from 'react-i18next';

class DealCardList extends Component {
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
            <article className={classnames({ 'deals-cards': true, ...responsive })}>
              {this.props.deals.map((deal) => {
                deal = deal.toJS();
                return (
                  <DealCard
                    key={deal['@id']}
                    deal={deal}
                    imageAlt='image'
                    buttonLabel={this.props.t(
                      'dealCard.' + (DealCardList.buttonTextMapping[deal.type.toLowerCase()] || 'buttonOffer')
                    )}
                    large={isMobileSmall}
                    openModal={() => {
                      this.props.openModal(deal);
                    }}
                  />
                );
              })}
              {this.props.deals && this.props.deals.length
                ? this.getListPlaceholderElements(this.props.deals.length)
                : false}
            </article>
          );
        }}
      </DeviceContextConsumer>
    );
  }
}

DealCardList.defaultProps = {
  deals: {},
};

DealCardList.propTypes = {
  next: PropTypes.string,
  openModal: PropTypes.func,
};

const TranslatedComponent = translate('deals', { wait: true })(DealCardList);
export { TranslatedComponent as DealCardList };
