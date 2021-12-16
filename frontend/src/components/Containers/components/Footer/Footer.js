import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import classnames from "classnames";
import { Link } from "react-router-dom";

import { DeviceContextConsumer, Icon, ICON_NAMES } from "../../../../components";
import { PATHS } from "../../../../routes";

import "./Footer.scss";

class Footer extends Component {
    getMobilAndTabletElement({ isMobile, isMobileSmall, isTablet }) {
        return (
            <div className="footer-container">
                <div className={classnames({"footer-socials": true, mobile: isMobile, "mobile-small": isMobileSmall, tablet: isTablet})}>
                    { this.props.isAuthenticated ? (
                        <Link to={PATHS.FAQ.ROOT} className="no-styled-link contact start">
                            <span>{this.props.t("help")}</span>
                            <span className="underlined">{this.props.t("contact")}</span>
                        </Link>
                    ): (
                        <div onClick={this.props.toggleIssueModal} className="contact start">
                            <span>{this.props.t("help")}</span>
                            <span className="underlined">{this.props.t("contact")}</span>
                        </div>
                    )}
                    <div className="contact end">
                        <Icon onClick={this.props.onFBClick} style={{ fontSize :"2.2em" }} name={ICON_NAMES.FB} target="blank" />
                        <div className="separator" />
                        <Icon onClick={this.props.onInstaClick} style={{ fontSize :"2.2em" }} name={ICON_NAMES.INSTA} />
                        <div className="separator" />
                        <Icon onClick={this.props.onYTClick} style={{ fontSize :"2.2em" }} name={ICON_NAMES.YT} />
                    </div>
                </div>

                <div className={classnames({ "footer-help": true, mobile: isMobile, tablet: isTablet })}>
                    <div onClick={this.props.onAfterSaleHotlineClick} className="contact">
                        <span>{this.props.t("hotline")}</span>
                        <span>
                            <Icon name={ICON_NAMES.PHONE} style={{ fontSize :"35px" }} color={"white"} />
                            <Icon name={ICON_NAMES.MAIL} style={{ fontSize :"35px" }} color={"white"} />
                        </span>
                    </div>
                    <div onClick={this.props.onHelpClick} className="contact">
                        <span>{this.props.t("assist")}</span>
                        <span><Icon name={ICON_NAMES.PHONE} style={{ fontSize :"35px" }} color={"white"} /></span>
                    </div>
                    <div onClick={this.props.onLegalClick} className="contact end">
                        <span className="underlined">{this.props.t("legal")}</span>
                    </div>
                </div>
            </div>
        );
    }

    getElement() {
        return (
            <div className="footer-socials">
                { this.props.isAuthenticated ? (
                    <Link to={PATHS.FAQ.ROOT} className="no-styled-link contact start">
                        <span>{this.props.t("help")}</span>
                        <span className="underlined">{this.props.t("contact")}</span>
                    </Link>
                ): (
                    <div onClick={this.props.toggleIssueModal} className="contact start">
                        <span>{this.props.t("help")}</span>
                        <span className="underlined">{this.props.t("contact")}</span>
                    </div>
                )}
                {!this.props.isAuthenticated && (
                    <div onClick={this.props.onBikePersonalSpaceClick} className="contact">
                        <span>{this.props.t("space")}</span>
                        <span className="underlined">{this.props.t("linkSpace")}</span>
                    </div>
                )}
                <div className="contact end">
                    <div onClick={this.props.onLegalClick} className="footer-legal">
                        <span className="underlined">{this.props.t("legal")}</span>
                    </div>
                    <Icon onClick={this.props.onFBClick} style={{ fontSize :"2.1rem" }} name={ICON_NAMES.FB} target="blank" />
                    <div className="separator" />
                    <Icon onClick={this.props.onInstaClick} style={{ fontSize :"2.1rem" }} name={ICON_NAMES.INSTA} />
                    <div className="separator" />
                    <Icon onClick={this.props.onYTClick} style={{ fontSize :"2.1rem" }} name={ICON_NAMES.YT} />
                </div>
            </div>
        );
    }

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTablet }) => {
                    if (isMobile || isTablet) return this.getMobilAndTabletElement({ isMobile, isMobileSmall, isTablet });
                    return this.getElement();
                }}
            </DeviceContextConsumer>
        );
    }
}

Footer.defaultProps = {
    isAuthenticated: false,
    onAfterSaleHotlineClick: () => {},
    onBikePersonalSpaceClick: () => {},
    onHelpClick: () => {},
    onFBClick: () => {},
    onInstaClick: () => {},
    onYTClick: () => {},
    toggleIssueModal: () => {},
    onLegalClick: () => {}
};

Footer.propTypes = {
    isAuthenticated: PropTypes.bool,
    onAfterSaleHotlineClick: PropTypes.func,
    onBikePersonalSpaceClick: PropTypes.func,
    onHelpClick: PropTypes.func,
    onFBClick: PropTypes.func,
    onInstaClick: PropTypes.func,
    onYTClick: PropTypes.func,
    onLegalClick: PropTypes.func
};

const TranslatedFooter = translate("footer", { wait: true })(Footer);
export { TranslatedFooter as Footer };
