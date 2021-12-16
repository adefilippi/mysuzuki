import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, ICON_NAMES } from "../../";
import { PasswordInputStrength } from "./components/index";
import "./PasswordInput.scss";
import classnames from "classnames";

export class PasswordInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.initialValue,
            isVisible: true
        };
    }

    onValueChanged = (value) => {
        this.setState({ value: value });
        this.props.onValueChanged(value);
    };

    handlePasswordClick = () => {
        this.setState((prevState) => ({ isVisible: !prevState.isVisible }));
    };

    render() {
        const { id, name, label, placeholder, required, transparent, large, error, errorMessage, newPassword } = this.props;

        return (
            <div className="password-input">
                <Text
                    password={this.state.isVisible}
                    id={id}
                    name={name}
                    label={label}
                    large={large}
                    placeholder={placeholder}
                    onValueChanged={this.onValueChanged}
                    onIconClick={this.handlePasswordClick}
                    initialValue={this.state.value}
                    icon={ICON_NAMES.LOOK}
                    required={required}
                    transparent={transparent}
                    error={error}
                    errorMessage={errorMessage}
                >
                    { newPassword && <PasswordInputStrength initialValue={this.state.value} /> }
                </Text>
            </div>
        );
    }
}

PasswordInput.defaultProps = {
    disabled: false,
    id: "0",
    name: "",
    initialValue: "",
    placeholder: "",
    errorMessage: "",
    newPassword: true,
    error: false,
    onValueChanged: () => {},
    required: false
};

PasswordInput.propTypes = {
    disabled: PropTypes.bool,
    newPassword: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    initialValue: PropTypes.string,
    placeholder: PropTypes.string,
    onValueChanged: PropTypes.func,
    required: PropTypes.bool
};
