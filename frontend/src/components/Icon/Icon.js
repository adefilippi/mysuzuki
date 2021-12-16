import React, { Component } from "react";
import PropTypes from "prop-types";
import { ICON_SVGS } from "./svg";
import classnames from "classnames";

import "./Icon.scss";

export const ICON_NAMES = {
    PHONE: "phone",
    MAIL: "mail",
    FB: "facebook",
    YT: "youtube",
    INSTA: "instagram",
    ARROW_LEFT: "arrow-left",
    ARROW_LINK: "arrow-link",
    ARROW_LINK_DOWN: "arrow-link-down",
    ARROW_LINK_UP: "arrow-link-up",
    ARROW_UP: "arrow-up",
    ARROW_DOWN: "arrow-down",
    ARROW_RIGHT: "arrow-right",
    SEARCH: "search",
    LOCALISER: "localiser",
    PENCIL: "pencil",
    LOOK: "look",
    CLOSING: "closing",
    TOOLTIP: "tooltip",
    CALENDAR: "calendar",
    PIN_LOC: "pin-loc",
    PIN_LOC_ROUND: "pin-loc-round",
    CONTACT: "contact",
    ACCESS: "access",
    MORE: "more",
    ADD: "add",
    LESS: "less",
    DELETE: "delete",
    PREFERENCE: "preference",
    BURGER_MENU: "burger-menu",
    REVIEW: "review",
    WHEEL: "wheel",
    TOOLS: "tool",
    SHAKE_HANDS: "shakeHands",
    OIL: "oil",
    SKEW: "skew",
    WARRANTY_1YEAR: 'warranty-1year',
    WARRANTY_2YEARS: 'warranty-2years',
    WARRANTY_3YEARS: 'warranty-3years',
    WARRANTY_4YEARS: 'warranty-4years',
    WARRANTY_5YEARS: 'warranty-5years',
    WARRANTY_6YEARS: 'warranty-6years',
    WARRANTY_7YEARS: 'warranty-7years',
    WARRANTY_8YEARS: 'warranty-8years',
    WARRANTY_9YEARS: 'warranty-9years',
    WARRANTY_10YEARS: 'warranty-10years',
    WARRANTY_11YEARS: 'warranty-11years',
    PARTICLE_FILTER: 'particle-filter',
    GEAR: 'gear',
    CAR_DOOR: 'car-door',
    THUMBS_UP: 'thumbs-up',
    CAR_WRENCH: 'car-wrench',
    STEERING_WHEEL: 'steering-wheel',
    CAR_MAGNIFYING_GLASS: 'car-magnifying-glass',
    ACCESSORIES: 'accessories',
};

export const ICON_COLORS = {
    PRIMARY: "#003145",
    SECONDARY: "#73b5e0",
    BG_BLUE: "#eff3f4",
    WHITE: "#ffffff",
    CURRENT: "currentColor"
};

