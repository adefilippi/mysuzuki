import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Text, Button, Loader, IssueModal } from "../../../../../components";
import { connect } from "react-redux";
import "./SignIn.scss";
import classnames from "classnames";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      issueModal: false,
    };
  }

  onChange = (values) => {
      this.setState(values, () => this.props.onChange(this.state));
  };

  showIssueModal = () => this.setState({issueModal: true});
  closeIssueModal = () => this.setState({issueModal: false});

  render() {
    const { errors } = this.props;
    let claimMessage = <span className="error-span__link" onClick={this.showIssueModal}>Faire une réclamation</span>;
    let errorMessage = <span>{this.props.t(errors.message)} {errors.message === "error.login.disabled" ? claimMessage : ''}</span>;

    return (
      <div className="sign-in">
        <h2 className="sign-in-title">{this.props.t("signInTitle")}</h2>
        <Text id="signInEmail" name="email" label={this.props.t("signInEmail")} onValueChanged={(v) => {this.onChange({email: v})}} error={errors.email} />
        <Text id="signInPassword" name="mdp" label={this.props.t("signInPW")} password onValueChanged={(v) => this.onChange({password: v})} error={errors.password} />
        <div className="sign-up-serial-error-container">
           <span className={classnames({"error-span":true, hide:!errors.global})}>{errorMessage}</span>
        </div>
      <div className="homepage-btn-position">
            <Button simple onClick={this.props.onForgotPassword} label={this.props.t("signInForgotPW")} />
            { this.props.SignIn.get("loading") ? (
                <div className="flex-justify-center homepage-loader"><Loader size={25}/></div>
            ) : (
                <Button type="submit" disabled={!this.state.password || !this.state.email} whiteSecondary shrink label={this.props.t("signInButton")} />
            )}
        </div>
        <IssueModal
          visible={this.state.issueModal}
          onRequestClose={this.closeIssueModal}
        />
      </div>
    );
  }
}

SignIn.defaultProps = {
    onForgotPassword: () => {},
    onChange: () => {},
    errors: {}
};

SignIn.propTypes = {
  onForgotPassword: PropTypes.func,
  onChange: PropTypes.func,
};

const ReduxConnectedComponent = connect(
    (state) => ({
        SignIn: state.SignIn
    }),
    (dispatch) => ({})
)(SignIn);

const TranslatedSignIn = translate("home", { wait: true })(ReduxConnectedComponent);
export { TranslatedSignIn as SignIn };
