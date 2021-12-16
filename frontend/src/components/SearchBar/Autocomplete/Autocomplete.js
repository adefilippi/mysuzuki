import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Icon, ICON_NAMES } from "../../Icon/index.js";
import { translate } from "react-i18next";
import "./Autocomplete.scss";

class Autocomplete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.initialValue,
            options: props.options,
            searchKey: props.searchKey,
            isOpen: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.options !== this.props.options) {
            this.setState({ options: nextProps.options });
        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside, true);
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value, isOpen: e.target.value.length >= 0 });
    };

    setValue = (value) => {
        if (this.refs.INPUT) this.refs.INPUT.value = value;
    };

    filterResult = (filter = '') => {
        return this.state.options.filter((option) => {
            if (
                !filter.length || (filter.length && option[this.state.searchKey].toLowerCase().indexOf(filter.toLowerCase()) > -1)
            ) return option;
        });
    };

    isClosed = () => {
        return this.state.searchKey.length > 0 && this.state.isOpen;
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
        return (
            <div className="autocomplete">
                <label className="select-label">
                    {this.props.t("autocomplete.equipmentFilter")}
                </label>

                <div className={classnames({ 'autocomplete__input': true })}>
                    <input
                        ref="INPUT"
                        type="text"
                        placeholder={this.props.placeholder}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        onFocus={this.handleChange}
                    />
                    <Icon color={"#003145"} size={this.props.large ? "32px" : "25px"} name={ICON_NAMES.SEARCH} />
                </div>

                {this.isClosed() ? 
                    <div className="autocomplete__options">
                        {this.filterResult(this.state.value).map((option, key) => {
                            return (
                                <div 
                                    key={key}
                                    className={classnames({ "autocomplete__options__button": true })} 
                                    onClick={(e) => (
                                        this.props.filterOptions(option[this.state.searchKey])
                                    )}
                                >
                                    <p>{option[this.state.searchKey]}</p>
                                </div>
                            )
                        })}
                    </div> 
                    : null
                }
            </div>
        );
    }
}

Autocomplete.defaultProps = {
    initialValue: "",
    options: [],
    searchKey: "",
    onSearchChange: () => {}
};

Autocomplete.propTypes = {
    initialValue: PropTypes.string,
    options: PropTypes.array,
    searchKey: PropTypes.string,
    onSearchChange: PropTypes.func
};

const translatedEnhancedAutocomplete = translate("search", { wait: true })(Autocomplete);

export { translatedEnhancedAutocomplete as Autocomplete };