const ICON_SVG_BY_NAME = {
    [ICON_NAMES.FB]: ICON_SVGS.FB,
    [ICON_NAMES.INSTA]: ICON_SVGS.Insta,
    [ICON_NAMES.YT]: ICON_SVGS.YT,
    [ICON_NAMES.MAIL]: ICON_SVGS.Mail,
    [ICON_NAMES.PHONE]: ICON_SVGS.Phone,
    [ICON_NAMES.ARROW_LEFT]: ICON_SVGS.ArrowLeft,
    [ICON_NAMES.ARROW_LINK]: ICON_SVGS.ArrowLink,
    [ICON_NAMES.ARROW_LINK_DOWN]: ICON_SVGS.ArrowLinkDown,
    [ICON_NAMES.ARROW_LINK_UP]: ICON_SVGS.ArrowLinkUp,
    [ICON_NAMES.ARROW_UP]: ICON_SVGS.ArrowUp,
    [ICON_NAMES.ARROW_DOWN]: ICON_SVGS.ArrowDown,
    [ICON_NAMES.ARROW_RIGHT]: ICON_SVGS.ArrowRight,
    [ICON_NAMES.SEARCH]: ICON_SVGS.Search,
    [ICON_NAMES.LOCALISER]: ICON_SVGS.Localiser,
    [ICON_NAMES.PENCIL]: ICON_SVGS.Pencil,
    [ICON_NAMES.LOOK]: ICON_SVGS.Look,
    [ICON_NAMES.CLOSING]: ICON_SVGS.Closing,
    [ICON_NAMES.TOOLTIP]: ICON_SVGS.Tooltip,
    [ICON_NAMES.CALENDAR]: ICON_SVGS.Calendar,
    [ICON_NAMES.PIN_LOC]: ICON_SVGS.PinLoc,
    [ICON_NAMES.PIN_LOC_ROUND]: ICON_SVGS.PinLocRound,
    [ICON_NAMES.CONTACT]: ICON_SVGS.Contact,
    [ICON_NAMES.ACCESS]: ICON_SVGS.Access,
    [ICON_NAMES.MORE]: ICON_SVGS.More,
    [ICON_NAMES.ADD]: ICON_SVGS.Add,
    [ICON_NAMES.LESS]: ICON_SVGS.Less,
    [ICON_NAMES.DELETE]: ICON_SVGS.Delete,
    [ICON_NAMES.PREFERENCE]: ICON_SVGS.Preference,
    [ICON_NAMES.BURGER_MENU]: ICON_SVGS.BurgerMenu,
    [ICON_NAMES.REVIEW]: ICON_SVGS.Review,
    [ICON_NAMES.WHEEL]: ICON_SVGS.Wheel,
    [ICON_NAMES.TOOLS]: ICON_SVGS.Tools,
    [ICON_NAMES.SHAKE_HANDS]: ICON_SVGS.ShakeHands,
    [ICON_NAMES.OIL]: ICON_SVGS.Oil,
    [ICON_NAMES.SKEW]: ICON_SVGS.Skew,
    [ICON_NAMES.WARRANTY_1YEAR]: ICON_SVGS.Warranty1Year,
    [ICON_NAMES.WARRANTY_2YEARS]: ICON_SVGS.Warranty2Years,
    [ICON_NAMES.WARRANTY_3YEARS]: ICON_SVGS.Warranty3Years,
    [ICON_NAMES.WARRANTY_4YEARS]: ICON_SVGS.Warranty4Years,
    [ICON_NAMES.WARRANTY_5YEARS]: ICON_SVGS.Warranty5Years,
    [ICON_NAMES.WARRANTY_6YEARS]: ICON_SVGS.Warranty6Years,
    [ICON_NAMES.WARRANTY_7YEARS]: ICON_SVGS.Warranty7Years,
    [ICON_NAMES.WARRANTY_8YEARS]: ICON_SVGS.Warranty8Years,
    [ICON_NAMES.WARRANTY_9YEARS]: ICON_SVGS.Warranty9Years,
    [ICON_NAMES.WARRANTY_10YEARS]: ICON_SVGS.Warranty10Years,
    [ICON_NAMES.WARRANTY_11YEARS]: ICON_SVGS.Warranty11Years,
    [ICON_NAMES.PARTICLE_FILTER]: ICON_SVGS.ParticleFilter,
    [ICON_NAMES.GEAR]: ICON_SVGS.Gear,
    [ICON_NAMES.CAR_DOOR]: ICON_SVGS.CarDoor,
    [ICON_NAMES.THUMBS_UP]: ICON_SVGS.ThumbsUp,
    [ICON_NAMES.CAR_WRENCH]: ICON_SVGS.CarWrench,
    [ICON_NAMES.STEERING_WHEEL]: ICON_SVGS.SteeringWheel,
    [ICON_NAMES.CAR_MAGNIFYING_GLASS]: ICON_SVGS.CarMagnifyingGlass,
    [ICON_NAMES.ACCESSORIES]: ICON_SVGS.Accessories,
};

export class Icon extends Component {
    render() {
        const { id, index, color, size, light, onClick, rotable, disabled } = this.props;
        const classes = classnames({ icon: true, clickable: onClick, rotable: rotable, disabled: disabled });
        return (
            <div className={classes} onClick={() => !disabled && onClick && onClick()}>
                <span>{ICON_SVG_BY_NAME[this.props.name]({ id, color, size, light })}</span>
                {index &&
                    this.props.name == ICON_NAMES.PIN_LOC && (
                        <div className="pin-loc-index">
                            <span>{index}</span>
                        </div>
                    )}
            </div>
        );
    }
}

Icon.defaultProps = {
    name: ICON_NAMES.MAIL,
    id: "",
    index: "",
    size: "50px",
    color: "white",
    light: false,
    disabled: false,
    onClick: null
};

Icon.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.string,
    color: PropTypes.string,
    light: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};
