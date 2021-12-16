import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Modal } from "../components";
import { Button, Textarea, DeviceContextConsumer } from "../../";
import "./WelcomeToMySuzukiModal.scss";

class WelcomeToMySuzukiModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }
    render() {
        return (
            <Modal visible={this.props.visible} onRequestClose={this.props.onRequestClose}>
                <DeviceContextConsumer>
                    {({ isMobile }) => (
                        <div className="welcome-modal">
                            <div className="welcome-modal-title">{this.props.t("welcomeModalTitle")}</div>
                            <div className="welcome-modal-text">{this.props.t("welcomeModalText", { userEmail: this.props.email })}</div>
                            <div className="welcome-modal-question">{this.props.t("welcomeModalQuestion")}</div>
                            <Button primary link label={this.props.t("welcomeModalButton")} onClick={this.props.onResendEmail} />
                        </div>
                    )}
                </DeviceContextConsumer>
            </Modal>
        );
    }
}

WelcomeToMySuzukiModal.defaultProps = {
    onRequestClose: () => {},
    onResendEmail: () => {},
    visible: false,
    email: ""
};

WelcomeToMySuzukiModal.propTypes = {
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    email: PropTypes.string
};

const TranslatedWelcomeToMySuzukiModal = translate("signupPersonal", { wait: true })(WelcomeToMySuzukiModal);
export { TranslatedWelcomeToMySuzukiModal as WelcomeToMySuzukiModal };
