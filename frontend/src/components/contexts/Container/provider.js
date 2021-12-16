import React, { Component } from "react";
import { connect } from "react-redux";
import { Context } from "./context";
import { TelEmailModal, HelpModal, LegalModal, IssueModal } from "../../";
import { NavigationActioner, NavigationUtils, UserInformationsUtils } from "../../../services";

import {translate} from "react-i18next";

class Provider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            telEmailModal: false,
            helpModal: false,
            issueModal: false,
        };
    }

    // Tel Mail Modal Setter
    setShowTelEmailModal = (show) => {
        this.setState({ telEmailModal: show });
    };

    hideTelEMailModal = () => this.setShowTelEmailModal(false);
    showTelEmailModal = () => this.setShowTelEmailModal(true);

    // Help Modal Setter
    setShowHelpModal = (show) => {
        this.setState({ helpModal: show });
    };

    hideHelpModal = () => this.setShowHelpModal(false);
    showHelpModal = () => this.setShowHelpModal(true);
    showLegalModal = () => this.setState({legalModal: true});
    hideLegalModal = () => this.setState({legalModal: false});
    showIssueModal = () => this.setState({issueModal: true});
    closeIssueModal = () => this.setState({issueModal: false});

    render() {
        return (
            <Context.Provider
                value={{
                    goToSuzuki: this.props.goToSuzuki,
                    goToSuzukiLogo: this.props.goToSuzukiLogo,
                    goToMaSuzuki: this.props.goToMaSuzuki,
                    goToFacebook: this.props.goToFacebook,
                    goToYoutube: this.props.goToYoutube,
                    goToInstagram: this.props.goToInstagram,
                    goToTermsOfService: this.props.goToTermsOfService,
                    showTelEmailModal: this.showTelEmailModal,
                    showHelpModal: this.showHelpModal,
                    showLegalModal: this.showLegalModal,
                    toggleIssueModal: this.showIssueModal,
                }}
            >
                {this.props.children}
                <TelEmailModal
                    onMailTo={this.props.onMailTo}
                    onPhone={this.props.onPhone}
                    phone={this.props.t("footer.hotline-phone")}
                    email={this.props.t("footer.hotline-email")}
                    visible={this.state.telEmailModal}
                    onRequestClose={this.hideTelEMailModal}
                />
                <HelpModal
                    onPhone={this.props.onPhone}
                    phone={this.props.t("footer.assist-phone")}
                    visible={this.state.helpModal}
                    onRequestClose={this.hideHelpModal}
                />
                <LegalModal
                    visible={this.state.legalModal}
                    onRequestClose={this.hideLegalModal}
                    email={this.props.email}
                    name={this.props.name}
                />
                <IssueModal
                    visible={this.state.issueModal}
                    onRequestClose={this.closeIssueModal}
                    email={this.props.email}
                    name={this.props.name}
                />
            </Context.Provider>
        );
    }
}

const connected = connect(
    (state) => ({
        email: UserInformationsUtils.getUserEmailFromState(state),
        name: UserInformationsUtils.getUserNameFromState(state),
    }),
    (dispatch) => ({
        goToSuzuki: () => dispatch(NavigationActioner.redirectTo(NavigationUtils.redirections.suzukifr)),
        goToSuzukiLogo: () => dispatch(NavigationActioner.redirectTo(NavigationUtils.redirections.suzukifr, "_blank")),
        goToMaSuzuki: () => dispatch(NavigationActioner.redirectTo(NavigationUtils.redirections.masuzukifr)),
        goToFacebook: () => dispatch(NavigationActioner.redirectTo(NavigationUtils.redirections.facebook, "_blank")),
        goToYoutube: () => dispatch(NavigationActioner.redirectTo(NavigationUtils.redirections.youtube, "_blank")),
        goToInstagram: () => dispatch(NavigationActioner.redirectTo(NavigationUtils.redirections.instagram, "_blank")),
        goToTermsOfService: () => dispatch(NavigationActioner.redirectTo(NavigationUtils.redirections.termsOfService, "_blank")),
        onMailTo: (email) => dispatch(NavigationActioner.onMailTo(email)),
        onPhone: (phone) => dispatch(NavigationActioner.onPhone(phone))
    })
)(Provider);

const translated = translate("common", { wait: true })(connected);
export { translated as Provider };
