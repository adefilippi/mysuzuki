import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router";
import { PATHS } from "../../routes";
import { SignUpScene, Home, WelcomeScene, ForgotPasswordScene, AdminSession } from "../";
import { Faq } from "./Faq";
import { DeviceContextProvider, ContainerContextProvider } from "../../components";
import "./Scene.scss";

class Scene extends Component {
    render() {
        if (!this.props.displayApp) return null;
        return (
            <DeviceContextProvider>
                <ContainerContextProvider>
                    <Switch>
                        <Route exact path={PATHS.WELCOME} component={WelcomeScene} />
                        <Route exact path={PATHS.FORGOT_PASSWORD} component={ForgotPasswordScene} />
                        <Route exact path={PATHS.FAQ.ROOT} component={Faq} />
                        <Route exact path={PATHS.FAQ.TOPIC.ROOT} component={Faq} />
                        <Route exact path={PATHS.FAQ.TOPIC.QUESTION.ROOT} component={Faq} />
                        <Route path={PATHS.SIGN_UP.ROOT} component={SignUpScene} />
                        <Route exact path={PATHS.ADMIN_SESSION.ROOT} component={AdminSession} />
                        <Route path={PATHS.ROOT} component={Home} />
                    </Switch>
                </ContainerContextProvider>
            </DeviceContextProvider>
        );
    }
}

Scene.propTypes = {};

const ReduxConnectedScene = withRouter(
    connect(
        (state) => ({
            displayApp: state.Authentication.get("rehydrated")
        }),
        (dispatch) => ({})
    )(Scene)
);
export { ReduxConnectedScene as Scene };
