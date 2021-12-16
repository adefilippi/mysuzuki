import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Icon, ICON_NAMES } from "../../Icon/index.js";
import "./SearchBar.scss";

export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.initialValue
        };
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    };

    handleClick = (e) => {
        this.props.onSearchChange(this.state.value);
    };

    handleKeyDown = (e) => {
        if (e.keyCode == 13) {
            this.handleClick();
        }
    };

    setValue = (value) => {
        if (this.refs.INPUT) this.refs.INPUT.value = value;
    };

    handleFocus = () => {
        if (this.refs.INPUT) {
            this.refs.INPUT.value = "";
            this.refs.INPUT.placeholder = "";
        } else return;
    }

    render() {
        return (
            <div className={classnames({ searchbar: true, large: this.props.large })}>
                <input ref="INPUT" type="text" onFocus={this.handleFocus} className="searchbar-input" placeholder={this.props.placeholder} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
                <Icon color={"#003145"} size={this.props.large ? "32px" : "25px"} name={ICON_NAMES.SEARCH} onClick={this.handleClick} />
            </div>
        );
    }
}

SearchBar.defaultProps = {
    initialValue: "",
    onSearchChange: () => {}
};

SearchBar.propTypes = {
    initialValue: PropTypes.string,
    onSearchChange: PropTypes.func
};
