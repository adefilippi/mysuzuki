import React, { Component } from "react";
import propTypes from "prop-types";
import classnames from "classnames";
import { translate } from "react-i18next";
import { Icon, ICON_NAMES, Button, DeviceContextConsumer, Link } from "../../../";
import "./DealershipListItem.scss";

const BLUE = "#003145";
const WHITE = "#FFFFFF";

class DealershipListItem extends Component {
    render() {
        const dealership = this.props.dealership.toJS();
        const ICON_COLOR = this.props.isCurrent ? WHITE : BLUE;
        const itemClassnames = classnames({ DealershipListItem: true, current: this.props.isCurrent });
        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTablet }) => {
                    const responsive = { mobile: isMobile, "mobile-small": isMobileSmall, tablet: isTablet }
                    return (
                        <div className={itemClassnames}>
                            <div className={classnames({ "DealershipListItem-pin": true, ...responsive })}>
                                <Icon id={`dli-${this.props.position}`} index={this.props.position + 1} name={ICON_NAMES.PIN_LOC} color={ICON_COLOR} size={"45px"} light />
                            </div>
                            <div className={classnames({ "DealershipListItem-content": true, ...responsive })}>
                                <div className={classnames({ "DealershipListItem-address": true, ...responsive })}>
                                    <div className="DealershipListItem-address-name">{dealership.name}</div>
                                    <div>{dealership.address.additional1}</div>
                                    <div />
                                    <div>{dealership.address.street}</div>
                                    <div>
                                        {dealership.address && dealership.address.additional2 && <span>{dealership.address.additional2} -</span>}
                                        {dealership.address && dealership.address.zipCode && <span>{dealership.address.zipCode}</span>}
                                        <span>{dealership.address.city}</span>
                                    </div>
                                    <div>
                                        <span className="phone">{this.props.t("phone", { phone: dealership.phone })}</span>
                                    </div>
                                </div>
                                <div className={classnames({ "DealershipListItem-buttons": true, ...responsive })}>
                                    <Link
                                        white={this.props.isCurrent}
                                        attributes={{
                                            href: dealership.moreInformationUrl,
                                            target: "_blank"
                                        }}
                                        label={this.props.t("detailedRecordButton")}
                                    />
                                    { this.props.isCurrent ? (
                                        <span className="DealershipListItem-current-dealership">{this.props.t("currentDealership")}</span>
                                    ) : (
                                        <Button
                                            onClick={() => {
                                                this.props.onChoose(this.props.dealership);
                                            }}
                                            transparent
                                            narrow={!isMobile}
                                            medium={isMobile}
                                            compact={isMobileSmall}
                                            label={this.props.t("selectDealershipButton")}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

DealershipListItem.defaultProps = {
    dealership: {},
    isCurrent: false,
    position: 0,
    onChoose: (dealership) => {}
};

DealershipListItem.propTypes = {
    dealership: propTypes.object,
    isCurrent: propTypes.bool,
    onChoose: propTypes.func,
    position: propTypes.oneOfType([propTypes.string, propTypes.number])
};

const TranslatedDealershipListItem = translate("dealership", { wait: true })(DealershipListItem);
export { TranslatedDealershipListItem as DealershipListItem };
