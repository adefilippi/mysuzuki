import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Footer } from "../components";
import { ContainerContextConsumer } from "../../contexts";
import "./Container.scss";

export class Container extends Component {
    render() {
        return (
            <ContainerContextConsumer>
                {({
                    goToSuzuki,
                    goToSuzukiLogo,
                    goToMaSuzuki,
                    goToFacebook,
                    goToYoutube,
                    goToInstagram,
                    goToTermsOfService,
                    showTelEmailModal,
                    showHelpModal,
                    showLegalModal,
                    toggleIssueModal,
                    isBackgroundWhite
                }) => (
                    <div className="app-container">
                        <Header
                            onBackToSuzukiClick={goToSuzuki}
                            onLogoToSuzukiClick={goToSuzukiLogo}
                            onAfterSaleHotlineClick={showTelEmailModal}
                            onHelpClick={showHelpModal}
                            isBackgroundWhite={isBackgroundWhite}
                        />
                        <div className="app-content">
                            {
                                typeof this.props.children === "function"
                                    ? this.props.children({showHelpModal})
                                    : this.props.children
                            }
                        </div>
                        <Footer
                            isAuthenticated={this.props.isAuthenticated}
                            onAfterSaleHotlineClick={showTelEmailModal}
                            onHelpClick={showHelpModal}
                            onFBClick={goToFacebook}
                            onInstaClick={goToInstagram}
                            onYTClick={goToYoutube}
                            onBikePersonalSpaceClick={goToMaSuzuki}
                            onLegalClick={goToTermsOfService}
                            toggleIssueModal={toggleIssueModal}
                        />
                    </div>
                )}
            </ContainerContextConsumer>
        );
    }
}

Container.defaultProps = {
    isAuthenticated: false
};

Container.propTypes = {
    isAuthenticated: PropTypes.bool
};
