import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Map } from "immutable";
import { translate } from "react-i18next";
import { PATHS } from "../../../../routes";
import { Redirect } from "react-router";
import moment from "moment";
import {
    CredentialUtils, SerialUtils, UserVehiclesUtils, UserInformationsUtils, SignUpProcessVehicleActioner, CompanyUtils,
    AuthenticationUtils, ISSUE_TYPES,
    Validators,
    CompanyActioner,
    FormUtils
} from "../../../../services";
import { DeviceContextConsumer, ICON_NAMES, Text, Datepicker, Radio, Button, VehicleRecap, IssueModal, Select, Loader } from "../../../../components";

import LOGO_MY_SUZUKI from "../../../../assets/img/logo_darkblue_v2.png";

import "./Scene.scss";
import { ProForm } from "./components";

class Scene extends Component {
    constructor(props) {
        super(props);
        const job = props.User.get("job");
        const organization = props.User.getIn(["job", "organization"]) || new Map({});
        const size = organization && organization.get("size");
        const naf = organization && organization.get("naf");
        this.state = {
            visible: false,
            isProfessional: organization.get("name") ? true : null,
            purchaseDate: props.Vehicle.get("purchaseDate") ? moment(props.Vehicle.get("purchaseDate")) : "",
            mileage: props.Vehicle.get("mileage") && props.Vehicle.get("mileage").toString() != '0' ? props.Vehicle.get("mileage").toString() : null,
            maxMileage: props.Vehicle.get("mileage") && props.Vehicle.get("mileage").toString() != '0' ? props.Vehicle.get("mileage").toString() : null,
            annualMileage: props.Vehicle.get("annualMileage") ? props.Vehicle.get("annualMileage").toString() : "",
            jobOrganizationName: organization.get("name") || "",
            jobOrganizationSize: size || "",
            jobOrganizationSiretCode: organization.get("siret") || "",
            jobOrganizationNafCode: naf && naf.get("code") ? naf.get("code") : "",
            jobName: (job && job.get("name")) || "",
            jobDepartment: (job && job.get("department")) || "",
            jobOrganizationNumberOfVehicles: (organization && organization.get("numberOfVehicles")) || "",
            form: this.getInitialFormState(props),
            validators: {
                mileageTooShort: [{validator: (v) => Validators.greaterThan(v, props.Vehicle.get("mileage"))}]
            },
            errors: {
                purchaseDate: false,
                mileage: false,
                annualMileage: false,
                isProfessional: false,
                organizationName: false,
                naf: false
            }
        };
    }

    getInitialFormState(props) {
        return  {
            purchaseDate: props.purchaseDate,
            mileage:  (props.mileage && props.mileage.toString()) || "",
            annualMileage: (props.annualMileage && props.annualMileage.toString()) || "",
            maxMileage: (props.mileage && props.mileage.toString()) || ""
        }
    }

    componentWillMount() {
        this.props.getStaffSizes();
    }

    handleModalToggle = () => {
        this.setState((prevState) => ({ visible: !prevState.visible }));
    };

    closeModal = () => this.setState({ visible: false });

    goToPersonalStep = () => {
        this.props.history.push(PATHS.SIGN_UP.PERSONAL_STEP);
    };

    hasError = (errors) => {
        errors = errors || this.state.errors;
        const that = this;
        let count = 0;
        for (let error in errors) {
            if (errors[error] !== null && typeof errors[error] === "object") {
                if (that.hasError(errors[error])) count++;
            } else if (errors[error]) {
                count++;
            }
        }

        return count > 0;
    };

    handleBackErrors = (errors) => {
        const violations = errors.violations || [];
        const that = this;

        for (let violation in violations) {
        }
    };

