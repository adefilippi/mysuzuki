import React, { Component } from 'react';
import './RegisterForm.scss';
import { Button, Text, Loader } from '../..';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import {
  FormUtils,
  Validators,
  AuthenticationUtils,
  UserInformationsActioner,
} from '../../../services';

class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      errors: {
        email: null,
        landlinePhone: null,
        mobilePhone: null,
        street: null,
        zipCode: null,
        city: null,
      },
      errorMessage: {
        email: '',
        landlinePhone: '',
        mobilePhone: '',
        street: '',
        zipCode: '',
        city: '',
      },
      form: {
        email: props.user.email ? props.user.email : '',
        landlinePhone: props.user.landlinePhone ? props.user.landlinePhone : '',
        mobilePhone: props.user.mobilePhone ? props.user.mobilePhone : '',
        address: {
          street: props.user.address.street || '',
          zipCode: props.user.address.zipCode || '',
          city: props.user.address.city || '',
          additional1: props.user.address.additional1 || '',
          additional2: props.user.address.additional2 || '',
        }
      },
      validators: {
        email: Validators.notBlank,
      }
    }
  };

  submit = (event) => {
    event.preventDefault();
    const { form, validators } = this.state;
    const { user } = this.props;

    FormUtils.checkErrors({ form, validators }, this).then(() => {
      this.props.submit({...user, ...form})
        .then(() => {
          this.setState({ submitting: false });
          this.props.nextAction();
        })
        .catch(() => {
          this.setState({ submitting: false });
        });
    }).catch(() => {
      this.setState( {submitting: false })
    });
  };

  render = () => {
    const { form, errors } = this.state;

    return (
      <form onSubmit={this.submit}>
        {this.props.askForPhone && (
          <div>
            <Text
              transparent
              large
              strongRequired
              type="tel"
              initialValue={form.landlinePhone}
              label={this.props.t("registerForm.field.landlinePhone")}
              onValueChanged={(v) => this.setState({ form: {...form, landlinePhone: v }})}
              error={errors.landlinePhone || errors.phones}
              errorMessage={errors.landlinePhone ? this.props.t("errors.landlinePhoneError"): ""}
            />
            <Text
              transparent
              large
              strongRequired
              type="tel"
              initialValue={form.mobilePhone}
              label={this.props.t("registerForm.field.mobilePhone")}
              onValueChanged={(v) => this.setState({ form: {...form, mobilePhone: v }})}
              error={errors.mobilePhone || errors.phones}
              errorMessage={errors.mobilePhone ? this.props.t("errors.mobilePhoneError"): (errors.phones ? this.props.t("errors.phonesError"): "")}
            />
          </div>
        )}

        {this.props.askForAddress && (
          <div>
            <Text
              transparent
              large
              strongRequired
              type="text"
              initialValue={form.address.street}
              label={this.props.t("registerForm.field.street")}
              onValueChanged={(v) => this.setState({ form: {...form, address: {...form.address, street: v} }})}
              error={errors.street || errors.address}
              errorMessage={errors.street ? this.props.t("errors.streetError"): ""}
            />
            <Text
              transparent
              large
              strongRequired
              type="text"
              initialValue={form.address.zipCode}
              label={this.props.t("registerForm.field.zipCode")}
              onValueChanged={(v) => this.setState({ form: {...form, address: {...form.address, zipCode: v} }})}
              error={errors.zipCode || errors.address}
              errorMessage={errors.zipCode ? this.props.t("errors.zipCodeError"): ""}
            />
            <Text
              transparent
              large
              strongRequired
              type="text"
              initialValue={form.address.city}
              label={this.props.t("registerForm.field.city")}
              onValueChanged={(v) => this.setState({ form: {...form, address: {...form.address, city: v} }})}
              error={errors.city || errors.address}
              errorMessage={errors.city ? this.props.t("errors.cityError"): ""}
            />
            <Text
              transparent
              large
              type="text"
              initialValue={form.address.additional1}
              label={this.props.t("registerForm.field.additional1")}
              placeholder={this.props.t("registerForm.placeholder.additional1")}
              onValueChanged={(v) => this.setState({ form: {...form, address: {...form.address, additional1: v} }})}
              error={errors.additional1 || errors.address}
              errorMessage={errors.additional1 ? this.props.t("errors.additional1Error"): ""}
            />
            <Text
              transparent
              large
              type="text"
              initialValue={form.address.additional2}
              label={this.props.t("registerForm.field.additional2")}
              placeholder={this.props.t("registerForm.placeholder.additional2")}
              onValueChanged={(v) => this.setState({ form: {...form, address: {...form.address, additional2: v} }})}
              error={errors.additional2 || errors.address}
              errorMessage={errors.additional2 ? this.props.t("errors.additional2Error"): ""}
            />
          </div>
        )}

        {this.state.submitting ? (
          <div className="deals-loader">
              <Loader/>
          </div>
        ) : (
          <Button
            disabled={this.state.sent}
            primary
            type="submit"
            label={this.props.t("registerForm.button." + (this.state.sent ? "sent" : "submit"))}
            small
            center
          />
        )}
      </form>
    );
  }
}

RegisterForm.defaultProps = {
  isMobile: false,
  nextAction: () => {},
};

const connectedComponent = connect(
  (state) => ({
    isAuthenticated: AuthenticationUtils.isAuthenticated(state),
  }),
  (dispatch) => ({
    submit: (values) => dispatch(UserInformationsActioner.updateUserInformations(values)),
  })
)(RegisterForm);

const TranslatedComponent = translate('game', { wait: true })(connectedComponent);
export { TranslatedComponent as RegisterForm };
