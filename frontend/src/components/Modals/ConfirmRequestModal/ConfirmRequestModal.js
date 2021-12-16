import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { translate } from "react-i18next";
import { Modal } from "../components";
import { Button, DeviceContextConsumer } from "../../";
import "./ConfirmRequestModal.scss";

class ConfirmRequestModal extends Component {

    render() {
        return (
            <Modal visible={this.props.visible} onRequestClose={this.props.onClose} large>
                <DeviceContextConsumer>
                    {({ isMobile }) => (
                        <article className={classnames({"confirm-request-modal": true, mobile: isMobile})}>
                            <h2>
                                {this.props.t('confirmRequestModal.title')}
                            </h2>
                            <p>
                                {this.props.t('confirmRequestModal.message')}
                            </p>
                            <Button primary link center onClick={this.props.onClose} label={this.props.t('confirmRequestModal.link')} />
                        </article>
                    )}
                </DeviceContextConsumer>
            </Modal>
        );
    }
}

ConfirmRequestModal.defaultProps = {
    onClose: () => {},
    visible: false
};

ConfirmRequestModal.propTypes = {
    onClose: PropTypes.func,
    visible: PropTypes.bool,
};

const TranslatedSignUpSerialConfirmRequestModal = translate("signupSerial", { wait: true })(ConfirmRequestModal);
export { TranslatedSignUpSerialConfirmRequestModal as ConfirmRequestModal };
