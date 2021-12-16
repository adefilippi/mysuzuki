import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from 'react-router-dom';
import "../Select.scss";
import { Icon, ICON_NAMES, DeviceContextConsumer } from "../../..";

export class Select extends Component {
    constructor(props) {
        super(props);
        const initial = typeof props.initialOption === 'object' ?
            props.initialOption :
            props.options.find(function (el) {return el.value === props.initialOption;})
        ;
        this.state = {
            selectedOption: initial || {},
            isOpen: false,
            updated: initial,
        };
    }

    componentDidUpdate() {
        const { props, state } = this;
        const initialOption = props.options.find(function (el) {
            return el.value === props.initialOption || el.value === props.initialOption.value;
        });
        if (!state.updated && initialOption) {
            this.setState({selectedOption: initialOption, updated:true});
        }
    }

    handleOptionClick = (option) => {
        this.setState({ selectedOption: option, isOpen: false });
        this.props.onOptionChanged(option);
    };

    handleDropDownClick = () => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    };

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTablet }) => {
                    const { isOpen } = this.state;
                    const {
                        valueKey,
                        labelKey,
                        label,
                        required,
                        dark,
                        large,
                        error,
                    } = this.props;
                    const icon = ICON_NAMES.ARROW_DOWN;

                    const labelClasses = classnames({
                        "select-label": true,
                        "is-required": required
                    });

                    const responsive = { mobile: isMobile, "mobile-small": isMobileSmall, tablet: isTablet };

                    return (
                        <div
                            className={classnames({
                                select: true,
                                dark,
                                large,
                                error,
                            })}
                        >
                            <label className={labelClasses}>{label}</label>
                            <div
                                className={classnames({
                                    "select-input-wrapper": true,
                                    dark: this.props.dark,
                                    simple: this.props.simple,
                                    large: this.props.large,
                                    ...responsive
                                })}
                                onClick={this.handleDropDownClick}
                            >
                                <div className="select-input">{this.state.selectedOption.label}</div>
                                <Icon name={icon} size={"16"} rotable={isOpen} color={!this.props.dark && !this.props.simple ? "white" : "#003145"} />
                            </div>
                            <div className="select-options-wrapper">
                                <div className={classnames({"select-options": true, isVisible: isOpen, simple: this.props.simple})}>
                                    { this.props.options.map((option) => (
                                        this.props.isLink ? (
                                            <Link to={option[valueKey]} key={option[valueKey]} className="select-option-link" onClick={() => this.handleOptionClick(option)}>
                                                {option[labelKey]}
                                            </Link>
                                        ) : (
                                            <div key={option[valueKey]} className="select-option" onClick={() => this.handleOptionClick(option)}>
                                                {option[labelKey]}
                                            </div>
                                        )

                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

Select.defaultProps = {
    initialOption: {},
    label: "",
    valueKey: "value",
    labelKey: "label",
    options: [],
    dark: false,
    error: false,
};

Select.propTypes = {
    label: PropTypes.string,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string,
    options: PropTypes.array,
    dark: PropTypes.bool
};
