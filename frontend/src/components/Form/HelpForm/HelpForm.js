import React, { Component } from "react";
import "./HelpForm.scss";
import {Textarea, Button, Text, Select, Loader, File, Datepicker, ICON_NAMES, Radio, Checkbox} from "../../";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import {
    FormUtils,
    Validators,
    HelpActioner,
    ISSUE_TYPES,
    IssueTypesActioner,
    AuthenticationUtils
} from "../../../services";
import PropTypes from 'prop-types';

class HelpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            issueTypes: props.issueTypes,
            submitting: false,
            sent: false,
            errors: {
                message: null,
                email: null,
                subject: null,
                attachment: null,
                type: null,
                name: null,
            },
            errorMessage: {
                message: "",
                email: "",
                subject: "",
                attachment: "",
                type: "",
            },
            form: {
                message: "",
                email: props.email ? props.email : "",
                subject: props.subject ? props.subject : "",
                type: props.type ? props.type : "",
                attachment: "",
                name: props.name ? props.name : "",
                vin: props.vin ? props.vin : "",
            },
            validators: {
                message: Validators.notBlank,
                type: Validators.notBlank,
                subject: Validators.notBlank,
                email: Validators.notBlank,
                attachment: (v) => Validators.fileSize(v, 10),
                deleteNature: props.type === ISSUE_TYPES.DELETE_VEHICLE ? Validators.notBlank : null,
                date: props.type === ISSUE_TYPES.DELETE_VEHICLE ? Validators.notBlank : null,
                vin: props.askForVin ? [Validators.notBlank, {validator: Validators.vin, message: props.t("errors.vin")}] : null,
            }
        }
    };

    componentDidMount = () => {
        if(this.state.issueTypes.length === 0){
            this.props.getIssueTypes().then((data) =>
                this.setState({
                    issueTypes: data
                })
            );
        }
    };

    submit = (event) => {
        event.preventDefault();
        this.setState({submitting: true});
        const {form, validators} = this.state;
        if (this.props.isAuthenticated) {
            validators.name = Validators.notBlank;
        }
        FormUtils.checkErrors({form, validators}, this).then(() => {
            this.props.submit(this.state.form)
                .then(() => {
                    this.setState({submitting: false, sent: true});
                    this.props.toggleModal();
                })
                .catch(() => {
                    this.setState({submitting: false, sent: false});
                })
            ;
        }).catch(() => this.setState({submitting: false}));
    };

    render = () => {
        const { isMobile } = this.props;
        const { form, errors, issueTypes } = this.state;

        return (
            <form onSubmit={this.submit}>
                {!this.props.type && (
                    <Select
                        dark
                        large
                        label={this.props.t("helpForm.field.demandType")}
                        options={issueTypes}
                        onOptionChanged={(v) => this.setState({form: {...form, type: v["@id"]}})}
                        valueKey="@id"
                        required
                        error={errors.type}
                    />
                )}
                {this.props.type === ISSUE_TYPES.DELETE_VEHICLE && (
                    <div>
                        <Select
                            dark
                            large
                            label={this.props.t("helpForm.field.deleteVehicle")}
                            options={[
                                {label: this.props.t("helpForm.option.resell")},
                                {label: this.props.t("helpForm.option.resellAbroad")},
                                {label: this.props.t("helpForm.option.stolen")},
                                {label: this.props.t("helpForm.option.destruction")},
                                {label: this.props.t("helpForm.option.competition")}
                            ]}
                            onOptionChanged={(v) => this.setState({form: {...form, deleteNature: v.value}})}
                            valueKey="label"
                            error={errors.deleteNature}
                        />
                        <Datepicker
                            initialDate={null}
                            large
                            transparent
                            label={this.props.t("helpForm.field.date")}
                            icon={ICON_NAMES.CALENDAR}
                            onDateChange={(v) => this.setState({form: {...form, date: v}})}
                            error={errors.date}
                        />
                    </div>
                )}
                {this.props.askForVin && (
                    <Text
                        id="vin"
                        name="vin"
                        large
                        transparent
                        label={this.props.t("helpForm.field.vin")}
                        onValueChanged={(v) => this.setState({form: {...form, vin: v}})}
                        initialValue={form.vin}
                        error={this.state.errors.vin}
                        errorMessage={this.state.errors.vin ? this.props.t(this.state.errorMessage.vin) : ""}
                        required
                    />
                )}
                {this.props.askForName && (
                    <Text
                        id="name"
                        name="name"
                        large
                        transparent
                        required
                        label={this.props.t("helpForm.field.name")}
                        onValueChanged={(v) => this.setState({form: {...form, name: v}})}
                        initialValue={form.name}
                        error={this.state.errors.name}
                        errorMessage={this.state.errors.name ? this.props.t(this.state.errorMessage.name) : ""}
                    />
                )}
                {!this.props.email && (
                    <Text
                        required
                        id="email"
                        name="email"
                        type="email"
                        large
                        transparent
                        label={this.props.t("helpForm.field.email")}
                        onValueChanged={(v) => this.setState({form: {...form, email: v}})}
                        initialValue={form.email}
                        error={this.state.errors.email}
                        errorMessage={this.state.errors.email ? this.props.t(this.state.errorMessage.email) : ""}
                    />
                )}
                {!this.props.subject && (
                    <Text
                        required
                        id="subject"
                        name="subject"
                        large
                        transparent
                        label={this.props.t("helpForm.field.subject")}
                        onValueChanged={(v) => this.setState({form: {...form, subject: v}})}
                        initialValue={form.subject}
                        error={this.state.errors.subject}
                        errorMessage={this.state.errors.subject ? this.props.t(this.state.errorMessage.subject) : ""}
                    />
                )}
                <Textarea
                    required
                    onValueChanged={(v) => this.setState({form: {...form, message: v}})}
                    transparent
                    initialValue=""
                    label={this.props.messageInputLabel || this.props.t("helpForm.field.message")}
                    cols="45"
                    rows="5"
                    error={errors.message}
                    errorMessage={this.props.t("messageInputError")}
                />
                {this.props.vehicles && (
                    <Select
                        dark
                        large
                        label={this.props.t("helpForm.field.vehicle")}
                        options={this.props.vehicles.toJS()}
                        onOptionChanged={(v) => this.setState({form: {...form, vin: v.value}})}
                        valueKey="vin"
                        labelKey="model"
                    />
                )}
                {this.props.canSendAttachment && (
                    <File
                        id="attachment"
                        type="file"
                        large
                        transparent
                        label={this.props.t("helpForm.field.file")}
                        buttonLabel={this.props.t("helpForm.button.file")}
                        onValueChanged={(v) => this.setState({form: {...form, attachment: v}})}
                        error={this.state.errors.attachment}
                        errorMessage={this.state.errors.attachment ? this.props.t(this.state.errorMessage.attachment) : ""}
                    />
                )}
                {this.state.submitting ? (
                    <div className="deals-loader">
                        <Loader/>
                    </div>
                ) : (
                    <Button
                        disabled={this.state.sent}
                        primary
                        large={isMobile}
                        type="submit"
                        label={this.props.t("helpForm.button." + (this.state.sent ? "sent" : "submit"))}
                    />
                )}
            </form>
        );
    }
}

HelpForm.defaultProps = {
    canSendAttachment: true,
    isMobile: false,
    issueTypes: [],
    toggleModal: () => {},
};

HelpForm.propTypes = {
    toggleModal: PropTypes.func,
    messageInputLabel: PropTypes.string,
};

const connectedComponent = connect(
    (state) => ({
        isAuthenticated: AuthenticationUtils.isAuthenticated(state),
    }),
    (dispatch) => ({
        submit: (values) => dispatch(HelpActioner.sendIssue(values)),
        getIssueTypes: () => dispatch(IssueTypesActioner.getIssueTypes())
    })
)(HelpForm);

const TranslatedComponent = translate("issue", { wait: true })(connectedComponent);
export { TranslatedComponent as HelpForm };
