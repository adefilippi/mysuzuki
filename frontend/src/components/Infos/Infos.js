import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import "./Infos.scss";

export class Infos extends Component {
    render() {
        const { inline } = this.props;
        return (
            <p className={classnames({"infos-entry": true, inline: inline})}>
                <span className={classnames({"infos-entry-title": true, inline: inline})}>{this.props.title}</span>
                { this.props.text && <span className={classnames({"infos-entry-text": true, inline: inline})}>{this.props.text}</span> }
            </p>
        );
    }
}


Infos.defaultProps = {
    title: "",
    text: "",
    inline: false
};

Infos.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    inline: PropTypes.bool
};
