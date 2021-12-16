import React, { Component } from "react";
import * as classnames from "classnames";
import PropTypes from "prop-types";
import { SpinLoader } from "react-loaders-spinners";

import "./Loader.scss";

export class Loader extends Component {
    render() {
        const { center } = this.props;
        return (
            <div className={classnames({"loader-center": center})}>
                <SpinLoader width={this.props.size || 30} height={this.props.size || 30} thickness={4} />
            </div>
        );
    }
}

Loader.defaultProps = {
    center: false,
};

Loader.propTypes = {
    center: PropTypes.bool,
};
