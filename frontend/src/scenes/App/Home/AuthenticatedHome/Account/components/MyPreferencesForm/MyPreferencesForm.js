import React, { Component } from "react";
import classnames from "classnames";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import { DeviceContextConsumer, Checkbox, Button, IssueModal } from "../../../../../../../components";
import {ISSUE_TYPES, UserInformationsActioner, UserInformationsUtils} from "../../../../../../../services";

import "./MyPreferencesForm.scss";
import { connect } from "react-redux";
import toastr from "toastr";
import { Modal } from "../../../../../../../utils";

const MODAL_OPEN = "modalOpen";

class MyPreferencesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            [MODAL_OPEN]: false,
            loading: false,
            errors: {
                sms: false
            }
        };
        this.modal = new Modal(this, MODAL_OPEN);
    }

    submit = (params) => {
        this.setState({ loading: !params.errors.sms, ...params }, () => {
            !this.state.errors.sms && this.props
                .submit(params)
                .then(() => toastr.success(this.props.t('updated.success')))
                .catch(() => toastr.error(this.props.t('updated.error')))
                .finally(() => this.setState({ loading: false }))
            ;
        });
    };

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isTablet }) => {
                    const { modal } = this;
                    const { user, userName } = this.props;
                    return (
                        <form className="my-preferences-form">
                            <article>
                                <p className="my-preferences-form-checkboxes-group-title">{this.props.t("myPreferencesForm.checkboxGroupTitle")}</p>
                                <div className="my-preferences-form-checkboxes-group">
                                    <Checkbox
                                        initialValue={this.props.user.getIn(["optin", "email"])}
                                        id="preferences-optinEmail"
                                        border
                                        label={this.props.t("myPreferencesForm.emailOptin")}
                                        onValueChanged={(v) => this.submit({ emailOptin: v, smsOptin: this.props.user.getIn(["optin", "sms"]), errors: { sms: false } })}
                                    />
                                    <Checkbox
                                        initialValue={this.props.user.getIn(["optin", "sms"])}
                                        id="preferences-optinSMS"
                                        border
                                        label={this.props.t("myPreferencesForm.smsOptin")}
                                        onValueChanged={(v) => this.submit({ smsOptin: v, emailOptin: this.props.user.getIn(["optin", "email"]), errors: { sms: v && !user.get("mobilePhone") } })}
                                    />
                                    { this.state.errors.sms && (
                                        <span className="error-span">
                                            {this.props.t("errors.smsOptin")}
                                        </span>
                                    )}
                                </div>
                            </article>
                            <Button underline color="tertiary" label={this.props.t("myPreferencesForm.deleteAccountButton")} onClick={this.props.openIssueModal} />
                            <p className="my-preferences-form-p-button" onClick={modal.openModal}>
                                {this.props.t("myPreferencesForm.noCommunicationButton")}
                            </p>
                            <article className="my-preferences-form-article">
                                <header className="my-preferences-form-article-title">{this.props.t("myPreferencesForm.commitmentTitle")}</header>
                                <p className={classnames({ "my-preferences-form-article-text": true, mobile: isMobile })} dangerouslySetInnerHTML={{__html: this.props.t("myPreferencesForm.commitmentText")}}>
                                </p>
                            </article>
                            <IssueModal
                                {...modal.attr()}
                                title={this.props.t("modal.optins.title")}
                                subject={this.props.t("modal.optins.subject")}
                                type={ISSUE_TYPES.DELETE_OPTINS}
                                name={userName}
                                email={user.get("email")}
                                canSendAttachment={false}
                            />
                        </form>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

MyPreferencesForm.propTypes = {
    openIssueModal: PropTypes.func
};

const ReduxConnectedComponent = connect(
    (state) => ({
        user: state.User.Informations,
        userName: UserInformationsUtils.getUserNameFromState(state)
    }),
    (dispatch) => ({
        submit: (values) => dispatch(UserInformationsActioner.updateUserInformations(UserInformationsUtils.fromFormToApiParams(values)))
    })
)(MyPreferencesForm);

const TranslatedMyPreferencesForm = translate("account", { wait: true })(ReduxConnectedComponent);
export { TranslatedMyPreferencesForm as MyPreferencesForm };
