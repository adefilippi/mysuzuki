import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { translate } from "react-i18next";
import "../Select.scss";
import { Icon, ICON_NAMES } from "../../..";

class MultipleSelect extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selectedOptions: props.selectedOptions || [],
            isOpen: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.selectedOptions !== this.props.selectedOptions) {
            this.setState({ selectedOptions: nextProps.selectedOptions });
        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside, true);
    }

    handleOptionClick = ({value, label}) => {
        let selectedOptions = this.state.selectedOptions;

        const index = selectedOptions.indexOf(label);
        
        index > -1 ? selectedOptions.splice(index, 1) : selectedOptions.push(label);

        this.setState({selectedOptions});
        this.props.filterOptions({options: selectedOptions});
    };

    selectAll = () => {
        const selectedOptions = this.toggleOption();
        
        this.setState({selectedOptions});
        this.props.filterOptions({options: selectedOptions});
    };
    
    toggleOption = () => {
        let selectedOptions = this.state.selectedOptions;

        if (selectedOptions.length === this.props.options.length) return [];
        
        this.props.options.forEach((option) => {
            if (selectedOptions.indexOf(option[this.props.labelKey]) === -1) {
                selectedOptions.push(option[this.props.labelKey]);
            }
        });

        return selectedOptions;
    };

    handleDropDownClick = () => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    };

    handleClickOutside = (event) => {
        const domNode = ReactDOM.findDOMNode(this);
    
        if (!domNode || !domNode.contains(event.target)) {
            this.setState({
                isOpen: false
            });
        }
    };

    render() {
        const { isOpen, selectedOptions } = this.state;
        const {
            valueKey,
            labelKey,
            label,
            required,
            dark,
            large,
            error,
            options,
            simple
        } = this.props;
        const icon = ICON_NAMES.ARROW_DOWN;

        const labelClasses = classnames({
            "select-label": true,
            "is-required": required
        });

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
                        dark: dark,
                        simple: simple,
                        large: large,
                    })}
                    onClick={this.handleDropDownClick}
                >
                    <div className="select-input select-input--multiple">
                        {!!selectedOptions.length && selectedOptions.map((label, key) => (
                            <span className="select-input__item" key={key}>{label}</span>
                        ))}
                    </div>
                    <Icon name={icon} size={"16"} rotable={isOpen} color={!dark && !simple ? "white" : "#003145"} />
                </div>
                <div className="select-options-wrapper">
                    <div className={classnames({"select-options": true, isVisible: isOpen, simple: simple})}>
                        <div className="select-option" onClick={() => this.selectAll()}>
                            <span 
                                className={classnames({
                                    "select-option__check": true,
                                    "select-option__check--checked": !!selectedOptions.length && selectedOptions.length === options.length,
                                })}
                            ></span>
                            {this.props.t("selectAll")}
                        </div>
                        
                        {options.map((option, key) => (
                            <div 
                                key={key} 
                                className="select-option" 
                                onClick={() => {
                                    this.handleOptionClick({
                                        value: option[valueKey], 
                                        label: option[labelKey],
                                    });
                                }}
                            >
                                <span 
                                    className={classnames({
                                        "select-option__check": true,
                                        "select-option__check--checked": !!selectedOptions.length && selectedOptions.indexOf(option[labelKey]) > -1,
                                    })}
                                ></span>
                                {option[labelKey]}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

MultipleSelect.defaultProps = {
    label: "",
    valueKey: "value",
    labelKey: "label",
    selectedOptions: [],
    options: [],
    dark: true,
    error: false,
};

MultipleSelect.propTypes = {
    label: PropTypes.string,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string,
    selectedOptions: PropTypes.array,
    options: PropTypes.array,
    dark: PropTypes.bool
};

const translatedEnhancedMultipleSelect = translate("common", { wait: true })(MultipleSelect);

export { translatedEnhancedMultipleSelect as MultipleSelect };
