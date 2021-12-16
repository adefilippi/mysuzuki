import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { translate } from "react-i18next";
import { SignIn, SignUp } from "../components";
import { DeviceContextConsumer, BenefitCardList, Container, Form } from "../../../../components";
import { PATHS } from "../../../../routes";
import {Validators, SignInActioner, AuthenticationUtils} from "../../../../services";

import MySuzuki from "../../../../assets/img/logo_v2.png";

import "./Scene.scss";

class Scene extends Component {
    constructor(props){
        super(props);
        this.state = {
            errors: props.errors,
            values: {},
        };
    }

    goToSignUp = () => {
        this.props.history.push(PATHS.SIGN_UP.ROOT);
    };

    goToHome = () => {
        this.props.history.push(PATHS.ROOT);
    };

    goToForgotPassword = () => {
        this.props.history.push(PATHS.FORGOT_PASSWORD);
    };

    render() {
        const { errors } = this.state;
        return (
            <Container isAuthenticated={this.props.isAuthenticated}>
                <DeviceContextConsumer>
                    {({ isMobile, isTablet }) => (
                        <div className="UnauthenticatedHome">
                            <div
                                className={classnames({
                                    "signing-section": true,
                                    mobile: isMobile,
                                    tablet: isTablet
                                })}
                            >
                                <div className="row">
                                    <div className="column">
                                        <h1 className="title">
                                            {this.props.t("title")}
                                            <img className="logo" alt="logo" src={MySuzuki} />
                                        </h1>
                                    </div>
                                </div>
                                <div className="row">
                                    <div
                                        className={classnames({
                                            column: true,
                                            hide: true,
                                            tablet: isTablet,
                                            player: true
                                        })}
                                    >
                                    </div>
                                    <div className={classnames({ column: true, mobile: isMobile, tablet: isTablet })}>
                                        <Form
                                            submit={(credentials) => this.props.signIn(credentials)}
                                            validators={{
                                                email: Validators.notBlank,
                                                password: Validators.notBlank,
                                            }}
                                            fields={this.state.values}
                                            errors={{
                                                email: errors.email,
                                                password: errors.password,
                                            }}
                                            onSuccess={this.goToHome}
                                            customButton={true}
                                            onError={(state) => this.setState({errors: state.errors})}
                                            apiError={true}
                                        >
                                            <SignIn
                                                errors={errors}
                                                onChange={(values) => this.setState({values})}
                                                onForgotPassword={this.goToForgotPassword}
                                            />
                                        </Form>
                                    </div>
                                    <div className={classnames({ column: true, mobile: isMobile, tablet: isTablet })}>
                                        <SignUp onSignUp={this.goToSignUp} />
                                    </div>
                                </div>
                                <div className="row last">
                                    <h1 className="advantages">{this.props.t("advantagesTitle")}</h1>
                                </div>
                            </div>
                            <BenefitCardList benefits={this.props.benefits} />
                        </div>
                    )}
                </DeviceContextConsumer>
            </Container>
        );
    }
}
Scene.defaultProps = {
    errors: {}
};
Scene.propTypes = {};

const ReduxConnectedScene = connect(
    (state) => ({
        benefits: state.Benefits,
        isAuthenticated: AuthenticationUtils.isAuthenticated(state)
    }),
    (dispatch) => ({
        signIn: (credential) => dispatch(SignInActioner.loginFromCredential(credential))
    })
)(Scene);

const TranslatedScene = translate("home", { wait: true })(ReduxConnectedScene);
export { TranslatedScene as Scene };
