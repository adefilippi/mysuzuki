import React, { Component } from "react";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Card } from "../../../../../../../utils";
import {
  DeviceContextConsumer,
  Button,
  Loader,
  DealDetailsModal,
} from "../../../../../../../components";
import { AuthenticatedHomeCardList } from "../../../../../../../components/Cards/Lists/AuthenticatedHomeCardList";
import moment from "moment";
import { GameDetailsModal } from "../../../Deals/components";
import {trackDealModalView} from "../../../../../../../services/Analytics/track";
import { orderBy } from "lodash";

class DealsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: '',
      currentDeal: null,
      currentGame: null,
      errorGame: [],
      isValid: false,
      participations: [],
    }
  }

  participate = (id) => {
    this.props.participateGame(id)
      .then((data) => {
        this.setState({
          errorGame: [],
          isValid: true,
        });
      })
      .then(() => {
        this.hasAlreadyParticipated();
      })
      .catch(err => {
        this.setState({
          errorGame: err.violations,
          isValid: false,
        });
      });
  };

  hasAlreadyParticipated = () => {
    this.props.userParticipatedToGame().then((response) => {
      this.setState({
        participations: response.participations,
      });
    })
  };

  componentDidMount() {
    this.hasAlreadyParticipated();
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

          const { benefits, dealsLoading, games: propsGame, user } = this.props;
          const { currentDeal, currentGame, isOpen, errorGame, isValid } = this.state;

          const deals = benefits.map(benefit => {
            const dealData = Card.getDealCardData(benefit, this.props.t);
            return {
              title: dealData.title,
              imageUrl: dealData.image ? dealData.image.small : '',
              largeImageUrl: dealData.image ? dealData.image.large : '',
              alt: "image",
              text: dealData.description,
              closingDate: dealData.endDate,
              dealType: dealData.type,
              dealDiscount: dealData.discount,
              dealershipOnly: dealData.dealership,
              isWelcomeOffer: dealData.isWelcomeOffer,
              isAvantageOffer: dealData.isAvantageOffer,
              deal: benefit,
              startDate: benefit.get('startDate'),
            }
          });

          const games = propsGame.map(g => {
            return {
              '@id': g.get('@id'),
              id: g.get('id'),
              title: g.get('title'),
              imageUrl: g.get('image') && g.get('image').get('small') ? g.get('image').get('small') : '',
              largeImageUrl: g.get('image') && g.get('image').get('large') ? g.get('image').get('large') : '',
              text: g.get('summary') || null,
              closingDate: g.get('endDate') && (this.props.t('dealCard.endDateUntil') + moment(g.get('endDate')).format('L')) || null,
              dealType: 'game',
              startDate: g.get('startDate') || null,
              deal: {
                '@id': g.get('@id'),
                id: g.get('id'),
                title: g.get('title'),
                '@type': g.get('@type'),
                image: {
                  small: g.get('image') && g.get('image').get('small') ? g.get('image').get('small') : '',
                  large: g.get('image') && g.get('image').get('large') ? g.get('image').get('large') : '',
                },
                summary: g.get('summary') || null,
                discount: null,
                startDate: g.get('startDate') || null,
                endDate: g.get('endDate') || null,
                maximumParticipants: g.get('maximumParticipants'),
                requiredFields: g.get('requiredFields') || [],
                participationsCount: g.get('participationsCount') || 0,
                participationsLeft: g.get('participationsLeft'),
                rulesUrl: g.get('rulesUrl') || null,
              }
            };
          });

          const sortedBenefits = orderBy([...games, ...deals], 'startDate', 'desc').splice(0, 3);

          return (
            <div>
              {!!sortedBenefits.length || dealsLoading ?
                <section>
                  <h2 className="sticky-title">{this.props.t("benefitsTitle")}</h2>
                  <div className={classnames({"authenticated-home-cards-container": true, ...responsive})}>
                    {dealsLoading ? (
                      <div className="authenticated-home-loader">
                        <Loader/>
                      </div>
                    ) : (
                      <div>
                        <AuthenticatedHomeCardList
                          benefits={sortedBenefits}
                          onCardClick={(v) => {
                            const type = v['@type'] === 'Game' ? 'currentGame' : 'currentDeal';
                            this.setState({[type]: v, isOpen: type});
                            if (type === 'currentDeal') trackDealModalView(v);
                          }}
                          clickable
                          id="deal"
                        />
                      </div>
                    )}
                    {currentDeal && (
                      <DealDetailsModal
                        onRequestClose={() => this.setState({isOpen: '', currentDeal: null, isValid: false, errorGame: []})}
                        visible={isOpen === 'currentDeal'}
                        deal={currentDeal}
                      />
                    )}

                    {currentGame && (
                      <GameDetailsModal
                        user={user}
                        onRequestClose={() => this.setState({isOpen: '', currentGame: null, isValid: false, errorGame: []})}
                        visible={isOpen === 'currentGame'}
                        game={currentGame}
                        participate={(id) => this.participate(id)}
                        errors={errorGame}
                        isValid={isValid}
                        participations={this.state.participations}
                      />
                    )}
    
                    <Button
                      transparent
                      center
                      medium={isMobile || isTabletPortrait}
                      label={this.props.t("benefitsButton")}
                      onClick={this.props.goToDeals}
                    />
                  </div>
                </section>
                : false
                }
            </div>
          )}
        }
      </DeviceContextConsumer>
    );
  }
}

DealsContainer.defaultProps = {
  goToDeals: () => {},
  benefits: [],
  dealsLoading: false,
  games: [],
  participateGame: () => {},
  userParticipatedToGame: () => {},
};

DealsContainer.propTypes = {
  goToDeals: PropTypes.func,
  benefits: PropTypes.array,
  dealsLoading: PropTypes.bool,
  games: PropTypes.array,
  participateGame: PropTypes.func,
  userParticipatedToGame: PropTypes.func,
};

const TranslatedDealsContainer = translate("authenticatedHome", { wait: true })(DealsContainer);
export { TranslatedDealsContainer as DealsContainer };
