import React, { Component } from "react";
import classnames from "classnames";
import { translate } from "react-i18next";
import moment from "moment";
import { DeviceContextConsumer, ICON_NAMES, Select, Text, Datepicker, Button, Loader, Checkbox } from "../../../../../../../components";
import {UserInformationsActioner, UserInformationsUtils, CompanyUtils, CompanyActioner} from "../../../../../../../services";

import "./MyContactForm.scss";
import { connect } from "react-redux";
import toastr from "toastr";

import { ProForm } from "../../../../../SignUp/VehicleStep/components";

class MyContactForm extends Component {
    constructor(props) {
        super(props);

        const job = props.user.get("job");
        const organization = props.user.getIn(["job", "organization"]) || new Map({});
        const size = organization && organization.get("size");
        const naf = organization && organization.get("naf");

        this.state = {
            civ: props.user.get("civ"),
            lastName: props.user.get("lastName") || "",
            firstName: props.user.get("firstName") || "",
            addressStreet: props.user.getIn(["address", "street"]) || "",
            addressAdditional1: props.user.getIn(["address", "additional1"]) || "",
            addressAdditional2: props.user.getIn(["address", "additional2"]) || "",
            addressZipCode: props.user.getIn(["address", "zipCode"]) || "",
            addressCity: props.user.getIn(["address", "city"]) || "",
            landlinePhone: props.user.get("landlinePhone") || "",
            mobilePhone: props.user.get("mobilePhone") || "",
            dateOfBirth: props.user.get("dateOfBirth") ? moment(props.user.get("dateOfBirth")) : null,
            isUpdateNameModalVisible: false,
            errors : {
                addressStreet: false,
                firstName: false,
                addressZipCode: false,
                addressCity: false,
                dateOfBirth: false,
                mobilePhone: false,
                landlinePhone: false,
                isProfessional: false,
                organizationName: false,
                naf: false,
            },
            submitted: false,
            isProfessional: organization.get("name") ? true : false,
            jobOrganizationName: organization.get("name") || "",
            jobOrganizationSize: size || "",
            jobOrganizationSiretCode: organization.get("siret") || "",
            jobOrganizationNafCode: naf && naf.get("code") ? naf.get("code") : "",
            jobName: (job && job.get("name")) || "",
            jobDepartment: (job && job.get("department")) || "",
            jobOrganizationNumberOfVehicles: (organization && organization.get("numberOfVehicles")) || "",
        };
    }

    componentWillMount() {
        this.props.getStaffSizes();
    }

    getNameAddonElement = () => {
        return (
            <span className="sign-up-personal-step-modal-addon" onClick={this.props.onRequestUpdateNameModal}>
                {this.props.t("namePopinButton")}
            </span>
        );
    };

    handleBackErrors = (errors) => {
        const violations = errors.violations || [];
        const that = this;
        violations.forEach(function(violation){
            if (violation.propertyPath === "mobilePhone") {
                that.setState(
                    (prevState) => ({
                        errors: {
                            ...prevState.errors,
                            mobilePhone: true,
                        }
                    })
                );
            }
            if (violation.propertyPath === "landlinePhone") {
                that.setState(
                    (prevState) => ({
                        errors: {
                            ...prevState.errors,
                            landlinePhone: true,
                        }
                    })
                );
            }
        });
    };

    hasError = (errors) => {
        errors  = errors || this.state.errors;
        const that = this;
        let count = 0;
        for (let error in errors) {
            if(errors[error] !== null && typeof errors[error] === 'object'){
                if(that.hasError(errors[error])) count++;
            } else if(errors[error]) {
                count++;
            }
        }

        return count > 0 ;
    };


