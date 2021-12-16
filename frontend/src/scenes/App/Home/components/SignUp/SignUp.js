import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Button } from "../../../../../components";
import "./SignUp.scss";

class SignUp extends Component {
  render() {
    return (
      <div className="sign-up">
        <h2 className="sign-up-title">{this.props.t("signUpTitle")}</h2>
        <div className="sign-up-content">
          <p className="sign-up-thin">{this.props.t("signUpText")}</p>
          <div className="sign-up-separator" />
          <p className="sign-up-bold">
            <span className="add-colon">{this.props.t("signUpInfo")}</span><br/>
            {this.props.t("signUpInfo2")}
          </p>
        </div>
        <Button whiteSecondary shrink onClick={this.props.onSignUp} label={this.props.t("signUpButton")} />
      </div>
    );
  }
}

SignUp.defaultProps = {
  onSignUp: () => {},
};

SignUp.propTypes = {
  onSignUp: PropTypes.func,
};

const TranslatedSignUp = translate("home", { wait: true })(SignUp);
export { TranslatedSignUp as SignUp };
