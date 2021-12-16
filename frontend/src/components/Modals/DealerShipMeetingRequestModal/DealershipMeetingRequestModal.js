import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { translate } from "react-i18next";
import { Modal } from "../components";
import { Button, Textarea, DeviceContextConsumer, Icon, ICON_NAMES } from "../../";
import "./DealershipMeetingRequestModal.scss";

class DealershipMeetingRequestModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEmailVisible: false
        };
    }

    handleMailToClick = () => {
        this.setState({isEmailVisible: true});
        this.props.onMailTo(this.props.email);
    };

    handleModalRequestClose = () => {
        this.props.onRequestClose();
        this.setState({isEmailVisible: false});
    };

    render() {
        return (
            <Modal visible={this.props.visible} onRequestClose={this.handleModalRequestClose}>
                <DeviceContextConsumer>
                    {({ isMobile }) => (
                        <div className="dealership-meeting-request-modal">
                            <div className="dealership-meeting-request-modal-title">{this.props.t("dealershipMeetingRequestModalTitle")}</div>
                            { this.props.phone && (
                                <div onClick={() => this.props.onPhone(this.props.phone)} className="dealership-meeting-request-modal-phone">
                                    <Icon name={ICON_NAMES.PHONE} color="currentColor" size={"35px"} />
                                    <span>{this.props.phone}</span>
                                </div>
                            )}
                            { this.props.email && (
                                this.state.isEmailVisible ? (
                                    <div className="dealership-meeting-show-email">
                                        <Icon name={ICON_NAMES.MAIL} color="currentColor" size={"35px"} />
                                        <span>{this.props.email}</span>
                                    </div>
                                ) : (
                                    <div onClick={this.handleMailToClick} className="dealership-meeting-request-modal-email">
                                        <Icon name={ICON_NAMES.MAIL} color="currentColor" size={"35px"} />
                                        <span>{this.props.t("sendEmail")}</span>
                                    </div>
                                )
                            )}
                            { !this.props.phone && !this.props.email && (
                                <div className={classnames({"dealership-meeting-request-modal-no-contact": true, mobile: isMobile })}>{this.props.t("noDealershipContact")}</div>
                            )}
                        </div>
                    )}
                </DeviceContextConsumer>
            </Modal>
        );
    }
}

DealershipMeetingRequestModal.defaultProps = {
    onRequestClose: () => {},
    onMailTo: () => {},
    onPhone: () => {},
    visible: false,
    phone: "",
    email: ""
};

DealershipMeetingRequestModal.propTypes = {
    onRequestClose: PropTypes.func,
    onMailTo: PropTypes.func,
    onPhone: PropTypes.func,
    visible: PropTypes.bool,
    email: PropTypes.string,
    phone: PropTypes.string
};

const TranslatedDealershipMeetingRequestModal = translate("common", { wait: true })(DealershipMeetingRequestModal);
export { TranslatedDealershipMeetingRequestModal as DealershipMeetingRequestModal };
