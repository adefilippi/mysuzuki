import React, { Component } from "react";
import "./ResendClientIdForm.scss";
import { Button, Text, Loader, Datepicker, ICON_NAMES, Radio, Checkbox } from "../../";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import {
    FormUtils,
    Validators,
    HelpActioner,
    IssueTypesActioner,
    AuthenticationUtils, ISSUE_TYPES
} from "../../../services";
import PropTypes from 'prop-types';

class ResendClientIdForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            sent: false,
            errors: {},
            errorMessage: {},
            form: {
                vin: props.vin,
                buyType: props.buyType,
                buyDate: props.buyDate,
                name: props.name,
                firstName: props.firstName,
                postalCode: props.postalCode,
                email: props.email,
                honorCertification: props.honorCertification,
            },
            validators: {
                vin: [ Validators.notBlank, { validator: Validators.vin, message: props.t("errors.vin") }],
                name: Validators.notBlank,
                postalCode: Validators.notBlank,
                email: Validators.notBlank,
                honorCertification: Validators.notBlank,
            }
        }
    };

    setField(formState, callback) {
        this.setState({form: {...this.state.form, ...formState}}, callback);
    }

    formToGenericIssueForm(form) {
        const buyType = {
            0: this.props.t('helpForm.choice.vehicleNew'),
            1: this.props.t('helpForm.choice.vehicleSecondHand'),
            default: null,
        }[form.buyType !== null ? form.buyType : 'default'];

        let message = `<h3>Demande de code personnel</h3>`;
        message += `<table style="font-family: sans-serif">`;
        message += `<tr><td><b>NAME</b></td><td>${form.name} ${form.firstName || ''}</td></tr>`;
        message += `<tr><td><b>EMAIL</b></td><td>${form.email}</td></tr>`;
        message += `<tr><td><b>CODE POSTAL</b></td><td>${form.postalCode}</td></tr>`;
        message += `<tr><td><b>VIN</b></td><td>${form.vin}</td></tr>`;
        message += `<tr><td><b>TYPE D'ACHAT</b></td><td>${buyType || ''}</td></tr>`;
        message += `<tr><td><b>DATE D'ACHAT</b></td><td>${form.buyDate ? form.buyDate.toString() : ''}</td></tr>`;
        message += `</table>`;

        return {
            type: ISSUE_TYPES.RESEND_CLIENT_ID,
            subject: this.props.t("resendClientId.subject"),
            vin: form.vin,
            name: form.name,
            email: form.email,
            message: message,
        };
    }

    submit = (event) => {
        event.preventDefault();
        this.setState({submitting: true});
        const {form, validators} = this.state;
        if (this.props.isAuthenticated) {
            validators.name = Validators.notBlank;
        }
        FormUtils.checkErrors({form, validators}, this).then(() => {
            this.props.submit(this.formToGenericIssueForm(this.state.form))
                .then(() => {
                    this.setState({submitting: false, sent: true});
                    this.props.onSend();
                })
                .catch(() => {
                    this.setState({submitting: false, sent: false});
                })
            ;
        }).catch(() => this.setState({submitting: false}));
    };

    render = () => {
        const { isMobile } = this.props;
        const { form, errors } = this.state;

        return (
            <form onSubmit={this.submit}>
                <Text
                    required
                    id="vin"
                    name="vin"
                    label={this.props.t("helpForm.field.vin")}
                    onValueChanged={(value) => this.setField({ vin: value })}
                    initialValue={form.vin}
                    error={this.state.errors.vin}
                    errorMessage={this.state.errors.vin ? this.props.t(this.state.errorMessage.vin) : ""}
                    large
                    transparent
                />
                <Radio
                    id="buyType"
                    name="buyType"
                    initialChoice={null}
                    onOptionChange={(value) => this.setField({ buyType: value })}
                    choices={[
                        { label: this.props.t("helpForm.choice.vehicleNew") },
                        { label: this.props.t("helpForm.choice.vehicleSecondHand") }
                    ]}
                    on
                    inline
                    error={errors.buyType}
                />
                <Datepicker
                    id="buyDate"
                    name="buyDate"
                    initialDate={null}
                    label={this.props.t("helpForm.field.buyDate")}
                    icon={ICON_NAMES.CALENDAR}
                    onDateChange={(value) => this.setField({ buyDate: value})}
                    error={errors.buyDate}
                    large
                    transparent
                />
                <Text
                    required
                    id="name"
                    name="name"
                    label={this.props.t("helpForm.field.name")}
                    onValueChanged={(value) => this.setField({ name: value })}
                    initialValue={form.name}
                    error={this.state.errors.name}
                    errorMessage={this.state.errors.name ? this.props.t(this.state.errorMessage.name) : ""}
                    large
                    transparent
                />
                <Text
                    id="firstName"
                    name="firstName"
                    label={this.props.t("helpForm.field.firstName")}
                    onValueChanged={(value) => this.setField({ firstName: value })}
                    initialValue={form.firstName}
                    error={this.state.errors.firstName}
                    errorMessage={this.state.errors.email ? this.props.t(this.state.errorMessage.email) : ""}
                    large
                    transparent
                />
                <Text
                    required
                    id="postalCode"
                    name="postalCode"
                    label={this.props.t("helpForm.field.postalCode")}
                    onValueChanged={(value) => this.setField({ postalCode: value })}
                    initialValue={form.postalCode}
                    error={this.state.errors.postalCode}
                    errorMessage={this.state.errors.postalCode ? this.props.t(this.state.errorMessage.postalCode) : ""}
                    large
                    transparent
                />
                <Text
                    required
                    id="email"
                    name="email"
                    type="email"
                    label={this.props.t("helpForm.field.email")}
                    onValueChanged={(value) => this.setField({ email: value })}
                    initialValue={form.email}
                    error={this.state.errors.email}
                    errorMessage={this.state.errors.email ? this.props.t(this.state.errorMessage.email) : ""}
                    large
                    transparent
                />
                <div className="honor-certification">
                    <Checkbox
                        id="honorCertification"
                        name="honorCertification"
                        label={this.props.t("helpForm.field.honorCertification")}
                        onValueChanged={(value) => this.setField({ honorCertification: value })}
                        error={this.state.errors.honorCertification}
                    />
                </div>
                {this.state.submitting ? (
                    <div className="deals-loader">
                        <Loader/>
                    </div>
                ) : (
                    <Button
                        disabled={this.state.sent}
                        primary
                        center
                        large={isMobile}
                        type="submit"
                        label={this.props.t("helpForm.button.submit")}
                    />
                )}
                <div className="support-contact">
                    <p>{this.props.t("helpForm.supportContact")}</p>
                    <p>{this.props.t("helpForm.callPrice")}</p>
                </div>
            </form>
        );
    }
}

ResendClientIdForm.defaultProps = {
    isMobile: false,
    vin: "",
    buyType: null,
    buyDate: null,
    name: "",
    firstName: "",
    postalCode: undefined,
    email: "",
    honorCertification: false,
    onSend: () => {},
};

ResendClientIdForm.propTypes = {
    isMobile: PropTypes.bool,
    vin: PropTypes.string,
    buyType: PropTypes.number,
    buyDate: PropTypes.any,
    name: PropTypes.string,
    firstName: PropTypes.string,
    postalCode: PropTypes.number,
    email: PropTypes.string,
    honorCertification: PropTypes.bool,
    onSend: PropTypes.func,
};

const connectedComponent = connect(
    (state) => ({
        isAuthenticated: AuthenticationUtils.isAuthenticated(state),
    }),
    (dispatch) => ({
        submit: (values) => dispatch(HelpActioner.sendIssue(values)),
        getIssueTypes: () => dispatch(IssueTypesActioner.getIssueTypes())
    })
)(ResendClientIdForm);

const TranslatedComponent = translate("issue", { wait: true })(connectedComponent);
export { TranslatedComponent as ResendClientIdForm };
