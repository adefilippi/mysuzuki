import React, { Component } from "react";
import { translate } from "react-i18next";
import { Validators, PasswordRequestTokenActioner } from "../../../../../services";
import { Form, Text, Loader, Button } from "../../../../../components";
import classnames from "classnames";
import LOGO_MY_SUZUKI from "../../../../../assets/img/logo_darkblue_v2.png";
import { connect } from "react-redux";

class SendLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            errors: {},
            errorMessage: {},
            values: {},
            validators: {
                email: [
                    Validators.notBlank,
                    { validator: Validators.email, message: props.t("validators.email")}
                ]
            },
        };
    }

    updateErrors = (state) => this.setState({errors: state.errors, errorMessage: state.errorMessage});

    render() {
        const {
            errors,
            errorMessage,
            values,
            validators,
            sent,
        } = this.state;

        const {
            isMobile,
            isTablet,
            requestPassword,
            goToHome,
            t,
        } = this.props;

        return (
            <div className={classnames({ welcome: true, mobile: isMobile, tablet: isTablet })}>
                <img alt="suzuki-logo" src={LOGO_MY_SUZUKI} className="forgot-password-logo" />
                <div className={classnames({ "forgot-password-header": true, mobile: isMobile })}>
                    {this.props.t("sendLink.header")}
                </div>
                { !sent ? (
                    <div className="forgot-password-text">
                        {this.props.t("sendLink.text")}
                        <Form
                            submit={(values) => requestPassword(values)}
                            validators={validators}
                            fields={values}
                            errors={{
                                email: errors.email,
                            }}
                            onUpdate={this.updateErrors}
                            onError={this.updateErrors}
                            onSuccess={() => this.setState({sent: true})}
                            apiError={true}
                            submitButton={t("sendLink.button")}
                        >
                            <Text
                                id="email"
                                name="email"
                                large
                                transparent
                                initialValue={values.email}
                                placeholder={t("sendLink.input")}
                                error={errors.email}
                                errorMessage={errors.email && errorMessage.email}
                                onValueChanged={(v) => this.setState({values: {email: v}})}
                            />
                        </Form>
                    </div>
                ) : (
                    <div className="forgot-password-text">
                        {this.props.t("sendLink.sentText")}
                    </div>
                )}
                <Button
                    secondary
                    simple
                    label={t("sendLink.buttons.home")}
                    onClick={goToHome}
                />
            </div>
        );
    }
}

SendLink.defaultProps = {};

SendLink.propTypes = {};

const connected = connect(
    (state) => ({}),
    (dispatch) => ({
        requestPassword: (values) => dispatch(PasswordRequestTokenActioner.create(values))
    }),
)(SendLink);
const translated = translate("home", { wait: true })(connected);
export { translated as SendLink };
