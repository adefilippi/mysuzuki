import React, { Component } from "react";
import classnames from "classnames";
import { translate } from "react-i18next";
import { DeviceContextConsumer, Icon, ICON_NAMES, Button, Text, PasswordInput, Loader } from "../../../../../../../components";

import "./MyAccessForm.scss";
import { UserInformationsUtils, UserActioner } from "../../../../../../../services/User";
import { connect } from "react-redux";
import { Actioner as UserInformationsActioner } from "../../../../../../../services/User/Informations/actioner";
import toastr from "toastr";

class MyAccessForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEmail: "",
            newEmailConfirmation: "",
            oldPassword: "",
            newPassword: "",
            submitted: false,
            passwordSubmitted: false,
            passwordChanged: false,
            errors: {
                newEmail: false,
                newEmailConfirmation: false,
                oldPassword: false,
                newPassword: false
            },
            errorMessage: {
                oldPassword: "",
                newPassword: "",
                newEmail: "myAccessForm.emailInvalidError"
            }
        };
    }

    handleBackErrors = (errors) => {
        const violations = errors.violations || [];
        const that = this;
        violations.forEach(function(violation) {
            if (violation.propertyPath === "email") {
                that.setState((prevState) => ({
                    errors: {
                        ...prevState.errors,
                        newEmail: true
                    },
                    errorMessage: {
                        newEmail: violation.message
                    }
                }));
            }
            if (violation.propertyPath === "oldPassword") {
                that.setState((prevState) => ({
                    errors: {
                        ...prevState.errors,
                        oldPassword: true
                    },
                    errorMessage: {
                        oldPassword: violation.message
                    }
                }));
            }
            if (violation.propertyPath === "newPassword") {
                that.setState((prevState) => ({
                    errors: {
                        ...prevState.errors,
                        newPassword: true
                    },
                    errorMessage: {
                        newPassword: violation.message
                    }
                }));
            }
        });
    };

    hasError = (errors) => {
        errors = errors || this.state.errors;
        const that = this;
        let count = 0;
        for (let error in errors) {
            if (errors[error] !== null && typeof errors[error] === "object") {
                if (that.hasError(errors[error])) count++;
            } else if (errors[error]) {
                count++;
            }
        }

        return count > 0;
    };

    checkErrors = () => {
        return new Promise((resolve, reject) => {
            const emailRegexp = new RegExp(/^.+\@\S+\.\S+$/);
            this.setState(
                (prevState) => ({
                    errors: {
                        ...prevState.errors,
                        newEmail: !emailRegexp.test(prevState.newEmail),
                        newEmailConfirmation: prevState.newEmail !== prevState.newEmailConfirmation
                    }
                }),
                () => (this.hasError() ? reject() : resolve())
            );
        });
    };

    checkPasswordErrors = () => {
        return new Promise((resolve, reject) => {
            this.setState(
                (prevState) => ({
                    errors: {
                        ...prevState.errors,
                        oldPassword: !prevState.oldPassword,
                        newPassword: !prevState.newPassword
                    }
                }),
                () => (this.hasError() ? reject() : resolve())
            );
        });
    };

    emailSubmit = () => {
        this.setState({ submitted: true });
        this.checkErrors()
            .then(() => {
                this.props
                    .updateEmail(this.state.newEmail)
                    .then(() => {
                        this.setState({newEmail: "",newEmailConfirmation:""});
                        toastr.success(this.props.t('updated.success'))
                    })
                    .catch((errors) => {
                        toastr.error(this.props.t('updated.error'));
                        this.handleBackErrors(errors);
                    })
                    .finally(() => {
                        this.setState({ submitted: false });
                    });
            })
            .catch(() => {
                this.setState({ submitted: false });
            });
    };

    passwordSubmit = () => {
        this.setState({ passwordSubmitted: true });
        this.checkPasswordErrors()
            .then(() => {
                this.props
                    .updatePassword(this.state)
                    .then(() => {
                        this.setState({
                            newPassword: "",
                            oldPassword: "",
                        });
                        toastr.success(this.props.t('updated.success'));
                    })
                    .catch((errors) => {
                        toastr.error(this.props.t('updated.error'));
                        this.handleBackErrors(errors);
                    })
                    .finally(() => {
                        this.setState({ passwordSubmitted: false });
                    });
            })
            .catch(() => {
                this.setState({ passwordSubmitted: false });
            });
    };

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTablet }) => {
                    const responsive = { mobile: isMobile, tablet: isTablet };
                    return (
                        <div className={classnames({ "my-access": true, ...responsive })}>
                            <div className="column">
                                <form className={classnames({ "my-access-form": true, large: isMobile, ...responsive })}>
                                    <header className="my-access-form-title">{this.props.t("myAccessForm.emailFormTitle")}</header>
                                    <div className={classnames({ "my-access-form-inputs-group": true, ...responsive })}>
                                        <Text id="current-email" name="currentEmail" disabled large transparent initialValue={this.props.userEmail} label={this.props.t("myAccessForm.currentEmail")} />
                                        <Text
                                            id="new-email"
                                            name="newEmail"
                                            large
                                            transparent
                                            label={this.props.t("myAccessForm.newEmail")}
                                            initialValue={this.state.newEmail}
                                            onValueChanged={(v) => this.setState({ newEmail: v, emailChanged: (v !== "") })}
                                            error={this.state.errors.newEmail}
                                            errorMessage={this.state.errors.newEmail ? this.props.t(this.state.errorMessage.newEmail) : ""}
                                        />
                                        <Text
                                            id="new-email-confirmation"
                                            name="newEmailConfirmation"
                                            large
                                            transparent
                                            initialValue={this.state.newEmailConfirmation}
                                            label={this.props.t("myAccessForm.newEmailConfirmation")}
                                            onValueChanged={(v) => this.setState({ newEmailConfirmation: v, emailChanged: (v !== "") })}
                                            error={this.state.errors.newEmailConfirmation}
                                            errorMessage={this.state.errors.newEmailConfirmation ? this.props.t("myAccessForm.emailMismatchError") : ""}
                                        />
                                    </div>
                                    { this.state.submitted ? (
                                          <div className="btn-loader"><Loader /></div>
                                      ) : (
                                          <Button
                                              disabled={this.state.passwordSubmitted || this.state.newEmail === "" || this.state.newEmailConfirmation === "" }
                                              primary
                                              center
                                              large={isMobileSmall}
                                              label={this.props.t("modifieFormButton")}
                                              onClick={this.emailSubmit} />
                                      )}
                                </form>
                            </div>
                            <div className="column">
                                <form className={classnames({ "my-access-form": true, ...responsive })}>
                                    <header className="my-access-form-title">{this.props.t("myAccessForm.passwordFormTitle")}</header>
                                    <div className={classnames({ "my-access-form-inputs-group": true, ...responsive })}>
                                        <PasswordInput
                                            id="current-password"
                                            name="currentPassword"
                                            large
                                            transparent
                                            initialValue={this.state.oldPassword}
                                            label={this.props.t("myAccessForm.currentPassword")}
                                            onValueChanged={(v) => this.setState({ oldPassword: v, passwordChanged: (v !== "") })}
                                            error={this.state.errors.oldPassword}
                                            errorMessage={this.state.errors.oldPassword ? this.state.errorMessage.oldPassword : ""}
                                            newPassword={false}
                                        />
                                        <PasswordInput
                                            id="new-password"
                                            name="newPassword"
                                            large
                                            transparent
                                            initialValue={this.state.newPassword}
                                            label={this.props.t("myAccessForm.newPassword")}
                                            onValueChanged={(v) => this.setState({ newPassword: v, passwordChanged: true })}
                                            error={this.state.errors.newPassword}
                                            errorMessage={this.state.errors.newPassword ? this.state.errorMessage.newPassword : ""}
                                        />
                                    </div>
                                    { this.state.passwordSubmitted ? (
                                        <div className="btn-loader"><Loader /></div>
                                    ) : (
                                        <Button
                                            disabled={this.state.submitted || this.state.oldPassword === "" || this.state.newPassword === ""}
                                            primary
                                            center
                                            large={isMobileSmall}
                                            label={this.props.t("modifieFormButton")}
                                            onClick={this.passwordSubmit} />
                                    )}
                                </form>
                            </div>
                        </div>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}
MyAccessForm.propTypes = {};

const ReduxConnectedSComponent = connect(
    (state) => ({
        userEmail: UserInformationsUtils.getUserEmailFromState(state),
        user: state.User.Informations
    }),
    (dispatch) => ({
        updateEmail: (email) => dispatch(UserInformationsActioner.updateUserInformations({ email: email })),
        updatePassword: (values) => dispatch(UserActioner.updatePassword(values))
    })
)(MyAccessForm);

const TranslatedMyAccessForm = translate("account", { wait: true })(ReduxConnectedSComponent);
export { TranslatedMyAccessForm as MyAccessForm };
