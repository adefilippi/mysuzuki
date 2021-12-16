import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { VehicleNavBarTab } from "./VehicleNavBarTab";
import { DeviceContextConsumer, IssueModal, Button, ICON_NAMES } from "../../../../../../../components";
import { ISSUE_TYPES } from "../../../../../../../services";
import { translate } from "react-i18next";

import "./VehicleNavBar.scss";

class VehicleNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggleModal = () => this.setState((prevState) => ({isOpen:! prevState.isOpen}));

    closeModal = () => this.setState({isOpen: false});

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isTablet }) => {
                    const responsive = { mobile: isMobile, tablet: isTablet };
                    return (
                        <div className={classnames({"vehicle-nav-bar": true, ...responsive })}>
                            <div className={classnames({"vehicle-nav-bar-tabs": true, ...responsive })}>
                                {this.props.vehicles.map((vehicle) => (
                                    <VehicleNavBarTab
                                        key={vehicle.get("vin")}
                                        vehicle={vehicle}
                                        active={
                                            this.props.currentVehicle && (this.props.currentVehicle.get("vin") === vehicle.get("vin"))
                                        }
                                    />
                                ))}
                            </div>
                            { isMobile ? (
                                <VehicleNavBarTab onClick={this.toggleModal} />
                            ) : (
                                <Button
                                    icon={ICON_NAMES.ADD}
                                    primary
                                    label={this.props.t("buttons.newVehicle")}
                                    onClick={this.toggleModal}
                                />
                            )}
                            <IssueModal
                                title={this.props.t("newVehicleModalTitle")}
                                subject={this.props.t("newVehicleModalSubject")}
                                messageInputLabel={this.props.t("newVehicleMessageInputLabel")}
                                type={ISSUE_TYPES.ADD_VEHICLE}
                                name={this.props.userName}
                                askForVin
                                email={this.props.userEmail}
                                visible={this.state.isOpen}
                                onRequestClose={this.closeModal}
                                canSendAttachment={false}
                            />
                        </div>
                    )
                }}
            </DeviceContextConsumer>
        );
    };
}

VehicleNavBar.propTypes = {
    vehicles: PropTypes.object.isRequired
};

const translatedNavBar = translate("vehicle", { wait: true })(VehicleNavBar);
export { translatedNavBar as VehicleNavBar };
