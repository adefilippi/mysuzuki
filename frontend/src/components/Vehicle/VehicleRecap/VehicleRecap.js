import React, { Component } from "react";
import PropTypes from "prop-types";
import { UserVehiclesUtils } from "../../../services";
import { translate } from "react-i18next";
import "./VehicleRecap.scss";

export const VEHICULE_ENERGY_KEY_BY_TYPES = {
    [UserVehiclesUtils.ENERGY_TYPES.ES]: "esEnergyType",
    [UserVehiclesUtils.ENERGY_TYPES.GO]: "goEnergyType"
};

class VehicleRecap extends Component {
    render() {
        return (
            <div className="vehicle-recap-information">
                <div className="vehicle-recap-information-entry">
                    <span className="vehicle-recap-information-label">{this.props.t("serialNumber")} : </span>
                    <span className="vehicle-recap-information-label">{this.props.vin}</span>
                </div>
                <div className="vehicle-recap-information-entry">
                    <span className="vehicle-recap-information-label">
                        {this.props.name} {this.props.model} {this.props.t(VEHICULE_ENERGY_KEY_BY_TYPES[this.props.enery])} { this.props.color }
                    </span>
                </div>
                <div className="vehicle-recap-information-entry">
                    <span className="vehicle-recap-information-label">{this.props.t("registrationNumber")} : </span>
                    <span className="vehicle-recap-information-text">{this.props.registration}</span>
                </div>
                <div className="vehicle-recap-information-entry">
                    <span className="vehicle-recap-information-label">{this.props.t("purchaseType")} : </span>
                    <span className="vehicle-recap-information-text">{this.props.purcharseType}</span>
                </div>
            </div>
        );
    }
}

VehicleRecap.defaultProps = {
    vin: "XXXXXXXXXXXXXX",
    registration: "XXXXXXXXXX",
    purcharseType: "XXXXXXXXXX",
    name: "xxxxxxx",
    model: "xxxxxxx",
    enery: "xxxxxxx",
    color: "xxxxxxx"
};

VehicleRecap.propTypes = {
    vin: PropTypes.string,
    registration: PropTypes.string,
    purcharseType: PropTypes.string,
    name: PropTypes.string,
    model: PropTypes.string,
    enery: PropTypes.string,
    color: PropTypes.string
};

const TranslatedVehicleRecap = translate("vehicle", { wait: true })(VehicleRecap);
export { TranslatedVehicleRecap as VehicleRecap };
