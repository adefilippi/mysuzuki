import React, { Component } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { Route, Switch, Redirect, withRouter } from "react-router";
import { Container } from "../../../../components";
import { NavBar } from "./components";
import { PATHS } from "../../../../routes";
import {AuthenticationUtils, UserInformationsUtils} from "../../../../services";
import { MyAccount } from "./Account";
import { MyDealership } from "./Dealership";
import { Deals } from "./Deals";
import { Articles } from "./Articles";
import { MyVehicles } from "./Vehicles";
import { Homepage } from "./Homepage";
import { Article } from "./Article";

import "./Scene.scss";

class Scene extends Component {


    render() {
        return (
            <Container isAuthenticated={this.props.isAuthenticated}>
                {({showHelpModal}) => (
                    <div className="AuthenticatedHome">
                        <NavBar showHelpModal={showHelpModal}/>
                        <Switch>
                            <Route exact path={PATHS.ACCOUNT.ROOT} component={MyAccount}/>
                            <Route exact path={PATHS.DEALERSHIPS.ROOT} component={MyDealership}/>
                            <Route exact path={PATHS.DEALS.ROOT} component={Deals}/>
                            <Route exact path={PATHS.ARTICLES.ROOT} render={(props) => <Articles {...props} title={'adviceTutorialTitle'} />}/>
                            <Route exact path={PATHS.ARTICLES.TUTORIAL} render={(props) => <Articles {...props} title={'adviceTutorialTitle'} />}/>
                            <Route exact path={PATHS.ARTICLES.ADVICE} render={(props) => <Articles {...props} title={'adviceTutorialTitle'} />}/>
                            <Route exact path={PATHS.NEWS.ROOT} render={(props) => <Articles {...props} title={'newsTitle'} />} />
                            <Route exact path={PATHS.ARTICLE.ROOT} component={Article}/>
                            <Route exact path={PATHS.ARTICLE.NEWS_ROOT} component={Article}/>
                            <Route exact path={PATHS.VEHICLES.ROOT} component={MyVehicles}/>
                            <Route exact path={PATHS.VEHICLES.VEHICLE.ROOT} component={MyVehicles}/>
                            {this.props.userExistAndIsEnabled && this.props.userHasCompletedSignUp &&
                            <Route exact path={PATHS.ROOT} component={Homepage}/>}
                            <Redirect
                                to={{pathname: !this.props.userExistAndIsDisabled ? PATHS.ROOT : this.props.userHasCompletedSignUp ? PATHS.WELCOME : PATHS.SIGN_UP.VEHICULE_STEP}}/>
                        </Switch>
                    </div>
                )}
            </Container>
        );
    }
}

Scene.propTypes = {};

const ReduxConnectedScene = connect(
    (state) => ({
        benefits: state.Benefits,
        userExistAndIsDisabled: UserInformationsUtils.getIsInflatedFromState(state) && !UserInformationsUtils.isUserEmailConfirmedFromState(state),
        userExistAndIsEnabled: UserInformationsUtils.getIsInflatedFromState(state) && UserInformationsUtils.isUserEmailConfirmedFromState(state),
        userHasCompletedSignUp: UserInformationsUtils.hasUserCompleteSignUpFromState(state),
        isAuthenticated: AuthenticationUtils.isAuthenticated(state)
    }),
    (dispatch) => ({})
)(Scene);

const TranslatedScene = translate("home", { wait: true })(ReduxConnectedScene);
export { TranslatedScene as Scene };
