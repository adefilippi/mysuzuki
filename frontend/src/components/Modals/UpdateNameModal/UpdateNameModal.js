import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { translate } from "react-i18next";
import { Modal } from "../components";
import { Button, Textarea, DeviceContextConsumer, HelpForm } from "../../";
import "./UpdateNameModal.scss";

class UpdateNameModal extends Component {
    render() {
        return (
            <Modal visible={this.props.visible} onRequestClose={this.props.onRequestClose} mobile={this.props.mobile}>
                <DeviceContextConsumer>
                    {({ isMobile }) => (
                        <div className="false-information-modal">
                            <div className={classnames({"false-information-modal-title": true, mobile: isMobile})}>
                                { this.props.fullName ?
                                    this.props.t("falseInformationModalTitleFullName") :
                                    this.props.t("falseInformationModalTitleOnlyLastName")
                                }
                            </div>
                            <div className={classnames({"false-information-modal-header": true, mobile: isMobile})}>
                                {this.props.t("falseInformationModalHeader")}
                            </div>
                            <div className={classnames({"false-information-modal-form": true, mobile: isMobile})}>
                                <div className={classnames({"false-information-modal-entry": true, mobile: isMobile})}>
                                    <span>{this.props.t("falseInformationModalName")}</span>
                                    <span>{this.props.name}</span>
                                </div>
                                <div className={classnames({"false-information-modal-entry": true, mobile: isMobile})}>
                                    <span>{this.props.t("falseInformationModalVin")}</span>
                                    <span>{this.props.vin}</span>
                                </div>
                                <div className={classnames({"false-information-modal-entry": true, mobile: isMobile})}>
                                    <span>{this.props.t("falseInformationModalEmail")}</span>
                                    <span>{this.props.email}</span>
                                </div>
                                <HelpForm isMobile={isMobile}/>
                            </div>
                        </div>
                    )}
                </DeviceContextConsumer>
            </Modal>
        );
    }
}

UpdateNameModal.defaultProps = {
    onRequestClose: () => {},
    onSubmit: () => {},
    visible: false,
    name: "",
    vin: "",
    email: "",
    fullName: false,
};

UpdateNameModal.propTypes = {
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    name: PropTypes.string,
    vin: PropTypes.string,
    email: PropTypes.string,
    fullName: PropTypes.bool
};

const TranslatedUpdateNameModal = translate("signupPersonal", { wait: true })(UpdateNameModal);
export { TranslatedUpdateNameModal as UpdateNameModal };
