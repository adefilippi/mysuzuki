import React, { Component } from "react";
import { Redirect } from "react-router";
import { PATHS } from "../../../../../routes";
import { translate } from "react-i18next";
import classnames from "classnames";
import { connect } from "react-redux";
import { VehicleTabContent, VehicleNavBar, VehicleMaintenances, VehicleOperations } from "./components";
import { DeviceContextConsumer, IssueModal } from "../../../../../components";
import {
    UserVehiclesUtils,
    UserInformationsUtils,
    ISSUE_TYPES,
    UserDealershipUtils,
    UserVehiclesActioner,
    UserActioner
} from "../../../../../services";

import "./Scene.scss";
import {VehicleAccessories} from "./components/VehicleAccessories";

class Scene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVehicleFormModalOpen: false
        };
    }

    componentWillMount() {
        this.props.refreshUser();
        this.props.getMaintenances(this.getVehicleIdFromParams());
    }

    getVehicleIdFromParams = () => {
        return this.props.match && this.props.match.params && this.props.match.params.vehicleId;
    };

    getVehicle () {
        return this.props.getVehicleById(this.getVehicleIdFromParams());
    };

    checkVehicleRedirection = () => {
        return !(
            this.getVehicleIdFromParams()
            && this.props.userHasAVehicleWithIdFromState(this.props.match.params.vehicleId)
        );
    };

    toggleModal = (params = {}) => {
        this.setState((prevState) => ({isVehicleFormModalOpen: !prevState.isVehicleFormModalOpen, ...params}))
    };

    closeModal = () => this.setState({isVehicleFormModalOpen: false});

    infoErrorModal = () => {
        this.toggleModal({
            title: this.props.t("falseInformationModalTitle"),
            subject: this.props.t("falseInformationModalSubject"),
            type: ISSUE_TYPES.INFO_ERROR,
            messageInputLabel: null
        });
    };

    deleteMyVehicleModal = () => {
        this.toggleModal({
            title: this.props.t("deleteVehicleModalTitle"),
            subject: this.props.t("deleteVehicleModalSubject"),
            type: ISSUE_TYPES.DELETE_VEHICLE,
            messageInputLabel: this.props.t("issueMessageInputLabel")
        });
    };

    scrollToHash(){
      const hash = this.props.history.location.hash
      if(hash && hash.length > 0) {
        const elem = document.getElementById(hash.replace("#", ""))
        elem && elem.scrollIntoView()
      }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.vehicleId !== prevProps.match.params.vehicleId) {
            this.props.getMaintenances(this.getVehicleIdFromParams());
        }
        this.scrollToHash()
    }

    componentDidMount(){
      this.scrollToHash()
    }

    render() {
        if (this.checkVehicleRedirection()) {
            return <Redirect to={PATHS.VEHICLES.VEHICLE.buildPathFromVehicleId(this.props.FirstVehicle.get("vin"))} />;
        }
        return (
            <DeviceContextConsumer>
                {({ isMobile, isTablet }) => {
                    const responsive = { mobile: isMobile, tablet: isTablet };

                    return (
                        <div className={classnames({"vehicles": true, ...responsive})}>
                            <IssueModal
                                title={this.state.title}
                                subject={this.state.subject}
                                type={this.state.type}
                                name={this.props.UserName}
                                vin={this.getVehicle().get("vin")}
                                email={this.props.UserEmail}
                                visible={this.state.isVehicleFormModalOpen}
                                onRequestClose={this.closeModal}
                                messageInputLabel={this.state.messageInputLabel}
                                canSendAttachment={false}
                            />
                            <VehicleNavBar
                                vehicles={this.props.Vehicles}
                                currentVehicle={this.getVehicle()}
                                userName={this.props.UserName}
                                userEmail={this.props.UserEmail}
                            />
                            <VehicleTabContent
                                vehicle={this.getVehicle()}
                                deleteMyVehicleModal={this.deleteMyVehicleModal}
                                infoErrorModal={this.infoErrorModal}
                            />
                            <VehicleMaintenances
                                model={this.getVehicle() && this.getVehicle().get("model")}
                                type={this.getVehicle() && this.getVehicle().get("nextImportantDateType")}
                                date={
                                    this.getVehicle()
                                    && this.getVehicle().get("nextImportantDate")
                                    && new Date(this.getVehicle().get("nextImportantDate")).toLocaleDateString("fr-FR")
                                }
                                maintenanceProgram={this.getVehicle() && this.getVehicle().get("maintenanceProgram")}
                                goToDeals={() => this.props.history.push(PATHS.DEALS.ROOT)}
                                userDealershipEmail={this.props.userDealership && this.props.userDealership.get("workshopEmail")}
                            />
                            <VehicleOperations
                                operations={this.props.Maintenances.toJS()}
                                vehicle={this.getVehicle() && this.getVehicle().get("@id")}
                            />
                            <VehicleAccessories
                                accessories={this.getVehicle() && this.getVehicle().get("accessories")}
                                accessoriesLink={this.getVehicle() && this.getVehicle().get("accessoriesLink")}
                            />
                        </div>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

Scene.propTypes = {};

const ReduxConnectedScene = connect(
    (state) => ({
        userDealership: UserDealershipUtils.getUserDealershipFromState(state),
        Maintenances: state.Maintenances,
        FirstVehicle: UserVehiclesUtils.getUserFirstVehicleFromState(state),
        Vehicles: UserVehiclesUtils.getUserVehiclesFromState(state),
        getVehicleById: (vehicleId) => UserVehiclesUtils.getVehicleById(vehicleId, state),
        userHasAVehicleWithIdFromState: (vehicleId) =>
            UserVehiclesUtils.userHasAVehicleWithIdFromState(vehicleId, state),
        UserEmail: UserInformationsUtils.getUserEmailFromState(state),
        UserName: UserInformationsUtils.getUserNameFromState(state)
    }),
    (dispatch) => ({
        getMaintenances: (id) => dispatch(UserVehiclesActioner.getMaintenances(id)),
        refreshUser: () => dispatch(UserActioner.getUser())
    })
)(Scene);
const TranslatedConnectedScene = translate("vehicle", { wait: true })(ReduxConnectedScene);
export { TranslatedConnectedScene as Scene };
