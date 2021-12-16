import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./Button.scss";
import { Icon, ICON_NAMES } from "../Icon/index";

export class Button extends Component {
    render() {
        const {
            label,
            disabled,
            notAllowed,
            onClick,
            backBtn,
            large,
            shrink,
            narrow,
            compact,
            small,
            medium,
            light,
            primary,
            white,
            whiteSecondary,
            whiteTertiary,
            tertiary,
            transparent,
            simple,
            link,
            down,
            up,
            icon,
            color,
            underline,
            center,
            type,
        } = this.props;

        const buttonClasses = classnames({
            button: true,
            small: small,
            large: large,
            "button-link": link,
            "button-link-primary": link && primary,
            "button-link-white": link && white,
            "button-link-white-secondary": link && whiteSecondary,
            "button-link-light": link && light,
            "button-icon": icon
        });

        const inputClasses = classnames({
            shrink: shrink,
            large: large,
            small: small,
            medium: medium,
            narrow: narrow,
            compact: compact,
            center: center,
            disabled: disabled,
            white: white,
            "not-allowed": notAllowed,
            "btn btn-return": backBtn,
            "btn btn-primary": primary && !link && !icon,
            "btn btn-white-secondary": whiteSecondary && !link && !icon,
            "btn btn-white-tertiary": whiteTertiary && !link && !icon,
            "btn btn-tertiary": tertiary && !link && !icon,
            "btn btn-transparent": transparent,
            "btn-simple": simple,
            "btn-underline": underline,
            [`btn-color-${color}`]: color
        });

        return (
            <div onClick={() => !disabled && onClick()} className={buttonClasses}>
                {backBtn && <Icon color={"inherit"} name={ICON_NAMES.ARROW_LEFT} size="10px" />}
                <input className={inputClasses} type={type} value={label} disabled={disabled}/>
                {link && !down && !up && <Icon name={ICON_NAMES.ARROW_LINK} color="currentColor" size={(small || medium) ? "22px" : "28px"} onClick={() => !disabled && onClick()} />}
                {link && down && !up && <Icon name={ICON_NAMES.ARROW_LINK_DOWN} color="currentColor" size={(small || medium) ? "22px" : "28px"} onClick={() => !disabled && onClick()} />}
                {link && !down && up && <Icon name={ICON_NAMES.ARROW_LINK_UP} color="currentColor" size={(small || medium) ? "22px" : "28px"} onClick={() => !disabled && onClick()} />}
                {icon && <Icon name={icon} color="currentColor" size="28px" />}
            </div>
        );
    }
}

Button.defaultProps = {
    disabled: false,
    label: "",
    onClick: () => {},
    primary: false,
    backBtn: false,
    whiteSecondary: false,
    whiteTertiary: false,
    tertiary: false,
    transparent: false,
    simple: false,
    link: false,
    shrink: false,
    large: false,
    type: "button",
};

Button.propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func,
    primary: PropTypes.bool,
    backBtn: PropTypes.bool,
    whiteSecondary: PropTypes.bool,
    whiteTertiary: PropTypes.bool,
    tertiary: PropTypes.bool,
    transparent: PropTypes.bool,
    simple: PropTypes.bool,
    link: PropTypes.bool,
    shrink: PropTypes.bool,
    type: PropTypes.string,
    large: PropTypes.bool
};
