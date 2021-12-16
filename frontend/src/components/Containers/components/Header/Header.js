import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import classnames from "classnames";
import { DeviceContextConsumer, Icon, ICON_NAMES } from "../../../../components";
import "./Header.scss";

import LOGO from "../../../../assets/img/logo_mysuzuki_v2.png";
import LOGO_MY_SUZUKI from "../../../../assets/img/logo_mysuzuki_v2.png";
import {connect} from "react-redux";
import { UserInformationsUtils } from "../../../../services";

class Header extends Component {
    getMobilAndTabletElement({ isMobile, isTablet }) {
        return !this.props.user || this.props.user.get("empty") || !this.props.user.get("@id") ? (
            <div className={classnames({ header: true, mobile: isMobile, tablet: isTablet })}>
                <img alt="my-suzuki" src={LOGO_MY_SUZUKI} className={classnames({logo: true, 'dark-border': this.props.isBackgroundWhite})} />
            </div>
        ) : null;
    }

    getElement() {
        return (
            <div className="header">
                <div onClick={this.props.onBackToSuzukiClick} className="suzuki-link">
                    <Icon name={ICON_NAMES.ARROW_LEFT} size={"18px"} color={"white"} />
                    <span>{this.props.t("suzukiLink")}</span>
                </div>
                <div className="section-contact">
                    <div onClick={this.props.onAfterSaleHotlineClick} className="contact">
                        <span>{this.props.t("hotline")}</span>
                        <Icon name={ICON_NAMES.PHONE} size={"45px"} color={"white"} />
                        <Icon name={ICON_NAMES.MAIL} size={"45px"} color={"white"} />
                    </div>
                    <div onClick={this.props.onHelpClick} className="contact">
                        <span>{this.props.t("help")}</span>
                        <Icon name={ICON_NAMES.PHONE} size={"45px"} color={"white"} />
                    </div>
                </div>
                <img src={LOGO} alt="suzuki" className={classnames({logo: true, 'dark-border': this.props.isBackgroundWhite})} onClick={this.props.onLogoToSuzukiClick} />
            </div>
        );
    }

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isTablet }) => {
                    if (isMobile || isTablet) return this.getMobilAndTabletElement({ isMobile, isTablet });
                    return this.getElement();
                }}
            </DeviceContextConsumer>
        );
    }
}

Header.defaultProps = {
    onBackToSuzukiClick: () => {},
    onAfterSaleHotlineClick: () => {},
    onHelpClick: () => {},
    isBackgroundWhite: false
};

Header.propTypes = {
    onBackToSuzukiClick: PropTypes.func,
    onAfterSaleHotlineClick: PropTypes.func,
    onHelpClick: PropTypes.func,
    isBackgroundWhite: PropTypes.bool
};

const ReduxConnectedComponent = connect(
    (state) => ({
        user: UserInformationsUtils.getUserFromState(state)
    })
)(Header);

const TranslatedHeader = translate("header", { wait: true })(ReduxConnectedComponent);
export { TranslatedHeader as Header };
