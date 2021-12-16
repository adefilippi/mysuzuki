import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { translate } from "react-i18next";
import { Modal } from "../components";
import { DeviceContextConsumer, HelpForm } from "../../";
import "./IssueModal.scss";
import { ISSUE_TYPES } from "../../../services/Help/IssueTypes";
import { ResendClientIdForm } from "../../Form/ResendClientIdForm/ResendClientIdForm";

class IssueModal extends Component {
    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall }) => (
                    <Modal visible={this.props.visible} onRequestClose={this.props.onRequestClose} mobile={isMobile}>
                        <div className="false-information-modal">
                            <h2 className={classnames({"false-information-modal-title": true, mobile: isMobile, "mobile-small": isMobileSmall})}>
                                { this.props.title ? this.props.title : this.props.t("demandTitle") }
                            </h2>
                            { this.props.header && (
                                <div className={classnames({"false-information-modal-header": true, mobile: isMobile, "mobile-small": isMobileSmall})}>
                                    {this.props.header}
                                </div>
                            )}
                            <div className={classnames({"false-information-modal-form": true, mobile: isMobile})}>
                                { this.props.name && (
                                    <div className={classnames({"false-information-modal-entry": true, mobile: isMobile})}>
                                        <span>{this.props.t("modalName")}</span>
                                        <span>{this.props.name}</span>
                                    </div>
                                )}
                                { this.props.vin && (
                                    <div className={classnames({"false-information-modal-entry": true, mobile: isMobile})}>
                                        <span>{this.props.t("modalVin")}</span>
                                        <span>{this.props.vin}</span>
                                    </div>
                                )}
                                { this.props.email && (
                                    <div className={classnames({"false-information-modal-entry": true, mobile: isMobile})}>
                                        <span>{this.props.t("modalEmail")}</span>
                                        <span>{this.props.email}</span>
                                    </div>
                                )}
                                { this.getForm({ isMobile, isMobileSmall }) }
                            </div>
                        </div>
                    </Modal>
                )}
            </DeviceContextConsumer>
        );
    }

    getForm(context) {
        switch (this.props.type) {
            case ISSUE_TYPES.RESEND_CLIENT_ID:
                return (
                    <ResendClientIdForm
                        isMobile={context.isMobile}
                        subject={this.props.subject}
                        name={this.props.name}
                        email={this.props.email}
                        onSend={this.props.onSubmit}
                    />
                );
            default:
                return (
                    <HelpForm
                        vin={this.props.vin}
                        messageInputLabel={this.props.messageInputLabel}
                        onRequestClose={this.props.onRequestClose}
                        canSendAttachment={this.props.canSendAttachment}
                        type={this.props.type}
                        email={this.props.email}
                        name={this.props.name}
                        vehicles={this.props.vehicles}
                        subject={this.props.subject}
                        askForName={this.props.askForName}
                        askForVin={this.props.askForVin}
                        isMobile={context.isMobile}
                        toggleModal={this.props.onRequestClose}
                    />
                );
        }
    }
}

IssueModal.defaultProps = {
    onRequestClose: () => {},
    onSubmit: () => {},
    visible: false,
    name: "",
    vin: "",
    email: "",
    header: "",
    subject: "",
    title: "",
    fullName: false,
    type: "",
    askForVin: false,
    askForName: false,
};

IssueModal.propTypes = {
    onRequestClose: PropTypes.func,
    onSubmit: PropTypes.func,
    visible: PropTypes.bool,
    name: PropTypes.string,
    vin: PropTypes.string,
    header: PropTypes.string,
    title: PropTypes.string,
    email: PropTypes.string,
    fullName: PropTypes.bool
};

const TranslatedIssueModal = translate("issue", { wait: true })(IssueModal);
export { TranslatedIssueModal as IssueModal };
