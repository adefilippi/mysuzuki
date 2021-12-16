import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import moment from "moment";
import { translate } from "react-i18next";
import { DeviceContextConsumer, Icon, ICON_NAMES, ICON_COLORS, Infos } from "../../";
import "./OperationCard.scss";

class OperationCard extends Component {

    getIconName = () => {
        return ICON_NAMES[this.props.icon || "TOOLS"];
    };

    render() {
        return (
            <DeviceContextConsumer>
                { ({ isMobile, isMobileSmall, isTablet }) => (
                    <article className={classnames({"operation-card": true, mobile: isMobile })}>
                        <header className="operation-card-header">
                            { this.props.icon &&
                                <Icon
                                    name={this.getIconName()}
                                    color={ICON_COLORS.CURRENT}
                                    size={isMobileSmall ? '33px' : '40px'}
                                />
                            }
                            { this.props.local &&
                                <div className="operation-card-edit-buttons">
                                    <Icon
                                        name={ICON_NAMES.PENCIL}
                                        color={ICON_COLORS.CURRENT}
                                        size={isMobileSmall ? '20px' : '25px'}
                                        onClick={() => this.props.openModal(this.props.maintenance)}
                                    />
                                    <Icon
                                        name={ICON_NAMES.DELETE}
                                        color={ICON_COLORS.CURRENT}
                                        size={isMobileSmall ? '20px' : '25px'}
                                        onClick={() =>
                                            this.props.openDeleteModal({selectedMaintenance: this.props.maintenance})
                                        }
                                    />
                                </div>
                            }
                        </header>
                        <section className="operation-card-content">
                            <Infos
                                inline
                                title={this.props.t("operations.date")}
                                text={moment(this.props.date).format(`${this.props.t("operations.dateFormat")}`)}
                            />
                            <Infos
                                inline
                                title={this.props.t("operations.type")}
                                text={this.props.type} />
                            <Infos
                                inline
                                title={
                                    this.props.local
                                        ? this.props.t("operations.place")
                                        : this.props.t("operations.dealership")
                                }
                                text={this.props.place || this.props.t('operations.undefinedValue')}
                            />
                        </section>
                    </article>
                )}
            </DeviceContextConsumer>
        );
  }
}

OperationCard.defaultProps = {
    icon: "TOOLS",
    date: "",
    type: "",
    place: ""
};

OperationCard.propTypes = {
    icon: PropTypes.string,
    date: PropTypes.string,
    type: PropTypes.string,
    maintenance: PropTypes.object,
    place: PropTypes.string
};

const TranslatedOperationCard = translate("vehicle", {wait: true})(OperationCard);
export { TranslatedOperationCard as OperationCard }