    checkErrors = () => {
        return new Promise((resolve, reject) => {
            const mobilePhoneRegexp = new RegExp(/^(?:(?:\+)33[\s.-]{0,3}([\s.-]{0,2})?|0)[67](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/);
            const landlinePhoneRegexp = new RegExp(/^(?:(?:\+)33[\s.-]{0,3}([\s.-]{0,2})?|0)[1-58-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/);

            this.setState(
                (prevState) => ({
                    errors: {
                        ...prevState.errors,
                        addressStreet: !prevState.addressStreet,
                        addressZipCode: !prevState.addressZipCode,
                        addressCity: !prevState.addressCity,
                        firstName: !prevState.firstName,
                        dateOfBirth: !prevState.dateOfBirth,
                        mobilePhone: prevState.mobilePhone && !mobilePhoneRegexp.test(prevState.mobilePhone),
                        landlinePhone: prevState.landlinePhone && !landlinePhoneRegexp.test(prevState.landlinePhone),
                        phones: !prevState.landlinePhone && !prevState.mobilePhone,
                        isProfessional: prevState.isProfessional === null,
                        organizationName: prevState.isProfessional && !prevState.jobOrganizationName,
                        naf: prevState.isProfessional && prevState.jobOrganizationNafCode && !prevState.jobOrganizationNafCode.replace(" ", "").match(/^[0-9]{4}[A-Za-z]$/),
                        siretCode: prevState.isProfessional && prevState.jobOrganizationSiretCode && !prevState.jobOrganizationSiretCode.replace(" ", "").match(/^[0-9]{14}$/)
                    }
                }),
                () => (this.hasError() ? reject() : resolve())
            );
        });
    };

    submit = () => {
        this.setState({ submitted: true });

        this.state.emailOptin = this.props.user.getIn(["optin", "email"]) || false;
        this.state.smsOptin = this.props.user.getIn(["optin", "sms"]) || false;
        this.checkErrors()
            .then(() => {
                this.props
                    .submit(this.state)
                    .then(() => toastr.success(this.props.t('updated.success')))
                    .catch((errors) => {
                        toastr.error(this.props.t('updated.error'));
                        this.handleBackErrors(errors);
                    })
                    .finally(() => this.setState({ submitted: false }))
            })
            .catch(() => this.setState({ submitted: false }))
        ;
    };

    resetProState = () => {
        this.setState(
            {
                jobOrganizationName: "",
                jobOrganizationSize: "",
                jobOrganizationSiretCode: "",
                jobOrganizationNafCode: "",
                jobName: "",
                jobDepartment: "",
                jobOrganizationNumberOfVehicles: "",
            }
        );
    };

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTablet }) => {
                    const civSelectOptions = [
                        { value: "MME", label: `${this.props.t("myContactForm.civMadam")}` },
                        { value: "M", label: `${this.props.t("myContactForm.civMister")}` },
                        { value: "STE", label: `${this.props.t("myContactForm.civCompany")}` }
                    ];

                    const {
                        errors,
                        isProfessional,
                        jobOrganizationName,
                        jobOrganizationSize,
                        jobOrganizationSiretCode,
                        jobOrganizationNafCode,
                        jobName,
                        jobDepartment,
                        jobOrganizationNumberOfVehicles,
                    } = this.state;

                    const responsive = { mobile: isMobile, tablet: isTablet };
                    const civsLabel = {
                        'M': civSelectOptions[1],
                        'MME': civSelectOptions[0],
                        'STE': civSelectOptions[2]
                    };

                    return (
                        <form>
                            <div className={classnames({"my-contact-form-inputs-group": true, ...responsive })}>
                                <div className="column">
                                    <Select
                                        dark
                                        large
                                        initialOption={civsLabel[this.state.civ]}
                                        label={this.props.t("myContactForm.civ")}
                                        options={civSelectOptions}
                                        onOptionChanged={(v) => this.setState({ civ: v.value })}
                                    />
                                    <Text
                                        disabled
                                        transparent
                                        large
                                        required
                                        label={this.props.t("myContactForm.lastName")}
                                        initialValue={this.state.lastName}
                                        addOn={this.getNameAddonElement()}
                                    />
                                    <Text
                                        transparent
                                        large
                                        required
                                        label={this.props.t("myContactForm.firstName")}
                                        initialValue={this.state.firstName}
                                        onValueChanged={(v) => this.setState({ firstName: v })}
                                        error={errors.firstName}
                                        errorMessage={errors.firstName ? this.props.t("errors.firstNameError"): ""}
                                        maxlength={32}
                                    />
                                    <Text
                                        transparent
                                        large
                                        required
                                        multi
                                        initialValue={this.state.addressStreet}
                                        label={this.props.t("myContactForm.address")}
                                        placeholder={this.props.t("myContactForm.addressStreetPlaceholder")}
                                        onValueChanged={(v) => this.setState({ addressStreet: v })}
                                        error={errors.addressStreet}
                                        errorMessage={errors.addressStreet ? this.props.t("errors.addressStreetError"): ""}
                                        maxlength={70}
                                    />
                                    <Text
                                        initialValue={this.state.addressAdditional1}
                                        transparent
                                        large
                                        multi
                                        placeholder={this.props.t("myContactForm.addressAdditional1")}
                                        onValueChanged={(v) => this.setState({ addressAdditional1: v })}
                                        maxlength={70}
                                    />
                                    <Text
                                        initialValue={this.state.addressAdditional2}
                                        transparent
                                        large
                                        placeholder={this.props.t("myContactForm.addressAdditional2")}
                                        onValueChanged={(v) => this.setState({ addressAdditional2: v })}
                                        maxlength={70}
                                    />
                                </div>
                                <div className="column">
                                    <Text
                                        initialValue={this.state.addressZipCode}
                                        transparent
                                        large
                                        required
                                        label={this.props.t("myContactForm.addressZipCode")}
                                        onValueChanged={(v) => this.setState({ addressZipCode: v })}
                                        figuresOnly
                                        maxlength={5}
                                        error={errors.addressZipCode}
                                        errorMessage={errors.addressZipCode ? this.props.t("errors.addressZipCodeError"): ""}
                                    />
                                    <Text
                                        initialValue={this.state.addressCity}
                                        transparent
                                        large
                                        required
                                        label={this.props.t("myContactForm.addressCity")}
                                        onValueChanged={(v) => this.setState({ addressCity: v })}
                                        error={errors.addressCity}
                                        errorMessage={errors.addressCity ? this.props.t("errors.addressCityError"): ""}
                                        maxlength={32}
                                    />
                                    <Text
                                        transparent
                                        large
                                        strongRequired
                                        type="tel"
                                        initialValue={this.state.landlinePhone}
                                        label={this.props.t("myContactForm.landlinePhone")}
                                        inputTooltip={this.props.t("myContactForm.landlinePhoneTooltip")}
                                        onValueChanged={(v) => this.setState({ landlinePhone: v })}
                                        error={errors.landlinePhone || errors.phones}
                                        errorMessage={errors.landlinePhone ? this.props.t("errors.landlinePhoneError"): ""}
                                    />
                                    <Text
                                        transparent
                                        large
                                        strongRequired
                                        type="tel"
                                        initialValue={this.state.mobilePhone}
                                        label={this.props.t("myContactForm.mobilePhone")}
                                        inputTooltip={this.props.t("myContactForm.mobilePhoneTooltip")}
                                        onValueChanged={(v) => this.setState({ mobilePhone: v })}
                                        error={errors.mobilePhone || errors.phones}
                                        errorMessage={errors.mobilePhone ? this.props.t("errors.mobilePhoneError"): (errors.phones ? this.props.t("errors.phonesError"): "")}
                                    />
                                    <Datepicker
                                        initialDate={this.state.dateOfBirth}
                                        maxDate={moment()}
                                        transparent
                                        large
                                        required
                                        label={this.props.t("myContactForm.dateOfBirth")}
                                        icon={ICON_NAMES.CALENDAR}
                                        onDateChange={(v) => this.setState({ dateOfBirth: v })}
                                        error={errors.dateOfBirth}
                                        errorMessage={errors.dateOfBirth ? this.props.t("errors.dateOfBirthError"): ""}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="checkbox checkbox--spacing border">
                                    <Checkbox
                                        id="isProfessional"
                                        initialValue={this.state.isProfessional}
                                        onValueChanged={(v) => {
                                            this.setState({ isProfessional: v });

                                            if (!v) {
                                                this.resetProState();
                                            }
                                        }}
                                        label={this.props.t("myContactForm.isProfessional")}
                                        textLabel
                                    />
                                </div>

                                <ProForm
                                    errors={errors}
                                    CompanyStaffSizes={this.props.CompanyStaffSizes}
                                    isProfessional={isProfessional}
                                    jobOrganizationName={jobOrganizationName}
                                    jobOrganizationSize={jobOrganizationSize}
                                    jobOrganizationSiretCode={jobOrganizationSiretCode}
                                    jobOrganizationNafCode={jobOrganizationNafCode}
                                    jobName={jobName}
                                    jobDepartment={jobDepartment}
                                    jobOrganizationNumberOfVehicles={jobOrganizationNumberOfVehicles}
                                    onValueChange={(v) => this.setState(v)}
                                    wrapperClassName={'my-contact-form-inputs-group'}
                                    isSeparated
                                />
                            </div>
                            {this.state.submitted ? (
                              <div style={{ display: "flex", justifyContent: "center" }}>
                                <Loader />
                              </div>
                            ) : (
                                <Button
                                    primary
                                    large={isMobileSmall}
                                    center
                                    shrink={!isMobile && !isTablet}
                                    label={this.props.t("validateFormButton")}
                                    onClick={this.submit}
                                />
                            )}
                        </form>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}


MyContactForm.propTypes = {};

const ReduxConnectedScene = connect(
    (state) => ({
        user: state.User.Informations,
        CompanyStaffSizes: CompanyUtils.getStaffSizesForChoiceFromState(state),
    }),
    (dispatch) => ({
        submit: (values) => dispatch(UserInformationsActioner.updateUserInformations(UserInformationsUtils.fromFormToApiParams(values))),
        getStaffSizes: () => dispatch(CompanyActioner.getStaffSizes()),
    })
)(MyContactForm);

const TranslatedMyContactForm = translate("account", { wait: true })(ReduxConnectedScene);
export { TranslatedMyContactForm as MyContactForm };
