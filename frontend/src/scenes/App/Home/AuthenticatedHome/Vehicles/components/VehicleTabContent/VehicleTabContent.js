import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import moment from "moment";
import { translate } from "react-i18next";
import { VehiclesForm, VehiclePicture } from "../";
import { DeviceContextConsumer, ICON_NAMES, Button } from "../../../../../../../components";
import { APIUtils, UserVehiclesUtils } from "../../../../../../../services";

import "./VehicleTabContent.scss";

class VehicleTabContent extends Component {
    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props);
    }

    componentWillReceiveProps(props) {
        if (this.props.vehicle !== props.vehicle) this.setState(this.getStateFromProps(props));
    }

    getStateFromProps = (props) => {
        return {
            registrationDate: props.vehicle.get("registrationDate") ? moment(props.vehicle.get("registrationDate")) : "",
            registration: props.vehicle.get("registrationNumber") || "",
            purchaseType: props.vehicle.get("purchaseType") || "",
            purchaseDate: props.vehicle.get("purchaseDate") ? moment(props.vehicle.get("purchaseDate")) : "",
            mileage: props.vehicle.get("mileage") || "",
            annualMileage: props.vehicle.get("annualMileage") || "",
            maxMileage: props.vehicle.get("mileage") || "",
            purchaseDealership: props.vehicle.get("purchaseDealership"),
            vehicleImgUrl: props.vehicle.get("picture") || "",
            vehicleLogoUrl: props.vehicle.get("logo"),
            vehicleManualURL: props.vehicle.get("manual") || "",
            vehicleModelInfos: UserVehiclesUtils.getVehicleModelInfosIntoString(props.vehicle, props.t) || ""
        };
    };

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTablet }) => {
                    const responsive = { mobile: isMobile, "mobile-small": isMobileSmall, tablet: isTablet };
                    return (
                        <div className={classnames({ "vehicle-tab-content": true, ...responsive })}>
                            <VehiclePicture
                                imageUrl={this.state.vehicleImgUrl.get("small")}
                                largeImageUrl={this.state.vehicleImgUrl.get("large")}
                                logoUrl={this.state.vehicleLogoUrl && this.state.vehicleLogoUrl.get("small")}
                                largeLogoUrl={this.state.vehicleLogoUrl && this.state.vehicleLogoUrl.get("large")}
                                vehicleModelInfos={this.state.vehicleModelInfos}
                                model={this.props.vehicle.get("model")}
                                vehicleManualURL={this.state.vehicleManualURL}
                                deleteMyVehicleModal={this.props.deleteMyVehicleModal}
                            />
                            <VehiclesForm
                                vin={this.props.vehicle.get("vin")}
                                registrationDate={this.state.registrationDate}
                                registration={this.state.registration}
                                purchaseType={this.state.purchaseType}
                                purchaseDate={this.state.purchaseDate}
                                mileage={this.state.mileage}
                                maxMileage={this.state.maxMileage}
                                annualMileage={this.state.annualMileage}
                                purchaseDealership={this.state.purchaseDealership}
                                infoErrorModal={this.props.infoErrorModal}
                            />
                        </div>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

VehicleTabContent.propTypes = {
    vehicle: PropTypes.object.isRequired
};

const TranslatedVehicleTabContent = translate("vehicle", { wait: true })(VehicleTabContent);
export { TranslatedVehicleTabContent as VehicleTabContent };
