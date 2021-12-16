import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Modal } from "../components";
import { DeviceContextConsumer, HelpForm } from "../../";
import "./VehicleFalseInfoModal.scss";
import {connect} from "react-redux";

class VehicleFalseInfoModal extends Component {
    render() {
        return (
            <Modal visible={this.props.visible} onRequestClose={this.props.onRequestClose}>
                <DeviceContextConsumer>
                    {({ isMobile }) => (
                        <div className="sign-up-vehicule-step-modal">
                            <div className="sign-up-vehicule-step-modal-title">{this.props.t("falseInformationModalTitle")}</div>
                            <div className="sign-up-vehicule-step-modal-header">{this.props.t("falseInformationModalHeader")}</div>
                            <div className="sign-up-vehicule-step-modal-form">
                                <div className="sign-up-vehicule-step-modal-entry">
                                    <span>{this.props.t("falseInformationModalName")}</span>
                                    <span>{this.props.name}</span>
                                </div>
                                <div className="sign-up-vehicule-step-modal-entry">
                                    <span>{this.props.t("falseInformationModalVin")}</span>
                                    <span>{this.props.vin}</span>
                                </div>
                                <div className="sign-up-vehicule-step-modal-entry">
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

VehicleFalseInfoModal.defaultProps = {
    onRequestClose: () => {},
    visible: false,
    name: "",
    vin: "",
    email: ""
};

VehicleFalseInfoModal.propTypes = {
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    name: PropTypes.string,
    vin: PropTypes.string,
    email: PropTypes.string
};



const ReduxConnectedComponent = connect(
    (state) => ({
    }),
    (dispatch) => ({
    })
)(VehicleFalseInfoModal);

const TranslatedVehicleFalseInfoModal = translate("vehicle", { wait: true })(ReduxConnectedComponent);
export { TranslatedVehicleFalseInfoModal as VehicleFalseInfoModal };
