import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import classnames from "classnames";
import { translate } from "react-i18next";
import { PATHS } from "../../../../routes";
import {SerialActioner, AuthenticationUtils, UserInformationsUtils, Validators} from "../../../../services";
import { DeviceContextConsumer, Text, Button, Loader, IssueModal, Form } from "../../../../components";
import LOGO_MY_SUZUKI from "../../../../assets/img/logo_darkblue_v2.png";
import { ISSUE_TYPES } from "../../../../services/Help/IssueTypes/issueTypes";

import "./Scene.scss";
import {FindClientIdModal} from "../../../../components/Modals/FindClientIdModal";
import {ConfirmRequestModal} from "../../../../components/Modals/ConfirmRequestModal";

const MODAL_TYPE = {
    ISSUE_SIGNUP: 'issue_signup',
    ISSUE_RESEND: 'issue_resend',
    FIND_CLIENT_ID: 'findClientID',
    CONFIRM_REQUEST: 'confirmRequest',
};

class Scene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                lastName: props.Serial.get("lastName"),
                vin: props.Serial.get("id"),
                clientId: props.Serial.get("clientId"),
            },
            errors: {},
            errorMessage: {},
            modalOpen: false,
        };
    }

    goToHome = () => {
        this.props.history.push(PATHS.ROOT);
    };

    goToCredentialStep = () => {
        this.props.history.push(PATHS.SIGN_UP.CREDENTIAL_STEP);
    };

    openModal(type) {
        this.setState({ modalOpen: type });
    }
    closeModals = () => this.setState({ modalOpen: false });

    render() {
        const errorClassNames = classnames({ "sign-up-serial-error": true, hide: !this.props.Serial.get("error") });
        if (this.props.isAuthenticated && !this.props.hasCompletedTheSignUp) return <Redirect to={PATHS.SIGN_UP.VEHICULE_STEP} />;
        const {
            fields,
            errors,
            errorMessage,
        } = this.state;

        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall }) => (
                    <div className={classnames({ "sign-up-serial-step": true, mobile: isMobile, "mobile-small": isMobileSmall })}>
                        <img alt="suzuki-logo" src={LOGO_MY_SUZUKI} className="sign-up-serial-step-logo" />
                        <h1 className="sign-up-serial-step-title">{this.props.t("title")}</h1>
                        <div className={classnames({ "sign-up-serial-step-form": true, mobile: isMobile })}>
                            <Form
                                submit={fields => this.props.submit(fields)}
                                validators={{
                                    vin: [
                                        Validators.notBlank,
                                        { validator: Validators.vin, message: this.props.t("vinLengthError")}
                                    ],
                                    lastName: Validators.notBlank,
                                    clientId: Validators.notBlank
                                }}
                                fields={fields}
                                errors={errors}
                                onSuccess={this.goToCredentialStep}
                                customButton
                                onError={
                                    (state) => this.setState({
                                        errors: state.errors, errorMessage: state.errorMessage,
                                    })
                                }
                                apiError={true}
                            >
                                <Text
                                    initialValue={fields.lastName}
                                    onValueChanged={
                                        (value) => this.setState({
                                            fields: {...fields, lastName: value },
                                            errors: {...errors, lastName: null}
                                        })
                                    }
                                    transparent
                                    required
                                    label={this.props.t("nameInput")}
                                    inputTooltip={this.props.t("nameInputToolTip")}
                                    isMobile={isMobile}
                                    errorMessage={errors.lastName && errorMessage.lastName}
                                    error={errors.lastName}
                                />
                                <Text
                                    initialValue={this.state.vin}
                                    onValueChanged={
                                        (value) => this.setState({
                                            fields: {...fields, vin: value },
                                            errors: {...errors, vin: null}
                                        })
                                    }
                                    required
                                    transparent
                                    label={this.props.t("vinInput")}
                                    inputTooltip={this.props.t("vinInputToolTip")}
                                    isMobile={isMobile}
                                    errorMessage={errors.vin && errorMessage.vin}
                                    error={errors.vin}
                                />
                                <Text
                                    initialValue={this.state.clientId}
                                    onValueChanged={
                                        (value) => this.setState({
                                            fields: {...fields, clientId: value },
                                            errors: {...errors, clientId: null}
                                        })
                                    }
                                    required
                                    transparent
                                    label={this.props.t("clientIdInput")}
                                    isMobile={isMobile}
                                    errorMessage={errors.clientId && errorMessage.clientId}
                                    error={errors.clientId}
                                />
                                <div className="sign-up-serial-find-client-id">
                                    <a onClick={() => this.openModal(MODAL_TYPE.FIND_CLIENT_ID)}>
                                        {this.props.t("findMyClientId")}
                                    </a>
                                </div>
                                <div className="sign-up-serial-error-container">
                                    <p className={errorClassNames}>{errors.global && errorMessage.global}</p>
                                </div>
                                {
                                    this.props.Serial.get("loading") ? (
                                        <Loader center/>
                                    ) : (
                                        <Button
                                            type="submit"
                                            primary
                                            large={isMobileSmall}
                                            label={this.props.t("button")} />
                                    )
                                }
                            </Form>
                            <div className="sign-up-serial-step-links">
                                <Button primary link onClick={this.goToHome} label={this.props.t("link")} />
                                <Button primary link onClick={() => this.openModal(MODAL_TYPE.ISSUE_SIGNUP)} label={this.props.t("link2")} />
                            </div>
                            <IssueModal
                                askForVin={true}
                                askForName={true}
                                canSendAttachment={false}
                                title={this.props.t("issueSignupModalTitle")}
                                type={ISSUE_TYPES.SIGNUP}
                                visible={this.state.modalOpen === MODAL_TYPE.ISSUE_SIGNUP}
                                onRequestClose={this.closeModals}
                            />
                            <FindClientIdModal
                                visible={this.state.modalOpen === MODAL_TYPE.FIND_CLIENT_ID}
                                onRequestClose={this.closeModals}
                                onResend={() => this.openModal(MODAL_TYPE.ISSUE_RESEND)}
                            />
                            <IssueModal
                                title={this.props.t("issueResendModalTitle")}
                                type={ISSUE_TYPES.RESEND_CLIENT_ID}
                                visible={this.state.modalOpen === MODAL_TYPE.ISSUE_RESEND}
                                onRequestClose={this.closeModals}
                                onSubmit={() => this.openModal(MODAL_TYPE.CONFIRM_REQUEST)}
                            />
                            <ConfirmRequestModal
                                visible={this.state.modalOpen === MODAL_TYPE.CONFIRM_REQUEST}
                                onClose={this.goToHome}
                            />
                        </div>
                    </div>
                )}
            </DeviceContextConsumer>
        );
    }
}

Scene.propTypes = {};

const ReduxConnectedScene = connect(
    (state) => ({
        Serial: state.SignUpProcess.Serial,
        isAuthenticated: AuthenticationUtils.isAuthenticated(state),
        hasCompletedTheSignUp: UserInformationsUtils.hasUserCompleteSignUpFromState(state)
    }),
    (dispatch) => ({
        submit: (serial) => dispatch(SerialActioner.getInformationsFromSerial(serial))
    })
)(Scene);
const TranslatedConnectedScene = translate("signupSerial", { wait: true })(ReduxConnectedScene);
export { TranslatedConnectedScene as Scene };
