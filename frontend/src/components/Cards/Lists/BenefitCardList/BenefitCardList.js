import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { BenefitCard } from "../../BenefitCard";
import { DeviceContextConsumer } from "../../../";

import "./BenefitCardList.scss";

export class BenefitCardList extends Component {
  render() {
    return (
        <DeviceContextConsumer>
            { ({ isMobile, isMobileSmall, isTablet }) => {
                return (
                    <div className={classnames({"benefit-card-list": true, mobile: isMobile, "mobile-small": isMobileSmall})}>
                        {this.props.benefits.map((benefit, index) => <BenefitCard {...benefit} key={index} />)}
                    </div>
                )
            }}
        </DeviceContextConsumer>
    )
  }
}

BenefitCardList.defaultProps = {
  benefits: [],
};

BenefitCardList.propTypes = {
  benefits: PropTypes.object,
};
