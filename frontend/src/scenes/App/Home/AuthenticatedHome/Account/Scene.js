import React, { Component } from "react";
import classnames from "classnames";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { MyContactForm, MyAccessForm, MyPreferencesForm } from "./components";
import { DeviceContextConsumer, Icon, ICON_NAMES, ICON_COLORS, Button, IssueModal } from "../../../../../components";
import {UserInformationsActioner, UserInformationsUtils, UserVehiclesUtils} from "../../../../../services";
import { ISSUE_TYPES } from "../../../../../services/Help/IssueTypes";

import "./Scene.scss";
import {AccordionSection} from "../../../../../components/Accordion/AccordionSection";

class Scene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdateNameModalVisible: false
        };
    }

    componentWillMount() {
        this.props.refreshUser();
    }

    toggleModal = (params = {}) => {
        this.setState((prevState) => ({isUpdateNameModalVisible: !prevState.isUpdateNameModalVisible, ...params}))
    };

    nameErrorModal = () => {
        this.toggleModal({
            title: this.props.t("falseInformationModalTitleOnlyLastName"),
            subject: this.props.t("falseInformationModalSubject"),
            type: ISSUE_TYPES.INFO_ERROR,
        });
    };

    deleteMyAccountModal = () => {
        this.toggleModal({
            title: this.props.t("deleteAccountModalTitle"),
            subject: this.props.t("deleteAccountModalSubject"),
            type: ISSUE_TYPES.DELETE_ACCOUNT,
        });
    };

    onRequestClose = () => {
        this.setState({ isUpdateNameModalVisible: false });
    };

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTablet }) => {
                    const responsive = { mobile: isMobile, "mobile-small": isMobileSmall, tablet: isTablet };

                    return (
                        <div className="my-account">
                            <IssueModal
                                title={this.state.title}
                                header={this.props.t("falseInformationModalHeader")}
                                canSendAttachment={false}
                                type={this.state.type}
                                subject={this.state.subject}
                                name={this.props.UserName}
                                vin={this.props.Vehicle.get("vin")}
                                email={this.props.UserEmail}
                                visible={this.state.isUpdateNameModalVisible}
                                onRequestClose={this.onRequestClose}
                                mobile={isMobile}
                            />
                            <h1 className={classnames({"my-account-title": true, ...responsive})}>{this.props.t("title")}</h1>
                            <section className={classnames({"my-account-container": true, ...responsive})}>
                                <AccordionSection title={this.props.t("myContact")} iconName={ICON_NAMES.CONTACT}>
                                    <MyContactForm user={this.props.User} onRequestUpdateNameModal={this.nameErrorModal}/>
                                </AccordionSection>
                                <AccordionSection title={this.props.t("myAccess")} iconName={ICON_NAMES.ACCESS}>
                                    <MyAccessForm user={this.props.User} />
                                </AccordionSection>
                                <AccordionSection title={this.props.t("myPreferences")} iconName={ICON_NAMES.PREFERENCE}>
                                    <MyPreferencesForm user={this.props.User} openIssueModal={this.deleteMyAccountModal}/>
                                </AccordionSection>
                            </section>
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
        User: UserInformationsUtils.getUserFromState(state),
        UserName: UserInformationsUtils.getUserNameFromState(state),
        UserEmail: UserInformationsUtils.getUserEmailFromState(state),
        Vehicle: UserVehiclesUtils.getUserFirstVehicleFromState(state)
    }),
    (dispatch) => ({
        refreshUser: () => dispatch(UserInformationsActioner.getUserInformations()),
    })
)(Scene);
const TranslatedConnectedScene = translate("account", { wait: true })(ReduxConnectedScene);
export { TranslatedConnectedScene as Scene };
