import React, { Component } from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";
import classnames from "classnames";
import moment from "moment";
import "moment/locale/fr";
import { Icon, ICON_NAMES, Loader } from "../../";
import {DeviceContextConsumer} from "../../contexts/Device";

import "./Datepicker.scss";

import "react-datetime/css/react-datetime.css";

export class Datepicker extends Component {
    constructor(props) {
        super(props);
        const initialDate = props.initialDate && props.initialDate.hours(12) || "";
        this.state = {
            startDate: initialDate,
        };
    }

    componentWillReceiveProps(props) {
        if (this.props.initialDate !== props.initialDate) this.setState({ startDate: props.initialDate });
    }

    handleChange = (date) => {
        if (date) {
            date.hours(12);
        }
        this.setState({ startDate: date, isOpen: true });
        this.props.onDateChange(date);
    };

    handleIconClick = () => {
        this.myInp.openCalendar();
    };

    render() {
        const {
            label,
            disabled,
            icon,
            autoSizing,
            large,
            iconSize,
            transparent,
            required,
            error,
            isBottom,
            errorMessage } = this.props;

        const datepickerClasses = classnames({
            datepicker: true,
            transparent: transparent,
            error: error,
            large
        });

        const labelClasses = classnames({
            "datepicker-label": true,
            "is-required": required,
            error: error
        });

        const inputWrapperClasses = classnames({
            "datepicker-input-wrapper": true,
            large: large
        });

        const inputDateTimeClasses = classnames({
            "text-input-wrapper": true,
            "transparent": true,
            "large": true,
        });

        const inputClasses = classnames({
            "datepicker-input": true,
            transparent: transparent && !error,
            "auto-sizing": autoSizing,
            large: large,
            error: error
        });

        return (
          <DeviceContextConsumer>
            {({ isMobile, isMobileSmall, isTablet }) => {
              const withNativePicker = isMobile || isMobileSmall || isTablet
                
              const inputProps = {
                disabled: disabled || withNativePicker,
                required,
                className:"text-input large datetype"
              }

              return(
                <div className={datepickerClasses}>
                  <label className={labelClasses}>{label}</label>
                  <div className={inputWrapperClasses}>
                    <div className={inputDateTimeClasses}>
                        <Datetime
                            ref={(ip) => (this.myInp = ip)}
                            value={this.state.startDate}
                            dateFormat="DD/MM/YYYY"
                            className={inputClasses}
                            closeOnSelect
                            inputProps={inputProps}
                            locale="fr"
                            onChange={this.handleChange}
                            timeFormat={false}
                            viewMode='years'
                        />
                    </div>
                    
                    {this.props.loading ? (
                      <span className={classnames({icon:true, "vehicle-form-loader": true})}><Loader className="vehicle-form-loader" size={18}/></span>
                    ) : (
                      this.props.isValid ? (
                        <span className={classnames({icon:true})}>&#10004;</span>
                      ) : (
                        icon && <Icon color="#73b5e0" name={icon} size={iconSize} onClick={this.handleIconClick} />
                    )
                  )}
                </div>
                <span className={classnames({ "error-label": true, hide: !errorMessage })}>{errorMessage}</span>
              </div>
              )
            }}
          </DeviceContextConsumer>
        );
    }
}

Datepicker.defaultProps = {
    initialDate: null,
    iconSize: "38px",
    label: "",
    transparent: false,
    required: false,
    autoSizing: false,
    maxDate: null,
    onDateChange: () => {}
};

Datepicker.propTypes = {
    initialDate: PropTypes.object,
    iconSize: PropTypes.string,
    label: PropTypes.string,
    transparent: PropTypes.bool,
    required: PropTypes.bool,
    autoSizing: PropTypes.bool,
    onDateChange: PropTypes.func,
    error: PropTypes.bool,
    errorMessage: PropTypes.string
};
