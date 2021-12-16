import React, { Component } from "react";
import { translate } from "react-i18next";
import { PATHS } from "../../../routes";
import { DeviceContextConsumer, FooterLessContainer } from "../../../components";
import { SendLink, UpdatePassword } from "./components";

import "./Scene.scss";

class Scene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.token
        };
    }

    goToHome = () => {
        this.props.history.push(PATHS.ROOT);
    };

    goToForgotPassword = () => {
        this.setState({token: null}, () => this.props.history.push(PATHS.FORGOT_PASSWORD));
    };

    componentDidMount() {
        const token = this.props.location.search.match('token=([^&# ]*)')
          && this.props.location.search.match('token=([^&# ]*)')[1]
        this.setState({ token });
    }

    render() {
        const {
            token,
        } = this.state;

        return (
            <FooterLessContainer>
                <DeviceContextConsumer>
                    {({ isMobile, isTablet }) => {
                        return (
                             token ?  (
                                 <UpdatePassword
                                     isMobile={isMobile}
                                     isTablet={isTablet}
                                     token={token}
                                     requestPassword={this.goToForgotPassword}
                                     goToHome={this.goToHome}
                                 />
                             ) : (
                                 <SendLink
                                     isMobile={isMobile}
                                     isTablet={isTablet}
                                     goToHome={this.goToHome}
                                 />
                             )
                        );
                    }}
                </DeviceContextConsumer>
            </FooterLessContainer>
        );
    }
}

Scene.propTypes = {};
Scene.defaultProps = {
    token: () => window.location.search.match('token=([^&# ]*)') && window.location.search.match('token=([^&# ]*)')[1]
};

const TranslatedConnectedScene = translate("common", { wait: true })(Scene);
export { TranslatedConnectedScene as Scene };
