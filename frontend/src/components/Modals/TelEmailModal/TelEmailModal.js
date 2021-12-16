import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Modal } from "../components";
import { Button, Textarea, DeviceContextConsumer, Icon, ICON_NAMES } from "../../";
import "./TelEmailModal.scss";

class TelEmailModal extends Component {
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
                            <div className="tel-email-modal-title">{this.props.t("telEmailModalTitle")}</div>
                            <div onClick={() => this.props.onPhone(this.props.phone)} className="tel-email-modal-phone">
                                <Icon name={ICON_NAMES.PHONE} color="currentColor" size={"35px"} />
                                <span>{this.props.phone}</span>
                            </div>
                            <div onClick={() => this.props.onMailTo(this.props.email)} className="tel-email-modal-email">
                                <Icon name={ICON_NAMES.MAIL} color="currentColor" size={"35px"} />
                                <span>{this.props.email}</span>
                            </div>
                            <small>{this.props.t("footer.hotline-phone-price")}</small>
                        </div>
                    )}
                </DeviceContextConsumer>
            </Modal>
        );
    }
}

TelEmailModal.defaultProps = {
    onRequestClose: () => {},
    onMailTo: () => {},
    onPhone: () => {},
    visible: false,
    phone: "",
    email: ""
};

TelEmailModal.propTypes = {
    onRequestClose: PropTypes.func,
    onMailTo: PropTypes.func,
    onPhone: PropTypes.func,
    visible: PropTypes.bool,
    email: PropTypes.string,
    phone: PropTypes.string
};

const TranslatedTelEmailModal = translate("common", { wait: true })(TelEmailModal);
export { TranslatedTelEmailModal as TelEmailModal };
