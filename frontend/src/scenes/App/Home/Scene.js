import React, { Component } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { AuthenticationUtils, SignInUtils, UserInformationsUtils } from "../../../services";
import { Route, Switch, Redirect } from "react-router";
import { AuthenticatedHome } from "./AuthenticatedHome";
import { UnauthenticatedHome } from "./UnauthenticatedHome";
import { PATHS } from "../../../routes";

import "./Scene.scss";

class Scene extends Component {
    componentDidUpdate(){
        if(!this.props.history.location.hash) {
            window.scrollTo(0,0);
        }
    }
    render() {
        return this.props.isAuthenticated && !this.props.signInIsLoading ? (
            <Switch>
                {this.props.isEnabled ? (
                    <Route path={PATHS.ROOT} component={AuthenticatedHome} />
                ) : (
                    <Redirect to={{ pathname: PATHS.SIGN_UP.ROOT }} />
                )}
            </Switch>
        ) : (
            <Switch>
                <Route exact path={PATHS.ROOT} component={UnauthenticatedHome} />
                <Redirect to={{ pathname: PATHS.ROOT }} />
            </Switch>
        );
    }
}

Scene.propTypes = {};

const ReduxConnectedScene = connect(
    (state) => ({
        signInIsLoading: SignInUtils.getSignInIsLoadingFromState(state),
        isAuthenticated: AuthenticationUtils.isAuthenticated(state),
        isEnabled: UserInformationsUtils.isEnabled(state),
    }),
    () => ({})
)(Scene);

const TranslatedScene = translate("home", { wait: true })(ReduxConnectedScene);
export { TranslatedScene as Scene };
