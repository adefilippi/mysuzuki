import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Context, getContextValue } from "./context";

class Provider extends Component {
    render() {
        return (
            <MediaQuery maxWidth={375}>
                {(isMobileSmall) => (
                    <MediaQuery maxWidth={640}>
                        {(isMobile) => (
                            <MediaQuery minWidth={641} maxWidth={832}>
                                {(isTabletPortrait) => (
                                    <MediaQuery minWidth={833} maxWidth={1024}>
                                        {(isTabletLandscape) => (
                                            <MediaQuery minWidth={641} maxWidth={1024} >
                                                {(isTablet) => (
                                                    <Context.Provider
                                                        value={getContextValue({
                                                            isMobileSmall,
                                                            isMobile,
                                                            isTabletPortrait,
                                                            isTabletLandscape,
                                                            isTablet
                                                        })} >
                                                        {this.props.children}
                                                    </Context.Provider>
                                                )}
                                            </MediaQuery>
                                        )}
                                    </MediaQuery>
                                )}
                            </MediaQuery>
                        )}
                    </MediaQuery>
                )}
            </MediaQuery>
        );
    }
}

export { Provider };
