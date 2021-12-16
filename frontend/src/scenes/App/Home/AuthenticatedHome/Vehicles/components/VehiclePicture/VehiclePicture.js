import React, { Component } from "react";
import classnames from "classnames";
import { translate } from "react-i18next";
import { DeviceContextConsumer, ICON_NAMES, Button } from "../../../../../../../components";
import { APIUtils } from "../../../../../../../services";

import "./VehiclePicture.scss";

class VehiclePicture extends Component {

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isTablet }) => {
                    const responsive = { mobile: isMobile, tablet: isTablet };
                    return (
                        <section className={classnames({ "vehicle-tab-content-picture": true, ...responsive })}>
                            <div className="vehicle-tab-content-picture-container">
                                <img
                                  src={this.props.imageUrl}
                                  srcSet={[
                                    this.props.imageUrl && `${this.props.imageUrl} 1x`,
                                    this.props.largeImageUrl && `${this.props.largeImageUrl} 2x`,
                                  ]}
                                  alt="vehicle"
                                  className="vehicle-tab-content-picture-img"
                                  />
                            </div>
                            <article className={classnames({ "vehicle-tab-content-picture-content": true, ...responsive })}>
                                <figure className={classnames({ "vehicle-tab-content-picture-logo": true, ...responsive })}>
                                    {this.props.logoUrl && this.props.largeLogoUrl ? (
                                        <img
                                            src={this.props.logoUrl}
                                            srcSet={[
                                                this.props.logoUrl && `${this.props.logoUrl} 1x`,
                                                this.props.largeLogoUrl && `${this.props.largeLogoUrl} 2x`,
                                            ]}
                                            alt={this.props.t("images.vehicleLogoAlt")}
                                        />
                                    ) : (
                                        <span className="vehicle-nav-bar-tab-model">{ this.props.model }</span>
                                    )}
                                    <figcaption className={classnames({ "vehicle-tab-content-picture-logo-text": true, ...responsive })}>
                                        { this.props.vehicleModelInfos }
                                    </figcaption>
                                </figure>
                                <div className={classnames({ "vehicle-tab-content-picture-buttons": true, ...responsive })}>
                                    { this.props.vehicleManualURL ? (
                                        <a href={this.props.vehicleManualURL} target="_blank" className="no-styled-link">
                                            <Button
                                                compact={!isMobile}
                                                medium={isMobile}
                                                label={this.props.t("buttons.userManual")}
                                                whiteSecondary
                                                onClick={() => {}}
                                            />
                                        </a>
                                    ) : (
                                        <div/>
                                    )}
                                    <Button
                                        compact={!isMobile}
                                        medium={isMobile}
                                        whiteSecondary
                                        label={this.props.t("buttons.deleteVehicle")}
                                        onClick={this.props.deleteMyVehicleModal}
                                    />
                                </div>
                            </article>
                        </section>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

VehiclePicture.propTypes = {
};

const TranslatedVehiclePicture = translate("vehicle", { wait: true })(VehiclePicture);
export { TranslatedVehiclePicture as VehiclePicture };
