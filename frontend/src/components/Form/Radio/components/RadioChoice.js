import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./RadioChoice.scss";

export class RadioChoice extends Component {
  handleChange = (e) => {
    this.props.onValueChanged(this.props.id, e.target.value === "on" ? true : false);
  };

  render() {
    const { label } = this.props;
    return (
      <div className="radio">
        <input id={`radio-${this.props.id}`} type="radio" checked={this.props.value} onChange={this.handleChange} />
        <label htmlFor={`radio-${this.props.id}`} className={classnames({"radio-label": true, error: this.props.hasError})} >
          {label}
        </label>
      </div>
    );
  }
}

RadioChoice.defaultProps = {
  disabled: false,
  onValueChanged: () => {},
  value: false,
  label: "",
  id: 0,
};

RadioChoice.propTypes = {
  disabled: PropTypes.bool,
  onValueChanged: PropTypes.func,
  value: PropTypes.bool,
  label: PropTypes.string,
  id: PropTypes.number,
};
