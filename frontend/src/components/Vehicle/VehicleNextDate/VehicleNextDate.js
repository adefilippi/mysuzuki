import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {Tooltip} from "../../Tooltip";

import "./VehicleNextDate.scss";

class VehicleNextDate extends Component {
    render() {
        return (
            <section className="vehicle-next-date-container">
                <h3 className={classnames({
                        "vehicle-next-date-title": true,
                        "inverse-colors": this.props.inverseColors
                    })}>{this.props.t("nextDate.title")}</h3>
                <div className={classnames({
                    "vehicle-next-date-content": true,
                    "inverse-colors": this.props.inverseColors
                })}>
                    <span>{this.props.t(`nextDate.types.${this.props.type}`)}</span> : <span>{this.props.date}</span>
                    { this.props.tooltip && !this.props.isMobile && (
                        <Tooltip
                            left
                            text={this.props.t(`nextDate.tooltips.${this.props.type}.text`)}
                            title={this.props.t(`nextDate.tooltips.${this.props.type}.title`)}
                            size="30px"
                            html
                        />
                    )}
                </div>
            </section>
        );
    }
}

Tooltip.defaultProps = {
    type: "",
    date: "",
    isMobile: false,
    tooltip: false,
    inverseColors: false
};

VehicleNextDate.propTypes = {
    type: PropTypes.string,
    date: PropTypes.string,
    isMobile: PropTypes.bool,
    tooltip: PropTypes.bool,
    inverseColors: PropTypes.bool
};

const TranslatedVehicleNextDate = translate("vehicle", { wait: true })(VehicleNextDate);
export { TranslatedVehicleNextDate as VehicleNextDate };
