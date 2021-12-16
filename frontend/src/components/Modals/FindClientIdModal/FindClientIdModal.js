import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { translate } from "react-i18next";
import { Modal } from "../components";
import {Button, DeviceContextConsumer} from "../../";
import "./FindClientIdModal.scss";
import WELCOME_CARD from "../../../assets/img/signup_serial_welcome_card.png";

class FindClientIdModal extends Component {

    handleModalRequestClose = () => {
        this.props.onRequestClose();
    };

    render() {
        return (
            <Modal visible={this.props.visible} onRequestClose={this.handleModalRequestClose} large>
                <DeviceContextConsumer>
                    {({ isMobile }) => (
                        <article className={classnames({"find-client-id-modal": true, mobile: isMobile})}>
                            <h2>
                                {this.props.t('findMyClientIdModal.title')}
                            </h2>
                            <figure className="find-client-id-help">
                                <img src={WELCOME_CARD} alt=""/>
                                <figcaption>
                                    <p>
                                        {this.props.t('findMyClientIdModal.message1')}
                                    </p>
                                    <p>
                                        <strong>{this.props.t('findMyClientIdModal.message2')}</strong>
                                    </p>
                                </figcaption>
                            </figure>
                            <Button primary center onClick={this.handleModalRequestClose} label={this.props.t('findMyClientIdModal.continue')} />
                            <a className="resend-code" onClick={this.props.onResend} >{this.props.t('findMyClientIdModal.resend')}</a>
                        </article>
                    )}
                </DeviceContextConsumer>
            </Modal>
        );
    }
}

FindClientIdModal.defaultProps = {
    onRequestClose: () => {},
    onResend: () => {},
    visible: false
};

FindClientIdModal.propTypes = {
    onRequestClose: PropTypes.func,
    onResend: PropTypes.func,
    visible: PropTypes.bool,
};

const TranslatedSignUpSerialFindClientIdModal = translate("signupSerial", { wait: true })(FindClientIdModal);
export { TranslatedSignUpSerialFindClientIdModal as FindClientIdModal };
