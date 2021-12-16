import React, { Component } from "react";
import { RadioChoice } from "./components";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./Radio.scss";

export class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: props.initialChoice,
    };
  }

  handleChange = (id) => {
    this.setState({ choice: id });
    this.props.onOptionChange(id);
  };

  render() {

      const labelClasses = classnames({
          "radio-group-label": true,
          "is-required": this.props.required,
          error: this.props.error
      });

      return (
          <div className="radio-group">
              {this.props.label && (
                  <label className={labelClasses}>{this.props.label}</label>
              )}
              <div className={classnames({"radio-group-choices": true, inline: this.props.inline})}>
                  {this.props.choices.map((choice, id) => {
                      return <RadioChoice key={id} label={choice.label} id={id} value={id === this.state.choice} onValueChanged={this.handleChange} hasError={this.props.error}/>;
                  })}
              </div>
              <span className={classnames({"error-label": true, hide: this.props.errorMessage})}>{this.props.errorMessage}</span>
          </div>
      );
  }
}

Radio.defaultProps = {
  choices: [],
  onOptionChange: () => {},
  initialChoice: null,
  errorMessage: "",
  error: false,
};

Radio.propTypes = {
  choices: PropTypes.array,
  onOptionChange: PropTypes.func,
  initialChoice: PropTypes.number,
  errorMessage: PropTypes.string,
  error: PropTypes.bool
};
