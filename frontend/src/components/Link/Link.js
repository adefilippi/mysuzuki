import React, { Component } from 'react';
import * as classnames from "classnames";
import { Icon } from "../../components";
import { ICON_NAMES} from "../Icon/Icon";
import { Link as ReactLink } from "react-router-dom";

import "./Link.scss"

export class Link extends Component {
    render() {
        const {
            attributes,
            label,
            icon,
            internalRedirection,
            button,
            white,
            medium,
            small,
            compact,
            secondary,
            tertiary,
            onClick,
        } = this.props;

        return internalRedirection ? (
                <ReactLink
                    className={classnames({
                        "link": true,
                        "white": white,
                        "medium": medium,
                        "small": small,
                        "compact": compact,
                    })}
                    to={attributes.href}
                    onClick={onClick}
                >
                    {label || attributes.href}
                    {icon && <Icon name={icon.name} color={icon.color} size="28px"/>}
                </ReactLink>
            ) : (

                button ? (
                    <div className="button">
                        <a
                            onClick={onClick}
                            className={classnames({
                                "center": true,
                                "btn": true,
                                "btn-primary": !secondary && !tertiary,
                                "btn-white-secondary": secondary,
                                "btn-tertiary": tertiary,
                                "small": small,
                                "compact": compact,
                                "medium": medium,
                            })}
                            {...attributes}
                        >
                            {label || attributes.href}
                        </a>
                    </div>
                ) : (
                    <a
                        onClick={onClick}
                        className={classnames({
                            "link": true,
                            "white": white,
                            "medium": medium,
                            "small": small,
                            "compact": compact,
                        })}
                        {...attributes}
                    >
                        {label || attributes.href}
                        {icon && <Icon name={icon.name} color={icon.color} size="28px"/>}
                    </a>
                )
        );
    }
}

Link.defaultProps = {
    attributes: {
        href: "#"
    },
    internalRedirection: false,
    button: false,
    label: null,
    icon: {
        name: ICON_NAMES.ARROW_LINK,
        color: "currentColor"
    },
    white: false,
    medium: false,
    small: false,
    secondary: false,
    tertiary: false,
    onClick: () => {},
};

