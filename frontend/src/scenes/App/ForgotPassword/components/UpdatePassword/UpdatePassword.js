import React, { Component } from "react";
import { translate } from "react-i18next";
import {PasswordRequestTokenActioner, Validators} from "../../../../../services";
import { Form, PasswordInput, Loader, Button } from "../../../../../components";
import classnames from "classnames";
import LOGO_MY_SUZUKI from "../../../../../assets/img/logo_darkblue_v2.png";
import {connect} from "react-redux";

const PASSWORD_MIN_LENGTH = 6;

class UpdatePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            errorMessage: {},
            values: {},
            validators: {
                newPassword: [
                    Validators.notBlank,
                    { validator: (value) => Validators.dataLength({min: PASSWORD_MIN_LENGTH}, value), message: props.t("validators.minLength.password", {length: PASSWORD_MIN_LENGTH})}
                ]
            },
        };
        this.timeout= null;
    }

    redirect = () => {
        this.timeout = setTimeout(this.props.goToHome, 3000);
    };

    onSuccess = () => {
        setTimeout(this.setState({success: true}, this.redirect), 1000);
    };

    requestPassword = () => {
        if(this.timeout) {
            clearTimeout(this.timeout);
        }
        this.props.requestPassword();
    };

    updateErrors = (state , callback = () => {}) => this.setState({errors: state.errors, errorMessage: state.errorMessage}, callback);

    render() {
        const {
            errors,
            errorMessage,
            values,
            validators,
            success,
        } = this.state;

        const {
            isMobile,
            isTablet,
            updatePassword,
            t,
            token,
            goToHome,
        } = this.props;

        return (
            !errors.global ? (
                <div className={classnames({welcome: true, mobile: isMobile, tablet: isTablet})}>
                    <img alt="suzuki-logo" src={LOGO_MY_SUZUKI} className="forgot-password-logo"/>
                    <div className={classnames({"forgot-password-header": true, mobile: isMobile})}>
                        {t("updatePassword.header")}
                    </div>
                    { !success ? (
                        <div className="forgot-password-text">
                            {t("updatePassword.text")}
                            <Form
                                submit={(values) => updatePassword(token, values)}
                                validators={validators}
                                fields={values}
                                errors={{
                                    newPassword: errors.newPassword,
                                }}
                                onUpdate={this.updateErrors}
                                onError={this.updateErrors}
                                onSuccess={(state) => this.updateErrors(state, this.onSuccess)}
                                apiError={true}
                                submitButton={t("updatePassword.button")}
                            >
                                <PasswordInput
                                    id="new-password"
                                    name="new_password"
                                    large
                                    placeholder={t("updatePassword.input")}
                                    transparent
                                    error={errors.newPassword}
                                    errorMessage={errors.newPassword && errorMessage.newPassword}
                                    onValueChanged={(v) => this.setState({values: {newPassword: v}})}
                                />
                            </Form>
                        </div>
                    ) : (
                        <div className="forgot-password-text">
                            {t("updatePassword.redirect")}
                        </div>
                    )}
                    <Button
                        secondary
                        simple
                        label={t("updatePassword.buttons.home")}
                        onClick={goToHome}
                    />
                </div>
            ) : (
                <div className={classnames({welcome: true, mobile: isMobile, tablet: isTablet})}>
                    <img alt="suzuki-logo" src={LOGO_MY_SUZUKI} className="forgot-password-logo"/>
                    <div className={classnames({"forgot-password-header": true, mobile: isMobile})}>
                        {t("updatePassword.header")}
                    </div>
                    <div className="forgot-password-text">
                        {t("updatePassword.expired")}
                        <Button simple onClick={this.requestPassword} label={this.props.t("updatePassword.link")} />
                    </div>
                </div>

            )
        );
    }
}

UpdatePassword.defaultProps = {};

UpdatePassword.propTypes = {};

const connected = connect(
    (state) => ({}),
    (dispatch) => ({
        updatePassword: (token, values) => dispatch(PasswordRequestTokenActioner.update(token, values))
    }),
)(UpdatePassword);
const translated = translate("home", { wait: true })(connected);
export { translated as UpdatePassword };
