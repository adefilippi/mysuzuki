import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { PATHS } from "../../../../../../routes";
import { Icon, ICON_NAMES, DeviceContextConsumer } from "../../../../../../components";
import { UserInformationsUtils, UserActioner } from "../../../../../../services";
import LOGO_MY_SUZUKI from "../../../../../../assets/img/logo_v2.png";

import "./NavBar.scss";

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            openSubMenu: false,
            openUserSubMenu: false,
        };
        this.userMenu = null;
        this.menu = null;
    }

    componentWillMount() {
        document.addEventListener("mousedown", this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClick, false);
    }

    handleClick = e => {
        if (this.state.openSubMenu && !this.menu.contains(e.target)) {
            this.closeSubMenu();
        }

        if (this.state.openUserSubMenu && !this.userMenu.contains(e.target)) {
            this.closeUserSubMenu();
        }
    };

    toggleSubMenu = () => this.setState((prevState) => ({openSubMenu: !prevState.openSubMenu, openUserSubMenu: false}));
    closeSubMenu = () => this.state.openSubMenu && this.setState({openSubMenu: false});

    toggleUserSubMenu = () => this.setState((prevState) => ({openUserSubMenu: !prevState.openUserSubMenu, openSubMenu: false}));
    closeUserSubMenu = () => this.state.openUserSubMenu && this.setState({openUserSubMenu: false});

    render() {
        return this.props.user && !this.props.user.get("empty") && this.props.user.get("@id") ? (
            <DeviceContextConsumer>
                {({ isMobile, isTablet }) => {
                    const responsive = { mobile: isMobile, tablet: isTablet };
                    return (
                        <nav className={classnames({ "nav-bar": true, ...responsive })}>
                            <div
                                className={classnames({
                                    "nav-bar-item": true,
                                    "nav-bar-logo": true,
                                    ...responsive
                                })}
                            >
                                <Link to={PATHS.ROOT}>
                                    <img src={LOGO_MY_SUZUKI} alt="mySuzuki" />
                                </Link>
                            </div>
                            <div
                                className={classnames({
                                    "nav-bar-item": true,
                                    "nav-bar-submenu-container": true,
                                    "nav-bar-submenu-nav": true,
                                    ...responsive
                                })}
                                ref={node => this.menu = node}
                            >
                                <div className="nav-bar-submenu-title" onClick={this.toggleSubMenu}>
                                    <Icon name={ICON_NAMES.BURGER_MENU} size={"32"} color={"#73b5e0"} />
                                </div>
                                <ul
                                    className={classnames({
                                        "nav-bar-submenu": true,
                                        "open": this.state && this.state.openSubMenu,
                                        ...responsive
                                    })}
                                >
                                    <li className="nav-bar-submenu-item">
                                        <Link
                                            className={classnames({
                                                active: window.location.pathname.includes(PATHS.VEHICLES.ROOT)
                                            })}
                                            to={PATHS.VEHICLES.ROOT}
                                            onClick={this.closeSubMenu}
                                        >
                                            <span>
                                                {this.props.t("navBarVehicles")}
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="nav-bar-submenu-item">
                                        <Link
                                            className={classnames({
                                                active: window.location.pathname.includes(PATHS.DEALERSHIPS.ROOT)
                                            })}
                                            to={PATHS.DEALERSHIPS.ROOT}
                                            onClick={this.closeSubMenu}
                                        >
                                            <span>
                                                {this.props.t("navBarDealership")}
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="nav-bar-submenu-item">
                                        <Link
                                            className={classnames({
                                                active: window.location.pathname.includes(PATHS.DEALS.ROOT)
                                            })}
                                            to={PATHS.DEALS.ROOT}
                                            onClick={this.closeSubMenu}
                                        >
                                            <span>
                                                {this.props.t("navBarDeals")}
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="nav-bar-submenu-item">
                                        <Link
                                            className={classnames({
                                                active: window.location.pathname.includes(PATHS.NEWS.ROOT)
                                            })}
                                            to={PATHS.NEWS.ROOT}
                                            onClick={this.closeSubMenu}
                                        >
                                            <span>
                                                {this.props.t("navBarNews")}
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="nav-bar-submenu-item">
                                        <Link
                                            className={classnames({
                                                active: window.location.pathname.includes(PATHS.ARTICLES.ROOT)
                                            })}
                                            to={PATHS.ARTICLES.ROOT}
                                            onClick={this.closeSubMenu}
                                        >
                                            <span>
                                                {this.props.t("navBarAdviceTutorial")}
                                            </span>
                                        </Link>
                                    </li>
                                    { isMobile || isTablet ?
                                        <li className="nav-bar-submenu-item">
                                            <a>
                                                <div onClick={this.props.showHelpModal} className="contact">
                                                    <Icon name={ICON_NAMES.PHONE} size={"35px"} color={"white"}/>
                                                    <span>{this.props.t("assist")}</span>
                                                </div>
                                            </a>
                                        </li>
                                    : null }
                                </ul>
                            </div>
                            <div
                                className={classnames({
                                    "nav-bar-item": true,
                                    "nav-bar-submenu-container": true,
                                    "nav-bar-submenu-user": true,
                                    ...responsive
                                })}
                                ref={node => this.userMenu = node}
                            >
                                <div className="nav-bar-submenu-title" onClick={this.toggleUserSubMenu}>
                                    {this.props.t("navBarWelcome", { name: this.props.username })}
                                    <Icon name={ICON_NAMES.ARROW_DOWN} size={"18"} color={"white"}/>
                                </div>
                                <ul
                                    className={classnames({
                                        "nav-bar-submenu": true,
                                        "open": this.state && this.state.openUserSubMenu,
                                        ...responsive
                                    })}
                                >
                                    <li className="nav-bar-submenu-item">
                                        <Link onClick={this.closeUserSubMenu} to={PATHS.ACCOUNT.ROOT}>{this.props.t("navBarAccount")}</Link>
                                    </li>
                                    <li className="nav-bar-submenu-item nav-bar-logout">
                                        <Link to="" onClick={this.props.signout}>
                                            <span>{this.props.t("navBarLogout")}</span>
                                            <Icon name={ICON_NAMES.ARROW_LINK} size={"32"} color={"white"} />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    );
                }}
            </DeviceContextConsumer>
        ) : null;
    }
}

const ReduxConnectedComponent = connect(
    (state) => ({
        username: UserInformationsUtils.getUserNameFromState(state),
        user: UserInformationsUtils.getUserFromState(state)
    }),
    (dispatch) => ({
        signout: () => dispatch(UserActioner.signout())
    })
)(NavBar);

const TranslatedNavBar = translate("common", { wait: true })(ReduxConnectedComponent);
export { TranslatedNavBar as NavBar };
