import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Tooltip } from "../../Tooltip/index";

import "./Text.scss";
import { Icon, ICON_NAMES, Loader } from "../../";

export class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.initialValue,
            focused: props.focused,
        };
    }

    componentWillReceiveProps(props) {
        if (this.props.initialValue !== props.initialValue) this.setState({ value: props.initialValue });
    }

    focusInput = () => {
        this.setState({focused: true});
    };

    componentDidUpdate() {
        if(this.state.focused && !this.props.disabled){
            this.input.focus();
            this.setState({focused: false});
        }
    }

    isValid = (value) => {
        return value === "" || !this.props.figuresOnly || (this.props.figuresOnly && value.match(/^-?\d+\,?\d{0,2}$/));
    };

    onValueChanged = (e) => {
        if (this.props.disabled) return;
        if (this.props.type === "file") return this.onFileChanged(e);
        if (this.isValid(e.target.value)) {
            this.setState({ value: e.target.value });
            this.props.onValueChanged(e.target.value);
        } else return;
    };

    onValuePasted = (e) => {
        if (this.props.disallowPasting) e.preventDefault();
    }

    onFileChanged = (e) => {
        this.setState({ value: e.target.files });
        this.props.onValueChanged(e.target.files);
    };

    handleIconClick = () => {
        this.props.onIconClick();
    };

    render() {
        const {
            id,
            name,
            label,
            multi,
            large,
            largeLabel,
            isMobile,
            inputTooltip,
            addOn,
            placeholder,
            required,
            strongRequired,
            password,
            icon,
            transparent,
            error,
            errorMessage,
            disabled,
            type,
            boldLabel,
            maxlength,
            loading,
            pattern,
            isValid
        } = this.props;


        const textClasses = classnames({
            text: true,
            "with-icon": icon || boldLabel,
            "multi-input": multi,
            large: large,
            transparent: transparent,
            error: error,
        });

        const textWrapper = classnames({
            "text-wrapper": true,
            large: this.props.large
        });

        const labelClasses = classnames({
            "text-label": true,
            "is-required": required,
            "is-strong-required": strongRequired,
            "with-icon": icon || boldLabel,
            transparent: transparent,
            large: largeLabel,
            error: error
        });

        const inputClasses = classnames({
            "text-input": true,
            "with-icon": icon || boldLabel,
            disabled: disabled,
            large: this.props.large
        });

        const inputWrapperClasses = classnames({
            "text-input-wrapper": true,
            transparent: transparent,
            large: large,
            error: error,
            "input-tooltip": inputTooltip && !isMobile && !large
        });

        return (
            <div className={textClasses}>
                <label className={labelClasses}>{label}</label>
                <div className={textWrapper}>
                    <div className={inputWrapperClasses}>
                        <input
                            ref={(ip)=> this.input = ip}
                            disabled={disabled}
                            type={password ? "password" : type}
                            id={id}
                            name={name}
                            value={this.props.type === "file" ? undefined : this.state.value}
                            placeholder={placeholder}
                            className={inputClasses}
                            onChange={this.onValueChanged}
                            maxLength={maxlength}
                            onBlur={this.props.onBlur}
                            pattern={pattern}
                            min="0"
                            onPaste={this.onValuePasted}
                        />
                        {loading ? (
                            <span className={classnames({icon:true, "vehicle-form-loader": true})}><Loader className="vehicle-form-loader" size={18}/></span>                        ) : (
                            isValid ? (
                                <span className={classnames({icon:true})}>&#10004;</span>
                            ) : (
                                icon && <Icon color={"currentColor"} name={icon} size={this.props.iconSize} onClick={this.handleIconClick} />
                            )
                        )}
                    </div>
                    {inputTooltip && <Tooltip text={inputTooltip} size="37px"/>}
                    {addOn && <div className="text-input-wrapper-addon">{addOn}</div>}
                </div>
                <div>{this.props.children}</div>
                <span className={classnames({ "error-label": true, hide: !errorMessage })}>{errorMessage}</span>
            </div>
        );
    }
}

Text.defaultProps = {
    id: "0",
    name: "",
    initialValue: "",
    placeholder: "",
    errorMessage: "",
    inputTooltip: "",
    onIconClick: () => {},
    onValueChanged: () => {},
    disallowPasting: false,
    onBlur: () => {},
    required: false,
    disabled: false,
    password: false,
    boldLabel: false,
    type: "text",
    figuresOnly: false,
    error: false,
    maxlength: null,
    iconSize: "26px"
};

Text.propTypes = {
    id: PropTypes.string,
    maxlength: PropTypes.number,
    name: PropTypes.string,
    initialValue: PropTypes.string,
    inputTooltip: PropTypes.string,
    placeholder: PropTypes.string,
    onValueChanged: PropTypes.func,
    disallowPasting: PropTypes.bool,
    onBlur: PropTypes.func,
    onIconClick: PropTypes.func,
    required: PropTypes.bool,
    password: PropTypes.bool,
    disabled: PropTypes.bool,
    figuresOnly: PropTypes.bool,
    iconSize: PropTypes.string
};
