import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./Checkbox.scss";

export class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.initialValue,
            textLabel: props.textLabel,
        };
    }

    componentWillReceiveProps(props) {
        if (props.initialValue !== this.props.initialValue) this.setState({ value: props.initialValue });
    }

    handleChange = (e) => {
        this.setState({ value: e.target.checked });
        this.props.onValueChanged(e.target.checked);
    };

    render() {
        const { label, border, error, link } = this.props;
        return (
            <div className={classnames({ checkbox: true, border, error})}>
                <input
                    id={this.props.id}
                    type="checkbox"
                    value={this.state.value}
                    onChange={this.handleChange}
                    checked={this.state.value}
                />
                <label
                    htmlFor={this.props.id}
                    className={classnames({
                        'checkbox-label': true,
                        'text-label': this.state.textLabel,
                        'transparent': this.state.textLabel,
                    })}>
                    {link ?
                        <a href={link} target="_blank" dangerouslySetInnerHTML={{__html: label}}></a>
                        :
                        label
                    }
                </label>
            </div>
        );
    }
}

Checkbox.defaultProps = {
    disabled: false,
    initialValue: false,
    onValueChanged: () => {},
    label: "",
    id: "0",
    error: false,
    link: null,
};

Checkbox.propTypes = {
    disabled: PropTypes.bool,
    onValueChanged: PropTypes.func,
    initialValue: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    id: PropTypes.string,
    error: PropTypes.bool,
};