    checkErrors = () => {
        return new Promise((resolve, reject) => {
            this.setState(
                (prevState) => ({
                    errors: {
                        ...prevState.errors,
                        purchaseDate: !prevState.purchaseDate,
                        mileage: !prevState.mileage,
                        maxMileage: prevState.mileage < 0 || prevState.mileage < prevState.maxMileage,
                        mileageTooLong: prevState.mileage && prevState.mileage.length > 7 && Validators.isNumeric(prevState.mileage),
                        mileageTooShort: prevState.mileage && Validators.isNumeric(prevState.mileage),
                        annualMileageTooLong: prevState.annualMileage && prevState.annualMileage.length > 7 && Validators.isNumeric(prevState.annualMileage),
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

    submit = (event) => {
        FormUtils.checkErrors(this.state, this)
            .then(() => {
                this.checkErrors().then(() => {
                    this.props
                        .submitVehiculeStep(this.props.Vehicle.get("vin"), this.state)
                        .then(this.goToPersonalStep)
                        .catch(this.handleBackErrors);
                }).catch(() => {})
            })
            .catch(() => {});
    };

    render() {
        if (!this.props.isAuthenticated && !this.props.SerialIsValidated) return <Redirect to={PATHS.SIGN_UP.SERIAL_STEP} />;
        if (!this.props.isAuthenticated && !this.props.CredentialIsValidated) return <Redirect to={PATHS.SIGN_UP.CREDENTIAL_STEP} />;
        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTablet }) => {
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

                    return (
                        <div className={classnames({ "sign-up-vehicule-step": true, mobile: isMobile, "mobile-small": isMobileSmall })}>
                            <img alt="suzuki-logo" src={LOGO_MY_SUZUKI} className="sign-up-vehicule-step-logo" />
                            <h1 className="sign-up-vehicule-step-title">{this.props.t("title")}</h1>
                            <div className={classnames({ "sign-up-vehicule-step-header": true, mobile: isMobile })}>{this.props.t("header")}</div>
                            <div className={classnames({ "sign-up-vehicule-step-form": true, mobile: isMobile, "mobile-small": isMobileSmall, tablet: isTablet })}>
                                <div className={classnames({ "sign-up-vehicule-step-form-information": true, mobile: isMobile, tablet: isTablet })}>
                                    <VehicleRecap
                                        name={""}
                                        model={this.props.Vehicle.get("model")}
                                        enery={this.props.Vehicle.get("energy")}
                                        color={this.props.Vehicle.get("color")}
                                        vin={this.props.Vehicle.get("vin")}
                                        registration={this.props.Vehicle.get("registrationNumber") || this.props.t("fundefinedValue")}
                                        purcharseType={this.props.t(`purchaseType.${this.props.Vehicle.get("purchaseType") || "VO"}`)}
                                    />
                                    <div className="sign-up-vehicule-step-form-information-update-link" onClick={this.handleModalToggle}>
                                        {this.props.t("falseInformation")}
                                    </div>
                                </div>

                                <div className="sign-up-vehicule-step-form-elements">
                                    <div className="sign-up-vehicule-step-form-inputs-group">
                                        <Datepicker
                                            initialDate={this.state.purchaseDate}
                                            required
                                            transparent
                                            autoSizing={isMobile}
                                            label={this.props.t("purchaseDate")}
                                            icon={ICON_NAMES.CALENDAR}
                                            onDateChange={(v) => this.setState({ purchaseDate: v })}
                                            error={errors.purchaseDate}
                                            maxDate={moment()}
                                            errorMessage={errors.purchaseDate ? this.props.t("purchaseDateError") : ""}
                                        />
                                        <Text
                                            figuresOnly
                                            required
                                            name="mileage"
                                            value=""
                                            label={this.props.t("mileage").toString()}
                                            initialValue={this.state.mileage}
                                            transparent
                                            onValueChanged={(v) => this.setState({ mileage: v })}
                                            error={errors.mileage || errors.mileageTooLong || errors.mileageTooShort || errors.maxMileage}
                                            errorMessage={errors.mileage ? this.props.t("mileageError") : (errors.mileageTooLong ? this.props.t("mileageVehicleError") : (errors.mileageTooShort ? this.props.t("mileageVehicleError") : (errors.maxMileage) ? this.props.t("mileageVehicleError") : ""))}
                                            pattern="^[0-9]{0,7}$"
                                            type="number"
                                        />
                                        <Text
                                            figuresOnly
                                            name="annualMileage"
                                            value=""
                                            initialValue={this.state.annualMileage}
                                            label={this.props.t("annualMileage")}
                                            transparent
                                            onValueChanged={(v) => this.setState({ annualMileage: v })}
                                            error={errors.annualMileageTooLong}
                                            errorMessage={errors.annualMileageTooLong ? this.props.t("annualMileageTooLongError") : ""}
                                            pattern="^[0-9]{0,7}$"
                                            type="number"
                                        />
                                        <Radio
                                            initialChoice={this.state.isProfessional === true ? 1 : null}
                                            onOptionChange={(v) => {
                                                this.setState({ isProfessional: v === 1 });
                                            }}
                                            choices={[{ label: this.props.t("personalUse") }, { label: this.props.t("professionalUse") }]}
                                            label={this.props.t("vehiculeUseField")}
                                            required
                                            on
                                            inline
                                            error={errors.isProfessional}
                                            errorMessage={errors.isProfessional ? this.props.t("isProfessionalError") : ""}
                                        />
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
                                        />
                                    </div>
                                    {this.props.VehicleStep.get("loading") ? <Loader /> : <Button disabled={false} primary large={!isMobile} onClick={this.submit} label={this.props.t("button")} />}
                                </div>
                            </div>
                            <div className="sign-up-personal-step-legalNotice">
                                <p dangerouslySetInnerHTML={{__html: this.props.t("commitmentText")}}/>
                            </div>
                            <IssueModal
                                title={this.props.t("falseInformationModalTitle")}
                                header={this.props.t("falseInformationModalHeader")}
                                name={this.props.UserLastName}
                                vin={this.props.Vehicle.get("vin")}
                                email={this.props.UserEmail}
                                visible={this.state.visible}
                                onRequestClose={this.closeModal}
                                canSendAttachment={false}
                                type={ISSUE_TYPES.INFO_ERROR}
                                subject={this.props.t("falseInformationModalSubject")}
                            />
                        </div>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

Scene.propTypes = {};

const ReduxConnectedScene = connect(
    (state) => ({
        SerialIsValidated: SerialUtils.isValidated(state),
        CredentialIsValidated: CredentialUtils.isValidated(state),
        Serial: state.SignUpProcess.Serial,
        Credential: state.SignUpProcess.Credential,
        VehicleStep: state.SignUpProcess.Vehicle,
        isAuthenticated: AuthenticationUtils.isAuthenticated(state),
        hasCompletedTheSignUp: UserInformationsUtils.hasUserCompleteSignUpFromState(state),
        Vehicle: UserVehiclesUtils.getUserFirstVehicleFromState(state),
        User: UserInformationsUtils.getUserFromState(state),
        UserEmail: UserInformationsUtils.getUserEmailFromState(state),
        UserLastName: UserInformationsUtils.getUserLastNameFromState(state),
        CompanyStaffSizes: CompanyUtils.getStaffSizesForChoiceFromState(state)
    }),
    (dispatch) => ({
        submitVehiculeStep: (vin, stepValues) => dispatch(SignUpProcessVehicleActioner.submitStep(vin, stepValues)),
        getStaffSizes: () => dispatch(CompanyActioner.getStaffSizes()),
    })
)(Scene);
const TranslatedConnectedScene = translate("signupVehicle", { wait: true })(ReduxConnectedScene);
export { TranslatedConnectedScene as Scene };
