import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { translate } from "react-i18next";
import {
    DeviceContextConsumer,
    Icon,
    ICON_NAMES,
    ICON_COLORS,
    Button,
    VehicleNextDate,
    DealershipMeetingRequestModal,
    Link,
    DealerShipMeetingRequestLink,
} from "../../../../../../../components";
import { Modal } from "../../../../../../../utils";

/* the following must be removed as soon as the url of the right asset is known */
import MAINTENANCE from "../../../../../../../assets/img/homepage_carnetbord.png";

import "./VehicleMaintenances.scss";

const MODAL_VISIBLE = "isVisible";

class VehicleMaintenances extends Component {

    constructor(props){
        super(props);
        this.state = {
            [MODAL_VISIBLE]: false,
        };
        this.modal = new Modal(this, MODAL_VISIBLE);
    }

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTabletPortrait, isTablet }) => {
                    const responsive = { mobile: isMobile, "mobile-small": isMobileSmall, "tablet-portrait": isTabletPortrait, tablet: isTablet };

                    return (
                        <section id="maintenance-section" className="my-vehicle-maintenances">
                            { this.props.userDealershipEmail && (
                                <DealershipMeetingRequestModal
                                    {...this.modal.attr()}
                                    email={this.props.userDealershipEmail}
                                    onMailTo={this.props.onMailTo}
                                />
                            )}
                            <h1 className={classnames({"my-vehicle-maintenances-title": true, ...responsive})}>
                                <Icon name={ICON_NAMES.CALENDAR} color={ICON_COLORS.SECONDARY} size={isMobileSmall ? '35px' : '40px'}/>
                                {this.props.t("maintenances.title")}
                            </h1>
                            <section className={classnames({"my-vehicle-maintenances-section": true, ...responsive})}>
                                <div className="my-vehicle-maintenances-section-skew">
                                  <div className={classnames({"my-vehicle-maintenances-section-skew-image": true, ...responsive})} style={{ backgroundImage: `url(${MAINTENANCE})`}}></div>
                                  { !isMobile && !isTabletPortrait && <div className={classnames({ "my-vehicle-maintenances-section-skew-overlay": true, ...responsive })}/> }
                                </div>
                                <article className={classnames({"my-vehicle-maintenances-section-content": true, ...responsive})}>
                                    { this.props.date && (
                                        <VehicleNextDate
                                            type={this.props.type}
                                            date={this.props.date}
                                            tooltip={true}
                                            inverseColors={false}
                                            isMobile={isMobile || isMobileSmall}
                                        />
                                    )}
                                    <div className={classnames({"my-vehicle-maintenances-buttons-group": true, ...responsive})}>
                                        <Button
                                            primary
                                            compact={isMobile}
                                            medium={isTablet}
                                            label={this.props.t("maintenances.currentDealsButton")}
                                            onClick={this.props.goToDeals}
                                        />

                                        <DealerShipMeetingRequestLink
                                            compact={isMobile}
                                            medium={isTablet || isTabletPortrait}
                                            tertiary
                                        />
                                    </div>
                                    { this.props.maintenanceProgram && (
                                        <Link
                                            medium
                                            attributes={{
                                                href: this.props.maintenanceProgram,
                                                target: "_blank"
                                            }}
                                            label={this.props.t("maintenances.seeManualLinkButton", {
                                                "model": this.props.model
                                            })}
                                        />
                                    )}
                                </article>
                            </section>
                        </section>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

VehicleMaintenances.propTypes = {
    model: PropTypes.string,
    type: PropTypes.string,
    date: PropTypes.string,
    goToDeals: PropTypes.func,
    maintenanceProgram: PropTypes.string,
    userDealershipEmail: PropTypes.string,
};

const TranslatedVehicleMaintenances = translate("vehicle", { wait: true })(VehicleMaintenances);
export { TranslatedVehicleMaintenances as VehicleMaintenances };
