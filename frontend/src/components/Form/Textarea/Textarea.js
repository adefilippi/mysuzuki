import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./Textarea.scss";

export class Textarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue,
    };
  }

  componentWillReceiveProps(props) {
      if (this.props.initialValue !== props.initialValue) this.setState({ value: props.initialValue });
  }

  onValueChanged = (e) => {
    this.setState({ value: e.target.value });
    this.props.onValueChanged(e.target.value);
  };

  render() {
    const { id, name, label, cols, rows, placeholder, required, transparent, error } = this.props;

    const textareaClasses = classnames({
      textarea: true,
      transparent: transparent
    });

    const labelClasses = classnames({
      "textarea-label": true,
      transparent: transparent,
      "is-required": required,
      error: error
    });

    const inputClasses = classnames({
      "textarea-input": true,
      transparent:  !error && transparent,
      error: error
    });

    return (
      <div className={textareaClasses}>
        <label className={labelClasses}>{label}</label>
        <textarea id={id} name={name} value={this.state.value} placeholder={placeholder} className={inputClasses} onChange={this.onValueChanged} />
      </div>
    );
  }
}

Textarea.defaultProps = {
  id: "0",
  name: "",
  initialValue: "",
  placeholder: "",
  onValueChanged: () => {},
  required: false,
  cols: "50",
  rows: "5"
};

Textarea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  onValueChanged: PropTypes.func,
  required: PropTypes.bool,
  cols: PropTypes.string,
  error: PropTypes.bool,
  rows: PropTypes.string
};
