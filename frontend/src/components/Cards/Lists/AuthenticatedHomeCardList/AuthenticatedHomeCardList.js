import React, { Component } from "react";
import PropTypes from "prop-types";
import { AuthenticatedHomeCard } from "../../AuthenticatedHomeCard";
import { DeviceContextConsumer } from "../../../contexts/Device";
import classnames from "classnames";

import "./AuthenticatedHomeCardList.scss";

export class AuthenticatedHomeCardList extends Component {
  render() {
    return (
        <DeviceContextConsumer>
            {({ isMobile, isMobileSmall, isTabletPortrait, isTabletLandscape, isTablet }) => {
                const responsive = {
                    "mobile": isMobile,
                    "mobile-small": isMobileSmall,
                    "tablet": isTablet,
                    "tablet-portrait": isTabletPortrait,
                    "tablet-landscape": isTabletLandscape
                };

                return (
                    <div className={classnames({
                        "authenticated-home-card-background-container": true,
                        ...responsive
                    })}>
                        <div className={classnames({
                            "authenticated-home-card-list": true,
                            ...responsive
                        })}>
                            {
                                this.props.benefits.map((benefit, index) =>
                                    <AuthenticatedHomeCard
                                        {...benefit}
                                        key={index}
                                        onCardClick={this.props.onCardClick}
                                        id={this.props.id}
                                        clickable={this.props.clickable}/>
                                )
                            }
                        </div>
                        <div className="authenticated-home-card-background-left"></div>
                        <div className="authenticated-home-card-background-right"></div>
                    </div>
                );
            }}
        </DeviceContextConsumer>
    );
  }
}

AuthenticatedHomeCardList.defaultProps = {
    benefits: [],
    id: "",
    clickable: false,
    onCardClick: () => {},
};

AuthenticatedHomeCardList.propTypes = {
    benefits: PropTypes.array,
    id: PropTypes.string,
    clickable: PropTypes.bool,
    onCardClick: PropTypes.func,
};
