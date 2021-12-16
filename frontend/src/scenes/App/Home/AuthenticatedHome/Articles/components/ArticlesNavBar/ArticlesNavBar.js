import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { ArticlesNavBarTab } from "./ArticlesNavBarTab";
import { DeviceContextConsumer } from "../../../../../../../components";
import { PATHS } from "../../../../../../../routes";

import "./ArticlesNavBar.scss";

class ArticlesNavBar extends Component {

    isActiveCategory = category => {
        return this.props.currentPath && ( this.props.currentPath === PATHS.ARTICLES[category] )
    };

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isTablet }) => {
                    const responsive = { mobile: isMobile, tablet: isTablet };
                    return (
                        <div className={classnames({"articles-nav-bar": true, ...responsive })}>
                            {Object.keys(PATHS.ARTICLES).map((category, index) => (
                                <ArticlesNavBarTab
                                    key={category}
                                    category={category}
                                    active={this.isActiveCategory(category)}
                                    onOptionChanged={this.props.onOptionChanged}
                                />
                            ))}
                        </div>
                    )
                }}
            </DeviceContextConsumer>
        );
    };
}

ArticlesNavBar.propTypes = {
    currentCategory: PropTypes.string
};

export { ArticlesNavBar };
