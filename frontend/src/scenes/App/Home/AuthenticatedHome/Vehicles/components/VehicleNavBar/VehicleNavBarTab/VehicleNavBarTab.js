import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import moment from "moment";
import { translate } from "react-i18next";
import { DeviceContextConsumer, Icon, ICON_COLORS, ICON_NAMES } from "../../../../../../../../components";
import { PATHS } from "../../../../../../../../routes";
import { APIUtils } from "../../../../../../../../services";

import PropTypes from "prop-types";
import "./VehicleNavBarTab.scss";

class VehicleNavBarTab extends Component {
    getTabImageElement = () => {
        if (this.props.vehicle && this.props.vehicle.get("logo")) {
            return this.props.vehicle.get("logo");
        }
    };

    getTabTitleElement = () => {
        if (this.props.vehicle && this.props.vehicle.get("model")) {
            return <span className="vehicle-nav-bar-tab-model">{ this.props.vehicle.get("model") }</span>;
        } else return this.props.t("tabs.defaultTabTitle");
    };

    getTabYearElement = () => {
        if ( this.props.vehicle && this.props.vehicle.get("registrationDate") ) {
            return ` (${moment(this.props.vehicle.get("registrationDate")).format('YYYY')})`
        } else return;
    };

    render() {
        return(
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTablet }) => {
                    const responsive = { mobile: isMobile, "mobile-small": isMobileSmall, tablet: isTablet };
                    return ( this.props.vehicle ? (
                        <Link to={PATHS.VEHICLES.VEHICLE.buildPathFromVehicleId(this.props.vehicle.get("vin"))}>
                            <div className={classnames({"vehicle-nav-bar-tab": true, active: this.props.active, ...responsive})}>
                               { this.props.vehicle.get("logo") && (
                                    <figure className={classnames({"vehicle-nav-bar-tab-logo": true, ...responsive})}>
                                       <img
                                           src={ this.props.vehicle.get("logo").get("small") }
                                           srcSet={[
                                               this.props.vehicle.get("logo").get("small") && `${this.props.vehicle.get("logo").get("small")} 1x`,
                                               this.props.vehicle.get("logo").get("large")&& `${this.props.vehicle.get("logo").get("large")} 2x`,
                                           ]}
                                           alt={ this.props.t("images.vehicleLogoAlt") }
                                       />
                                    </figure>
                                )}
                               { !this.getTabImageElement() && this.getTabTitleElement() }
                               { this.getTabYearElement() }
                            </div>
                        </Link>
                    ) : (
                        <a type="button" className={classnames({"vehicle-nav-bar-tab-button": true})} onClick={this.props.onClick}><Icon size="30" name={ICON_NAMES.ADD} color={ICON_COLORS.PRIMARY}/></a>
                    ))
                }}
            </DeviceContextConsumer>
        )
    }
}

VehicleNavBarTab.propTypes = {
    vehicle: PropTypes.object,
    onClick: PropTypes.func,
};

const TranslatedVehicleNavBarTab = translate("vehicle", { wait: true })(VehicleNavBarTab);
export { TranslatedVehicleNavBarTab as VehicleNavBarTab };
