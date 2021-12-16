import React, { Component } from "react";
import classnames from "classnames";
import { translate } from "react-i18next";
import { Button, BenefitCard, Link } from "../../../../../../../components";

import "./DealershipInformation.scss";
import PropTypes from "prop-types";

class DealershipInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={classnames({ "dealership-information": true })}>
                { this.props.title && (
                    <div className="dealership-information-title">
                        {this.props.t("informationTitle")}
                        {this.props.dealershipAddress.city}
                    </div>
                )}
                <div className="dealership-information-name">{this.props.dealershipName}</div>
                <div className={classnames({
                    "dealership-information-address": true,
                    "inverse-colors": this.props.inverseColors
                })}>
                    <div>{this.props.dealershipAddress.additional1}</div>
                    <div />
                    <div>{this.props.dealershipAddress.street}</div>
                    <div>
                        { this.props.dealershipAddress && this.props.dealershipAddress.additional2 && <span>{this.props.dealershipAddress.additional2} -</span> }
                        { this.props.dealershipAddress && this.props.dealershipAddress.zipCode && <span>{this.props.dealershipAddress.zipCode}</span> }
                        { this.props.dealershipAddress && this.props.dealershipAddress.city && <span>{this.props.dealershipAddress.city}</span> }
                    </div>
                    <div>
                        <span className="phone">{this.props.t("phone")}</span>
                        <span><a href={"tel:" + this.props.dealershipPhone}>{this.props.dealershipPhone}</a></span>
                    </div>
                </div>
                { this.props.dealershipUrl && (
                    <Link
                        attributes={{
                            href:this.props.dealershipUrl,
                            target:"_blank"
                        }}
                        label={this.props.t("detailedRecord")}
                    />
                )}
            </div>
        );
    }
}

BenefitCard.propTypes = {
    title: PropTypes.bool,
    dealershipName: PropTypes.string,
    dealershipAddress: PropTypes.object,
    dealershipPhone: PropTypes.string,
    dealershipUrl: PropTypes.string,
    homepage: PropTypes.bool,
    inverseColors: PropTypes.bool
};

const TranslatedDealershipInformation = translate("dealership", { wait: true })(DealershipInformation);
export { TranslatedDealershipInformation as DealershipInformation };
