import React, { Component } from "react";
import classnames from "classnames";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import { DeviceContextConsumer, Select } from "../../../../../../../components";
import { PATHS } from "../../../../../../../routes";

import "./ArticleNavSelect.scss";

class ArticleNavSelect extends Component {

    getCurrentOptionLabel = currentPath => {
        let currentOption = "ROOT";
        Object.keys(PATHS.ARTICLES).map((category, index) => {
            if (PATHS.ARTICLES[category] === currentPath) {
                currentOption = category;
                return;
            };
        });
       return this.props.t(`navBar.${currentOption.toLowerCase()}`);
    };

    getArticleOptions = () => {
        let options = [];
        Object.keys(PATHS.ARTICLES).map((category, index) => {
            options.push({value: PATHS.ARTICLES[category], label: this.props.t(`navBar.${category.toLowerCase()}`)});
        });
        return options;
    };

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isTablet }) => {
                    const responsive = { mobile: isMobile, tablet: isTablet };
                    const currentOptionValue = this.props.currentPath;
                    const currentOptionLabel = this.getCurrentOptionLabel(this.props.currentPath);

                    return (
                        <div className="article-nav-select">
                            <Select
                                initialOption={{ value: currentOptionValue, label: currentOptionLabel }}
                                simple
                                isLink
                                options={this.getArticleOptions()}
                                onOptionChanged={this.props.onOptionChanged}
                            />
                        </div>
                    )
                }}
            </DeviceContextConsumer>
        );
    };
}

ArticleNavSelect.propTypes = {
};

const translatedArticleNavSelect = translate("articles", {wait:true})(ArticleNavSelect);
export { translatedArticleNavSelect as ArticleNavSelect };
