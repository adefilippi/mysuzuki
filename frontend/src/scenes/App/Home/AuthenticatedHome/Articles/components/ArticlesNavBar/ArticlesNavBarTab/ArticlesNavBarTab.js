import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import moment from "moment";
import { translate } from "react-i18next";
import { DeviceContextConsumer } from "../../../../../../../../components";
import { PATHS } from "../../../../../../../../routes";
import { APIUtils } from "../../../../../../../../services";

import PropTypes from "prop-types";
import "./ArticlesNavBarTab.scss";

class ArticlesNavBarTab extends Component {
    render() {
        return(
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTablet }) => {
                    const responsive = { mobile: isMobile, "mobile-small": isMobileSmall, tablet: isTablet };
                    return (
                        <Link to={PATHS.ARTICLES[this.props.category]} onClick={() => this.props.onOptionChanged({ value: PATHS.ARTICLES[this.props.category]})}>
                            <div className={classnames({"articles-nav-bar-tab": true, active: this.props.active, ...responsive})}>
                                { this.props.t(`navBar.${this.props.category.toLowerCase()}`) }
                            </div>
                        </Link>
                    )
                }}
            </DeviceContextConsumer>
        )
    }
}

ArticlesNavBarTab.propTypes = {};

const TranslatedArticlesNavBarTab = translate("articles", { wait: true })(ArticlesNavBarTab);
export { TranslatedArticlesNavBarTab as ArticlesNavBarTab };
