import React, { Component } from "react";
import classnames from "classnames";
import { GameCard } from '../GameCard/GameCard';
import {
  Icon,
  ICON_NAMES,
  ICON_COLORS,
  DeviceContextConsumer,
} from '../../../../../../../components';

import "./GameCardList.scss";

export class GameCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameModalVisible: false,
      currentGame: null,
      active: 0,
    };
  }

  nexSlide = () => {
    const l = this.props.games.length;
    let next = this.state.active + 1;

    if (next >= l) next = 0;
    this.changeSlide(next);
  }

  prevSlide = () => {
    const l = this.props.games.length;
    let prev = this.state.active - 1;

    if (prev < 0) prev = (l - 1);
    this.changeSlide(prev);
  }

  changeSlide = (id) => {
    this.setState({
      active: id,
    });
  };

  participationsId = () => {
    const { participations } = this.props;

    return (participations.length && participations.map(p => p.game));
  };

  isDisabled = (game) => {
    const id = game.get('@id');

    return (this.participationsId().length && this.participationsId().indexOf(id) > -1) || !this.hasPlaces(game);
  }

  hasPlaces = (game) => {
    return game.get('participationsLeft') === null || game.get('participationsLeft') > 0;
  }

  render() {
    return (
      <DeviceContextConsumer>
        {({ isMobile, isTablet, isTabletPortrait }) => {
          const responsive = {
            mobile: isMobile,
            "tablet-portrait": isTabletPortrait,
            tablet: isTablet
          };
          
          return (
            <div className="games-container-full game-card-list">
              {this.props.games.length && this.props.games.map((game, index) => {
                  return (
                    <div
                      key={game.get("@id")}
                      className={
                        classnames({
                          "game-card-list_card": true,
                          "game-card-list_card-active": index === this.state.active,
                          ...responsive,
                        })
                      }
                    >
                      <GameCard
                        game={game}
                        disabled={this.isDisabled(game)}
                        openModal={(game) => {this.props.openModal(game)}}
                        hasPlaces={this.hasPlaces(game)}
                      />
                    </div>
                  );
                })
              }

              {this.props.games.length > 1 &&
                <div
                className={
                  classnames({
                    "game-card-list_card_nav": true,
                    ...responsive,
                  })
                }
                >
                  <button onClick={this.prevSlide}>
                    <Icon name={ICON_NAMES['ARROW_LEFT']} color={ICON_COLORS['PRIMARY']} size="100%" />
                  </button>
                  
                  <button onClick={this.nexSlide}>
                    <Icon name={ICON_NAMES['ARROW_RIGHT']} color={ICON_COLORS['PRIMARY']} size="100%" />
                  </button>
                </div>
              }
            </div>
          )
        }}
      </DeviceContextConsumer>
    )
  }
}
