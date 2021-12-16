import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { translate } from 'react-i18next';
import { Modal } from '../components';
import { DeviceContextConsumer } from '../../';
import './DealDetailsModal.scss';
import * as striptags from 'striptags';
import { Link } from '../../Link';
import { Utils } from '../../../services/Api/utils';
import moment from 'moment';
import {trackDealCtaClick} from "../../../services/Analytics/track";

class DealDetailsModal extends Component {
  handleModalRequestClose = () => {
    this.props.onRequestClose();
  };

  render() {
    const { deal } = this.props;

    return (
      deal && (
        <Modal visible={this.props.visible} onRequestClose={this.handleModalRequestClose}>
          <DeviceContextConsumer>
            {({ isMobile }) => (
              <article className={classnames({ 'deal-details-modal': true, mobile: isMobile })}>
                {this.getBody(deal, isMobile)}
                {deal.cta.type !== null && deal.type !== 'avantage-offer' && (
                  <Link
                    button
                    medium
                    onClick={() => trackDealCtaClick(deal)}
                    label={ deal.cta.type === 'file' ? this.props.t("modal.cta.file") : deal.cta.label }
                    attributes={{
                      href:
                        deal.cta.type === 'file'
                          ? Utils.generateUrl(deal.webPath)
                          : deal.cta.content,
                      target: '_blank',
                      download: true,
                    }}
                  />
                )}
              </article>
            )}
          </DeviceContextConsumer>
        </Modal>
      )
    );
  }

    getBody(deal, isMobile) {
        switch (deal.type) {
          case 'welcome-offer':
            return this.getWelcomeOfferBody(deal, isMobile);
          case 'avantage-offer':
            return this.getAvantageOfferBody(deal, isMobile);
          default:
            return deal.automated ? this.getAutomatedBody(deal, isMobile) : this.getManualBody(deal, isMobile);
        }

    }

  getManualBody(deal, isMobile) {
    const allowed_tags = '<ul><ol><li><strong><em><u><s><br><p><span><a>';
    return (
      <Fragment>
        <h2 className={classnames({ 'deal-details-modal-title': true, mobile: isMobile })}>{deal.title}</h2>
        <div
    className={classnames({'deal-details-modal-description': true, mobile: isMobile})}
    dangerouslySetInnerHTML={{__html: striptags(deal.body.description, allowed_tags)}}
    />
        {deal.body.rules && (
          <section>
            <h3 className={classnames({ 'deal-details-modal-section-title': true, mobile: isMobile })}>
              {this.props.t('modal.rules')}
            </h3>
            <div
    className={classnames({'deal-details-modal-section-text': true, mobile: isMobile})}
    dangerouslySetInnerHTML={{__html: striptags(deal.body.rules, allowed_tags)}}
    />
          </section>
        )}
        {deal.body.conditions && (
          <section className={classnames({ 'deal-details-modal-section': true, mobile: isMobile })}>
            <h3 className={classnames({ 'deal-details-modal-section-title': true, mobile: isMobile })}>
              {this.props.t('modal.conditions')}
            </h3>
            <div
    className={classnames({'deal-details-modal-section-text': true, mobile: isMobile})}
    dangerouslySetInnerHTML={{__html: striptags(deal.body.conditions, allowed_tags)}}
    />
          </section>
        )}
      </Fragment>
    );
  }

  getAutomatedBody(deal, isMobile) {
    const dealership = deal.dealership;
    const dealershipName = dealership ? ` ${dealership.name}` : '';
    return (
      <Fragment>
        <h2 className={classnames({ 'deal-details-modal-title': true, mobile: isMobile })}>
          <em>
            -{deal.value}
            {deal.reductionType === 'pourcent' ? '%' : '€'}
          </em>{' '}
          {deal.title}
        </h2>
        <p className='deal-details-modal-subtitle'>
          {this.props.t('modal.availableUntil')} <em>{moment(deal.endDate).format('L')}</em>
        </p>
        <h3 className={classnames({ 'deal-details-modal-section-title': true, mobile: isMobile })}>
          {this.props.t('modal.rules')}
        </h3>
        <p>{this.props.t('modal.rulesMessage')}</p>
        <h3 className={classnames({ 'deal-details-modal-section-title': true, mobile: isMobile })}>
          {this.props.t('modal.conditions')}
        </h3>
        <p>{this.props.t('modal.conditionsMessage', { dealership: dealershipName })}</p>
      </Fragment>
    );
  }

  getWelcomeOfferBody(deal, isMobile) {
    return (
      <Fragment>
        <h2 className={classnames({ 'deal-details-modal-title': true, 'welcome-offer': true, mobile: isMobile })}>
          {this.props.t('welcome-title')}
        </h2>
        <div className={classnames({ 'deal-details-modal-description': true, mobile: isMobile })}>
          <p>{this.props.t('modal.welcome-message-1')}</p>
        </div>
        <h3 className={classnames({ 'deal-details-modal-section-title': true, mobile: isMobile })}>
          {this.props.t('modal.rules')}
        </h3>
        <p>{this.props.t('modal.welcome-message-2')}</p>
        <h3 className={classnames({ 'deal-details-modal-section-title': true, mobile: isMobile })}>
          {this.props.t('modal.conditions')}
        </h3>
        <p>{this.props.t('modal.welcome-conditions')}</p>
      </Fragment>
    );
  }

  getAvantageOfferBody(deal, isMobile) {
      return (
          <Fragment>
              <h2 className={classnames({ "deal-details-modal-title": true, "avantage-offer": true, mobile: isMobile })}>
                  { this.props.t("avantage-offer-title") }
              </h2>
              <div className={classnames({ "deal-details-modal-description": true, mobile: isMobile })}>
                  <p>
                      { this.props.t("modal.avantage-offer-message-1") }
                  </p>
              </div>
              <h3 className={classnames({ "deal-details-modal-section-title": true, mobile: isMobile })}>
                  { this.props.t("modal.rules") }
              </h3>
              <p dangerouslySetInnerHTML={{ __html: this.props.t("modal.avantage-offer-message-2")}}>
              </p>
              <h3 className={classnames({ "deal-details-modal-section-title": true, mobile: isMobile })}>
                  { this.props.t("modal.conditions") }
              </h3>
              <p>
                  { this.props.t("modal.avantage-offer-conditions") }
              </p>
              <Link
                  button
                  medium
                  onClick={() => trackDealCtaClick(deal)}
                  label={ deal.cta.type === 'file' ? this.props.t("modal.cta.file") : deal.cta.label }
                  attributes={{
                      href: Utils.generateUrl('/offer/offre-mySUZUKI-avantage.pdf'),
                      target: "_blank",
                      download: true
                  }}
              />
          </Fragment>
      );
  }
}

DealDetailsModal.defaultProps = {
  onRequestClose: () => {},
  visible: false,
};

DealDetailsModal.propTypes = {
  onRequestClose: PropTypes.func,
  visible: PropTypes.bool,
};

const TranslatedDealDetailsModal = translate('deals', { wait: true })(DealDetailsModal);
export { TranslatedDealDetailsModal as DealDetailsModal };
