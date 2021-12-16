import React, { Component } from "react";
import PropTypes from "prop-types";
import "./PasswordInputStrength.scss";
import zxcvbn from "zxcvbn";

const PASSWORD_STRENGTH_LEVELS = {
  weak: "très faible",
  poor: "faible",
  good: "moyen",
  strong: "fort",
};

export class PasswordInputStrength extends Component {
  passwordScore = (password) => {
    const passwordSecurity = zxcvbn(password, []);
    if (password.length == 0) {
      return "";
    } else {
      switch (passwordSecurity.score) {
        case 0:
          return "weak";
        case 1:
          return "poor";
        case 2:
          return "good";
        case 3:
          return "strong";
        case 4:
          return "strong";
      }
    }
  };

  render() {
    const securityLevel = this.passwordScore(this.props.initialValue);
    let classes = "password-strength-bar ";
    classes += securityLevel;

    return (
      <div className={`password-strength ${this.props.initialValue ? '' : 'empty'}`}>
        <div className={classes}>{PASSWORD_STRENGTH_LEVELS[securityLevel]}</div>
      </div>
    );
  }
}

PasswordInputStrength.defaultProps = {
  initialValue: "",
};

PasswordInputStrength.propTypes = {
  initialValue: PropTypes.string,
};
