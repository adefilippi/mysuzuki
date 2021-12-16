import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { translate } from "react-i18next";
import { DeviceContextConsumer, Button } from "../../../../../../../components";
import moment from "moment";

import "./GameCard.scss";

class GameCard extends Component {
  constructor(props) {
    super(props);

    const game = props.game;
    const image = game.get('image');

    this.state = {
      game: {
        '@id': game.get('@id'),
        id: game.get('id'),
        title: game.get('title'),
        '@type': game.get('@type'),
        image: {
          small: image.get('small'),
          large: image.get('large'),
        },
        summary: game.get('summary') || null,
        discount: null,
        startDate: game.get('startDate') || null,
        endDate: game.get('endDate') || null,
        maximumParticipants: game.get('maximumParticipants'),
        requiredFields: game.get('requiredFields') || [],
        participationsCount: game.get('participationsCount'),
        participationsLeft: game.get('participationsLeft'),
        rulesUrl: game.get('rulesUrl') || null,
      }
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState || this.props.game !== nextProps.game || this.props.disabled !== nextProps.disabled || this.props.hasPlaces !== nextProps.hasPlaces;
  };

  render() {
    return (
      <DeviceContextConsumer>
        {({ isMobile, isMobileSmall, isTabletPortrait, isTablet }) => {
          const responsive = { mobile: isMobile, "mobile-small": isMobileSmall, "tablet-portrait": isTabletPortrait, tablet: isTablet };

          const { game } = this.state;

          return (
            <section className={classnames({"game-card-full-section": true, ...responsive, "mobile": this.props.mobile})}>
              <div className={classnames({"game-card-full-section-label": true, ...responsive, "mobile": this.props.mobile})}>
                {this.props.t('game')}
              </div>

              {(game.participationsLeft || game.participationsLeft === 0) &&
                <div className={classnames({"game-card-full-section-places": true, ...responsive, "mobile": this.props.mobile})}>
                  <span className="game-card-full-section-places-number">{game.participationsLeft}</span>
                  <span className="game-card-full-section-places-text">{this.props.t('placesLeft', {count: game.participationsLeft})}</span>
                </div>
              }

              <div className={classnames({"game-card-full-section-skew": true, ...responsive, "mobile": this.props.mobile})}>
                <div className={classnames({"game-card-full-section-skew-image": true, ...responsive, "mobile": this.props.mobile})}>
                  <img 
                    src={game.image.small}
                    srcSet={[
                      game.image.small && `${game.image.small} 1x`,
                      game.image.large && `${game.image.large} 2x`,
                    ]}
                  />
                  { !isMobile && 
                    <div className="game-card-full-section-skew-image-background"  style={{ backgroundImage: `url(${game.image.large})`}}></div>
                  }
                </div>
                { !isMobile && !isTabletPortrait && <div className={classnames({ "game-card-full-section-skew-overlay": true, ...responsive, "mobile": this.props.mobile })}/> }
              </div>
              <article className={classnames({"game-card-full-section-content": true, ...responsive, "mobile": this.props.mobile})}>
                <h2 className="game-card-full-title">
                  {game.title}
                </h2>
                <p>{ game.summary }</p>

                <p className="game-card-full-date">
                  {this.props.t('endDateUntil')} 
                  { moment(game.endDate).format('L') }
                </p>

                {
                  this.props.hasPlaces ?
                  <div className={classnames({"game-card-full-buttons-group": true, ...responsive, "mobile": this.props.mobile})}>
                    <Button 
                      primary
                      label={this.props.t('participate')}
                      disabled={this.props.disabled}
                      onClick={() => this.props.openModal(game)}
                    />
                  </div>
                  :
                  <p className="game-card-full-error">{this.props.t('emptyStock')}</p>
                }
              </article>
            </section>
          );
        }}
      </DeviceContextConsumer>
    );
  }
}

GameCard.defaultProps = {
  game: {},
};

GameCard.propTypes = {
  openModal: PropTypes.func,
  game: PropTypes.object.isRequired
};

const TranslatedGameCard = translate("game", { wait: true })(GameCard);
export { TranslatedGameCard as GameCard };
