import React, { Component } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { Route, Switch, Redirect } from "react-router";
import { FooterLessContainer } from "../../../components";
import { UserInformationsUtils, AuthenticationUtils } from "../../../services";
import { SignUpSerialStep, SignUpCredentialStep, SignUpVehicleStep, SignUpPersonalStep } from "../../";

import { PATHS } from "../../../routes";

import "./Scene.scss";

class Scene extends Component {
    render() {
        if (this.props.isAuthenticated && this.props.hasCompletedTheSignUp) return <Redirect to={{ pathname: this.props.isEnabled ? PATHS.ROOT : PATHS.WELCOME }} />;
        return (
            <FooterLessContainer isBackgroundWhite>
                <Switch>
                    <Route exact path={PATHS.SIGN_UP.SERIAL_STEP} component={SignUpSerialStep} />
                    <Route exact path={PATHS.SIGN_UP.CREDENTIAL_STEP} component={SignUpCredentialStep} />
                    <Route exact path={PATHS.SIGN_UP.VEHICULE_STEP} component={SignUpVehicleStep} />
                    <Route exact path={PATHS.SIGN_UP.PERSONAL_STEP} component={SignUpPersonalStep} />
                    <Redirect to={{ pathname: PATHS.SIGN_UP.SERIAL_STEP }} />
                </Switch>
            </FooterLessContainer>
        );
    }
}

Scene.propTypes = {};

const ReduxConnectedScene = connect(
    (state) => ({
        isAuthenticated: AuthenticationUtils.isAuthenticated(state),
        hasCompletedTheSignUp: UserInformationsUtils.hasUserCompleteSignUpFromState(state),
        isEnabled: UserInformationsUtils.isEnabled(state)
    }),
    (dispatch) => ({})
)(Scene);

const TranslatedScene = translate("home", { wait: true })(ReduxConnectedScene);
export { TranslatedScene as Scene };
