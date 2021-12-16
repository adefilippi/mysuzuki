import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { translate } from "react-i18next";
import { DeviceContextConsumer, Icon, ICON_NAMES, ICON_COLORS, Button, OperationCardList, MaintenanceModal, ConfirmDeleteModal } from "../../../../../../../components";
import { Modal } from "../../../../../../../utils";

import "./VehicleOperations.scss";

class VehicleOperations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nbOfOperationToShow: 3,
            selectedMaintenance: null
        };
        this.deleteModal = new Modal(this);
    }

    isMoreOperationsToShow = () => {
        if (!this.props.operations) return;
        return this.state.nbOfOperationToShow < this.props.operations.length
    };

    handleSeeMoreOperationsClick = () => {
        if (this.isMoreOperationsToShow()) {
            this.setState(prevState => ({
                nbOfOperationToShow: prevState.nbOfOperationToShow + 3
            }));
        } else {
            this.setState(prevState => ({
                nbOfOperationToShow: 3
            }));
        }
    };

    openModal = (selectedMaintenance) => this.setState({isOpen: true, selectedMaintenance: selectedMaintenance});

    closeModal = (selectedMaintenance) => this.setState({isOpen: false, selectedMaintenance: selectedMaintenance});

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTabletPortrait, isTablet }) => {
                    const responsive = { mobile: isMobile, "mobile-small": isMobileSmall, "tablet-portrait": isTabletPortrait, tablet: isTablet };
                    const { selectedMaintenance } = this.state;

                    return (
                        <section className="my-vehicle-operations">
                            <h1 className={classnames({"my-vehicle-operations-title": true, ...responsive})}>
                                <Icon name={ICON_NAMES.REVIEW} color={ICON_COLORS.SECONDARY} size={isMobileSmall ? '35px' : '40px'}/>
                                {this.props.t("operations.title")}
                            </h1>
                            <section className={classnames({"my-vehicle-operations-section": true, ...responsive})}>
                                <article className={classnames({"my-vehicle-operations-section-content": true, ...responsive})}>
                                    <OperationCardList
                                        operations={this.props.operations}
                                        nbOfOperationToShow={this.state.nbOfOperationToShow}
                                        openModal={this.openModal}
                                        openDeleteModal={this.deleteModal.openModal}
                                    />
                                    <div className="my-vehicle-operations-section-content-buttons">
                                        { this.props.operations.length > 3 && (
                                            <Button
                                                link
                                                down={this.isMoreOperationsToShow()}
                                                up={!this.isMoreOperationsToShow()}
                                                label={
                                                    this.isMoreOperationsToShow() ?
                                                    this.props.t("operations.seeMoreOperationsButton") :
                                                    this.props.t("operations.seeLessOperationsButton")
                                                }
                                                onClick={this.handleSeeMoreOperationsClick}
                                            />
                                        )}
                                        <Button
                                            tertiary
                                            compact
                                            label={this.props.t("operations.addOperationButton")}
                                            onClick={this.openModal}
                                        />
                                        <MaintenanceModal
                                            visible={this.state.isOpen}
                                            onRequestClose={this.closeModal}
                                            maintenance={selectedMaintenance}
                                            vehicle={this.props.vehicle}
                                        />
                                        <ConfirmDeleteModal
                                            {...this.deleteModal.attr()}
                                            maintenance={selectedMaintenance}
                                        />
                                    </div>
                                </article>
                            </section>
                        </section>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

VehicleOperations.defaultProps = {
    operations: []
};

VehicleOperations.propTypes = {
    operations: PropTypes.array
};

const TranslatedVehicleOperations = translate("vehicle", { wait: true })(VehicleOperations);
export { TranslatedVehicleOperations as VehicleOperations };
