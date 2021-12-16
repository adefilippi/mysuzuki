import React, { Component } from "react";
import { Header } from "../components";
import { ContainerContextConsumer, DeviceContextConsumer } from "../../contexts";
import "./FooterLessContainer.scss";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { AuthenticationUtils } from "../../../services/Authentication";
import { UserInformationsUtils } from "../../../services/User/Informations";
import classnames from "classnames";

class FooterLessContainer extends Component {
    render() {
        return (
            <ContainerContextConsumer>
                {({ goToSuzuki, goToSuzukiLogo, showTelEmailModal, showHelpModal }) => (
                    <DeviceContextConsumer>
                        {({ isMobile }) => (
                            <div className="app-footerless-container">
                                <Header onBackToSuzukiClick={goToSuzuki} onLogoToSuzukiClick={goToSuzukiLogo}
                                        onAfterSaleHotlineClick={showTelEmailModal} onHelpClick={showHelpModal}
                                        isBackgroundWhite={this.props.isBackgroundWhite}/>
                                <div className="app-footerless-content">
                                    {this.props.children}
                                </div>
                                <div className="app-footerless-bottom-bar"/>
                            </div>
                        )}
                    </DeviceContextConsumer>
                )}
            </ContainerContextConsumer>
        );
    }
}

FooterLessContainer.propTypes = {};

const ReduxConnectedFooterLessContainer = connect(
    (state) => ({
        Serial: state.SignUpProcess.Serial,
        isAuthenticated: AuthenticationUtils.isAuthenticated(state),
        hasCompletedTheSignUp: UserInformationsUtils.hasUserCompleteSignUpFromState(state)
    }),
    (dispatch) => ({})
)(FooterLessContainer);
const TranslatedConnectedFooterLessContainer = translate("home", { wait: true })(ReduxConnectedFooterLessContainer);
export { TranslatedConnectedFooterLessContainer as FooterLessContainer };
