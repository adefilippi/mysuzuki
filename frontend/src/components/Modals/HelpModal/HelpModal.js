import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { translate } from "react-i18next";
import { Modal } from "../components";
import { Button, Textarea, DeviceContextConsumer, Icon, ICON_NAMES } from "../../";
import "../TelEmailModal/TelEmailModal.scss";

class HelpModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Modal visible={this.props.visible} onRequestClose={this.props.onRequestClose}>
                <DeviceContextConsumer>
                    {({ isMobile }) => (
                        <div className="tel-email-modal">
                            <div className="tel-email-modal-title">{this.props.t("helpModalTitle")}</div>
                            <div onClick={() => this.props.onPhone(this.props.phone)} className="tel-email-modal-phone">
                                <Icon name={ICON_NAMES.PHONE} color="currentColor" size={"35px"} />
                                <span>{this.props.phone}</span>
                            </div>
                        </div>
                    )}
                </DeviceContextConsumer>
            </Modal>
        );
    }
}

HelpModal.defaultProps = {
    onRequestClose: () => {},
    onPhone: () => {},
    visible: false,
    phone: "",
};

HelpModal.propTypes = {
    onRequestClose: PropTypes.func,
    onPhone: PropTypes.func,
    visible: PropTypes.bool,
    phone: PropTypes.string
};

const TranslatedHelpModal = translate("common", { wait: true })(HelpModal);
export { TranslatedHelpModal as HelpModal };
