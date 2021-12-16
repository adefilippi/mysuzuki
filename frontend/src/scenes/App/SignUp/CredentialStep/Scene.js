import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { translate } from "react-i18next";
import { PATHS } from "../../../../routes";
import { Redirect } from "react-router";
import {
    CredentialActioner,
    SerialUtils,
    AuthenticationUtils,
    UserInformationsUtils,
    Validators
} from "../../../../services";
import { NavigationActioner, NavigationUtils } from "../../../../services";
import { DeviceContextConsumer, Text, PasswordInput, Checkbox, Button, Loader, Form, CguModal } from "../../../../components";
import { Modal } from "../../../../utils";
import LOGO_MY_SUZUKI from "../../../../assets/img/logo_darkblue_v2.png";

import "./Scene.scss";

class Scene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cguModalOpen: false,
            values: {
                email: "",
                emailConfirmation: "",
                password: "",
                emailOptin: false,
                policiesValidated: false,
            },
            errors: {
                emailConfirmation: false,
                email: false,
                password: false,
                policiesValidated: false,
                global: false
            },
            errorMessage: {
                password: "passwordError",
                global: ""
            }
        };
    }

    goToVehiculeStep = () => {
        this.props.history.push(PATHS.SIGN_UP.VEHICULE_STEP);
    };

    updateErrors = (state) => this.setState({errors: state.errors, errorMessage: state.errorMessage});

    submit = () => this.props
        .createAccountFromCredential({
            email: this.state.values.email,
            password: this.state.values.password,
            emailOptin: this.state.values.emailOptin
        })
    ;
    handlePersonalDataPolicyClick = (e) => {
        e.preventDefault();
        this.props.goToPersonalDataPolicy();
    };

    handleTermsOfServiceClick = (e) => {
        e.preventDefault();
        this.props.goToTermsOfService();
    };

    render() {
        const { values, errors, errorMessage } = this.state;
        const errorBackClassNames = classnames({ "sign-up-credential-step-error": true, hide: !errors.global && !errors.lastName });
        const errorPoliciesClassNames = classnames({ "sign-up-credential-step-error": true, hide: !errors.policiesValidated });
        const termsOfService = (
            <span>
                {this.props.t("cguCheckboxStart")}
                <span onClick={this.handleTermsOfServiceClick} className="text-underline">
                    {this.props.t("cguCheckboxLink")}
                </span>
                {this.props.t("cguCheckboxEnd")}
            </span>
        );
        const termsOfServiceAndPersonalDataPolicy = (
            <span>
                {termsOfService}
                {this.props.t("personalDataPolicyStart")}
                <span onClick={this.handlePersonalDataPolicyClick} className="text-underline">
                    {this.props.t("personalDataPolicyLink")}
                </span>
                {this.props.t("personalDataPolicyEnd")}
            </span>
        );
        if (this.props.isAuthenticated && !this.props.hasCompletedTheSignUp && !this.props.SerialIsValidated) return <Redirect to={PATHS.SIGN_UP.VEHICULE_STEP} />;
        if (!this.props.SerialIsValidated) return <Redirect to={PATHS.SIGN_UP.SERIAL_STEP} />;
        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTablet }) => {
                    return (
                        <div className={classnames({ "sign-up-credential-step": true, mobile: isMobile, "mobile-small": isMobileSmall, tablet: isTablet })}>
                            <img alt="suzuki-logo" src={LOGO_MY_SUZUKI} className="sign-up-credential-step-logo" />
                            <h1 className="sign-up-credential-step-title">{this.props.t("title")}</h1>
                            <Form
                                submit={this.submit}
                                validators={{
                                    email: [Validators.notBlank, {validator:Validators.email, message: this.props.t("emailInvalidError")}],
                                    emailConfirmation: (email) => Validators.confirmation(email, "email", this),
                                    password: (password) => Validators.dataLength({min: 6}, password),
                                    policiesValidated: Validators.notBlank,
                                }}
                                fields={values}
                                errors={errors}
                                onUpdate={this.updateErrors}
                                onError={this.updateErrors}
                                onSuccess={this.goToVehiculeStep}
                                apiError
                                customButton
                            >
                                <div className={classnames({ "sign-up-credential-step-header": true, mobile: isMobile })}>{this.props.t("header")}</div>
                                <div className={classnames({ "sign-up-credential-step-form": true, mobile: isMobile })}>
                                    <div className={classnames({ "sign-up-credential-step-inputs-group": true, mobile: isMobile, tablet: isTablet })}>
                                        <Text
                                            id="email"
                                            required
                                            onValueChanged={(v) => this.setState({ values: { ...values, email: v.trim() } })}
                                            transparent
                                            error={errors.email}
                                            errorMessage={errors.email && errorMessage.email}
                                            label={this.props.t("emailInput")}
                                            disallowPasting={true}
                                        />
                                        <Text
                                            id="email-confirmation"
                                            required
                                            onValueChanged={(v) => this.setState({ values: { ...values, emailConfirmation: v.trim() } })}
                                            transparent
                                            error={errors.emailConfirmation}
                                            errorMessage={errors.emailConfirmation ? this.props.t("emailMismatchError") : ""}
                                            label={this.props.t("emailConfirmationInput")}
                                            disallowPasting={true}
                                        />
                                        <PasswordInput
                                            required
                                            id="password"
                                            onValueChanged={(v) => this.setState({ values: { ...values, password: v } })}
                                            name="password"
                                            label={this.props.t("passwordInput")}
                                            transparent
                                            error={errors.password}
                                            errorMessage={errors.password ? this.props.t("passwordError") : ""}
                                        />
                                    </div>
                                    <div className="sign-up-credential-step-checkboxes-group">
                                        <Checkbox id="4" label={this.props.t("advertisingCheckbox")} onValueChanged={(v) => this.setState({ values: { ...values, emailOptin: v } })} />
                                        <Checkbox id="5" label={termsOfServiceAndPersonalDataPolicy} onValueChanged={(v) => this.setState({ values: { ...values, policiesValidated: v } })} />
                                    </div>
                                    <div className="sign-up-credential-step-errors-container">
                                        <p className={errorPoliciesClassNames}>{this.props.t("policiesValidatedError")}</p>
                                        <p className={errorBackClassNames}>{this.props.t(errorMessage.global || errorMessage.lastName)}</p>
                                    </div>
                                    {this.props.Credential.get("loading") ? (
                                        <Loader />
                                    ) : (
                                        <Button type="submit" primary notAllowed={!values.policiesValidated} large={isMobileSmall} label={this.props.t("button")} />
                                    )}
                                </div>
                            </Form>
                            <div className="sign-up-personal-step-legalNotice">
                                <p dangerouslySetInnerHTML={{__html: this.props.t("commitmentText")}}/>
                            </div>
                            <CguModal
                              visible={this.state.cguModalOpen}
                              onRequestClose={() => this.setState({ cguModalOpen: false })}
                              email={"o&o"}
                              name={"Oo"}
                              />
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
        SerialIsValidated: SerialUtils.isValidated(state),
        Serial: state.SignUpProcess.Serial,
        Credential: state.SignUpProcess.Credential,
        isAuthenticated: AuthenticationUtils.isAuthenticated(state),
        hasCompletedTheSignUp: UserInformationsUtils.hasUserCompleteSignUpFromState(state)
    }),
    (dispatch) => ({
        goToPersonalDataPolicy: () => dispatch(NavigationActioner.redirectTo(NavigationUtils.redirections.personalDataPolicy, "_blank")),
        goToTermsOfService: () => dispatch(NavigationActioner.redirectTo(NavigationUtils.redirections.termsOfService, "_blank")),
        createAccountFromCredential: (params) => dispatch(CredentialActioner.createAccountFromCredential(params))
    })
)(Scene);
const TranslatedConnectedScene = translate("signupCredential", { wait: true })(ReduxConnectedScene);
export { TranslatedConnectedScene as Scene };
