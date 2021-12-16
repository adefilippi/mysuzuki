import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { translate } from "react-i18next";
import { PATHS } from "../../../routes";
import { Redirect } from "react-router";
import {
    CredentialUtils,
    SerialUtils,
    SignUpProcessVehicleUtils,
    SignUpProcessPersonalUtils,
    UserInformationsUtils,
    SignUpEmailConfirmationlActioner,
    SignUpProcessEmailConfirmationUtils,
    AuthenticationUtils,
    UserInformationsActioner,
} from "../../../services";
import { DeviceContextConsumer, Button, Loader, Container } from "../../../components";
import LOGO_MY_SUZUKI from "../../../assets/img/logo_v2.png";

import "./Scene.scss";

class Scene extends Component {
    static initialState = {
        confirmed: false,
        confirming: false,
        expired: false,
        redirect: false,
        sending: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            sending: false,
            sent: false,
            confirming: false,
            confirmed: false,
            redirect: !props.isAuthenticated || !props.hasUserCompleteSignUpFromState,
            expired: false,
        };
    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.refreshUser();
        }
    }

    goToHome = () => {
        this.props.history.push(PATHS.ROOT);
    };

    resendEmail = () => {
        this.setState({ sending: true });
        this.props
            .resendEmail()
            .then(() => {
                this.setState(Scene.initialState);
            })
            .catch(() => {
                this.setState(Scene.initialState);
            })
        ;
    };

    getConfirmation = (token) => {
        this.setState({
            confirming: true
        });
        const that = this;
        this.props
            .getEmailConfirmation(token)
            .then(() => {
                this.setState({
                    confirmed: true,
                    confirming: false,
                    expired: false,
                    redirect: false,
                });
                setTimeout(
                    function() {
                        that.setState({
                            confirmed: false,
                            confirming: false,
                            expired: false,
                            redirect: true,
                        });
                    },
                    3000
                );

            })
            .catch(() => {
                this.setState({
                    confirmed: false,
                    confirming: false,
                    expired: true,
                    redirect: false,
                });
            })
    };

    componentDidMount = () => {
        const tokenFromUrl = this.props.location.search.match('token=([^&# ]*)')
          && this.props.location.search.match('token=([^&# ]*)')[1];

        if(tokenFromUrl) {
            this.props.storeEmailConfirmationToken({
                token: tokenFromUrl,
                expired: null
            }).then(() => {
                if(this.state.redirect){
                    return;
                }
                const { token } = this.props;

                if (token && token.get("token") && (true !== token.get("confirmed")) && (null === token.get("expired")) && !this.state.confirming) {
                    this.getConfirmation(token);
                }
            });
            return;
        }

        if(this.state.redirect){
            return;
        }

        const { token } = this.props;

        if(token && token.get("token") && (true !== token.get("confirmed")) && (null === token.get("expired")) && !this.state.confirming){
            this.getConfirmation(token);
        }
    };

    render() {
        if (this.state.redirect || (this.props.isAuthenticated && this.props.isEnabled)) return <Redirect to={PATHS.ROOT} />;

        return (
            <Container>
                <DeviceContextConsumer>
                    {({ isMobile, isTablet }) => {
                        return (
                            <div className={classnames({ welcome: true, mobile: isMobile, tablet: isTablet })}>
                                <img alt="suzuki-logo" src={LOGO_MY_SUZUKI} className="welcome-logo" />
                                <h1 className={classnames({ "welcome-title": true, mobile: isMobile })}>{this.props.t("welcomeTitle")}</h1>
                                <div className={classnames({ "welcome-header": true, mobile: isMobile })}>{this.props.t("welcomeHeader")}</div>
                                { this.state.confirming && ( <div className="welcome-text">{this.props.t("welcomeTextConfirming", { userEmail: this.props.UserEmail })}</div> )}
                                { this.state.confirmed && ( <div className="welcome-text">{this.props.t("welcomeTextConfirmed", { userEmail: this.props.UserEmail })}</div> )}
                                { this.state.expired && ( <div className="welcome-text">{this.props.t("welcomeTextExpired", { userEmail: this.props.UserEmail })}</div> )}
                                { !this.state.confirmed && !this.state.confirming && !this.state.expired && (
                                    <div className="welcome-text">{this.props.t("welcomeText", { userEmail: this.props.UserEmail })}</div>
                                )}
                                { !this.state.confirmed && !this.state.confirming && !this.state.expired && (
                                    <div className="welcome-question">{this.props.t("welcomeQuestion")}</div>
                                )}
                                { this.state.confirming && <Loader />}
                                { this.state.sending ? <Loader /> : <Button primary link label={this.props.t("welcomeButton")} onClick={this.resendEmail} /> }
                            </div>
                        );
                    }}
                </DeviceContextConsumer>
            </Container>
        );
    }
}

Scene.propTypes = {};

const ReduxConnectedScene = connect(
    (state) => ({
        isAuthenticated: AuthenticationUtils.isAuthenticated(state),
        isEnabled: UserInformationsUtils.isEnabled(state),
        hasUserCompleteSignUpFromState: UserInformationsUtils.hasUserCompleteSignUpFromState(state),
        UserEmail: UserInformationsUtils.getUserEmailFromState(state),
        SerialIsValidated: SerialUtils.isValidated(state),
        CredentialIsValidated: CredentialUtils.isValidated(state),
        VehiculeIsValidated: SignUpProcessVehicleUtils.isValidated(state),
        PersonalIsValidated: SignUpProcessPersonalUtils.isValidated(state),
        token: SignUpProcessEmailConfirmationUtils.getToken(state),
    }),
    (dispatch) => ({
        resendEmail: () => dispatch(SignUpEmailConfirmationlActioner.sendConfirmationEmail()),
        storeEmailConfirmationToken: (token) => dispatch(SignUpEmailConfirmationlActioner.storeEmailConfirmationToken(token)),
        getEmailConfirmation: (token) => dispatch(SignUpEmailConfirmationlActioner.getEmailConfirmation(token)),
        refreshUser: () => dispatch(UserInformationsActioner.getUserInformations()),
    })
)(Scene);
const TranslatedConnectedScene = translate("welcome", { wait: true })(ReduxConnectedScene);
export { TranslatedConnectedScene as Scene };
