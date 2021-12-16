import React, { Component } from "react";
import classnames from "classnames";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { DeviceContextConsumer, DealCardList, Button, Loader, DealDetailsModal } from "../../../../../components";
import { Actioner as UserDealsActioner } from "../../../../../services/User/Deals/actioner";
import { Actioner as UserGamesActioner } from "../../../../../services/User/Games/actioner";
import { GameCardList, GameDetailsModal } from "./components";
import { UserInformationsUtils, AuthenticationUtils } from "../../../../../services";
import "./Scene.scss";
import {trackDealModalView} from "../../../../../services/Analytics/track";

class Scene extends Component {
    constructor(props) {
      super(props);
      this.state = {
        next: null,
        loading: false,
        loadingGame: false,
        isModalVisible: false,
        currentDeal: null,
        currentGame: null,
        errorGame: [],
        isValid: false,
        participations: [],
      };
    }

    toggleModal = (deal) => {
        this.setState(() => ({
            isModalVisible: !!deal,
            currentDeal: deal || null,
        }));

        if (deal) {
            trackDealModalView(deal);
        }
    };

    toggleGameModal = (game) => {
      this.setState(() => ({
        currentGame: game || null,
        errorGame: [],
        isValid: false,
      }));
    };

    getDeals = (loading = true) => {
      this.setState({ loading: loading });
      this.props.getDeals(this.state.next)
        .then((data) => {
          this.setState({
            next: (data && data.next) || null,
            loading: false,
          });
        })
        .then(() => {
          this.setState({
            loading: false,
          });
        });
    };

    getGames = () => {
      this.props.getGames(this.state.next)
        .then((data) => {
          this.setState({
            next: (data && data.next) || null,
          });
        });

      this.hasAlreadyParticipate();
    };

    participate = (id) => {
      this.props.participateGame(id)
        .then((data) => {
          this.setState({
            errorGame: [],
            isValid: true,
          });
        })
        .then(() => {
          this.hasAlreadyParticipate();
        })
        .catch(err => {
          this.setState({
            errorGame: err.violations,
            isValid: false,
          });
        });
    };

    hasAlreadyParticipate = () => {
      this.props.userParticipatedToGame().then((response) => {
        this.setState({
          participations: response.participations,
        });
      })
    };

    componentDidMount() {
      this.props.resetDeals();
      this.props.resetGames();
      this.getDeals();
      this.getGames();
    }

    render() {
      return (
        <DeviceContextConsumer>
          {({ isMobile, isMobileSmall, isTablet }) => {
            const responsive = { mobile: isMobile, tablet: isTablet };
            return (
              <div className="deals">
                <h1 className={classnames({"deals-title": true, ...responsive})}>
                  {this.props.t("title")}
                </h1>

                <section className={classnames({"deals-container": true, ...responsive})}>
                  {this.props.games.length || this.state.loadingGame ?
                    <div>
                      <GameCardList
                        games={this.props.games}
                        participations={this.state.participations}
                        openModal={this.toggleGameModal}
                      />

                      {this.state.loadingGame ? (
                        <div className="deals-loader">
                          <Loader/>
                        </div>
                      ) : this.state.currentGame && (
                        <GameDetailsModal
                          user={this.props.User}
                          onRequestClose={this.toggleGameModal}
                          visible={!!this.state.currentGame}
                          game={this.state.currentGame}
                          participate={(id) => this.participate(id)}
                          errors={this.state.errorGame}
                          isValid={this.state.isValid}
                        />
                      )}
                    </div>
                    :
                    <div></div>
                  }

                  { this.props.deals.length || this.props.games.length || this.state.loading ?
                    <div>
                        <DealCardList
                          deals={this.props.deals}
                          isMobile={isMobile}
                          isTablet={isTablet}
                          openModal={this.toggleModal}
                        />

                        {this.state.loading ? (
                          <div className="deals-loader">
                            <Loader/>
                          </div>
                        ) : (
                            this.state.next &&
                            <Button
                              transparent
                              center
                              large={isMobileSmall}
                              label={this.props.t("seeMoreButton")}
                              onClick={this.getDeals}
                            />
                        )}

                        <DealDetailsModal
                          onRequestClose={this.toggleModal}
                          visible={this.state.isModalVisible}
                          deal={this.state.currentDeal}
                        />
                    </div>
                    :
                    <div className="deals-empty">{ this.props.t("noDeal") }</div>
                  }
                </section>
              </div>
            );
          }}
        </DeviceContextConsumer>
      );
    }
}

Scene.propTypes = {};

const ReduxConnectedScene = connect(
  (state) => ({
    deals: state.User.Deals,
    games: state.User.Games,
    User: UserInformationsUtils.getUserFromState(state),
    isAuthenticated: AuthenticationUtils.isAuthenticated(state),
  }),
  (dispatch) => ({
    resetDeals : () => dispatch(UserDealsActioner.resetDeals()),
    getDeals : (next) => dispatch(UserDealsActioner.getUserDeals(next)),
    resetGames : () => dispatch(UserGamesActioner.resetGames()),
    getGames : (next) => dispatch(UserGamesActioner.getUserGames(next)),
    participateGame : (id) => dispatch(UserGamesActioner.participateGame(id)),
    userParticipatedToGame: (id) => dispatch(UserGamesActioner.userParticipatedToGame(id)),
  })
)(Scene);

const TranslatedConnectedScene = translate("deals", { wait: true })(ReduxConnectedScene);
export { TranslatedConnectedScene as Scene };
