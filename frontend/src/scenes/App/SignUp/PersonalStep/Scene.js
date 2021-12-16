import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import moment from "moment";
import { translate } from "react-i18next";
import { PATHS } from "../../../../routes";
import { Redirect } from "react-router";
import {
    CredentialUtils,
    SerialUtils,
    UserVehiclesUtils,
    UserInformationsUtils,
    SignUpProcessVehicleUtils,
    SignUpProcessPersonalActioner,
    AuthenticationUtils,
    ISSUE_TYPES
} from "../../../../services";
import {
    DeviceContextConsumer,
    Select,
    ICON_NAMES,
    Text,
    Datepicker,
    Checkbox,
    Button,
    WelcomeToMySuzukiModal,
    Loader,
    IssueModal
} from "../../../../components";
import LOGO_MY_SUZUKI from "../../../../assets/img/logo_darkblue_v2.png";

import "./Scene.scss";

class Scene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            civ: props.User.get("civ"),
            lastName: props.User.get("lastName") || "",
            firstName: props.User.get("firstName") || "",
            addressStreet: props.User.getIn(["address", "street"]) || "",
            addressAdditional1: props.User.getIn(["address", "additional1"]) || "",
            addressAdditional2: props.User.getIn(["address", "additional2"]) || "",
            addressZipCode: props.User.getIn(["address", "zipCode"]) || "",
            addressCity: props.User.getIn(["address", "city"]) || "",
            landlinePhone: props.User.get("landlinePhone") || "",
            mobilePhone: props.User.get("mobilePhone") || "",
            dateOfBirth: props.User.get("dateOfBirth") ? moment(props.User.get("dateOfBirth")) : null,
            optinSMS: false,
            optinEmail: props.User.getIn(["optin", "email"]),
            isUpdateNameModalVisible: false,
            isWelcomeModalVisible: false,
            errors: {
                addressStreet: false,
                firstName: false,
                addressZipCode: false,
                addressCity: false,
                dateOfBirth: false,
                mobilePhone: false,
                landlinePhone: false,
                phones: false
            }
        };
    }

    toggleModal = () => {
        this.setState((prevState) => ({ isUpdateNameModalVisible: !prevState.isUpdateNameModalVisible }));
    };

    onRequestWelcomeModal = () => {
        this.setState({ isWelcomeModalVisible: true });
    };

    onRequestClose = () => {
        this.setState({ isUpdateNameModalVisible: false, isWelcomeModalVisible: false });
    };

    goToWelcome = () => {
        this.props.history.push(PATHS.WELCOME);
    };

    handleBackErrors = (errors) => {
        const violations = errors.violations || [];
        const that = this;
        violations.forEach(function(violation) {
            if (violation.propertyPath === "mobilePhone") {
                that.setState((prevState) => ({
                    errors: {
                        ...prevState.errors,
                        mobilePhone: true
                    }
                }));
            }
            if (violation.propertyPath === "landlinePhone") {
                that.setState((prevState) => ({
                    errors: {
                        ...prevState.errors,
                        landlinePhone: true
                    }
                }));
            }
        });
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

    checkErrors = () => {
        return new Promise((resolve, reject) => {
            const mobilePhoneRegexp = new RegExp(/^(?:(?:\+)33[\s.-]{0,3}([\s.-]{0,2})?|0)[67](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/);
            const landlinePhoneRegexp = new RegExp(/^(?:(?:\+)33[\s.-]{0,3}([\s.-]{0,2})?|0)[1-58-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/);
            const zipCodeRegexp = new RegExp(/^\d{5}$/);

            this.setState(
                (prevState) => ({
                    errors: {
                        ...prevState.errors,
                        addressStreet: !prevState.addressStreet,
                        addressZipCode: !prevState.addressZipCode,
                        addressZipCodeFormat: !zipCodeRegexp.test(prevState.addressZipCode),
                        addressCity: !prevState.addressCity,
                        firstName: !prevState.firstName,
                        dateOfBirth: !prevState.dateOfBirth,
                        mobilePhone: prevState.mobilePhone && !mobilePhoneRegexp.test(prevState.mobilePhone),
                        landlinePhone: prevState.landlinePhone && !landlinePhoneRegexp.test(prevState.landlinePhone),
                        phones: !prevState.landlinePhone && !prevState.mobilePhone,
                        optinSMS: prevState.optinSMS && !prevState.mobilePhone
                    }
                }),
                () => (this.hasError() ? reject() : resolve())
            );
        });
    };

    submit = () => {
        this.checkErrors()
            .then(() => {
                this.props
                    .submitPersonalStep(this.state)
                    .then(this.goToWelcome)
                    .catch((errors) => {
                        this.handleBackErrors(errors);
                    })
                ;
            })
            .catch(() => {});
    };

    render() {
        if (!this.props.isAuthenticated && !this.props.SerialIsValidated) return <Redirect to={PATHS.SIGN_UP.SERIAL_STEP} />;
        if (!this.props.isAuthenticated && !this.props.CredentialIsValidated) return <Redirect to={PATHS.SIGN_UP.CREDENTIAL_STEP} />;
        if (!this.props.isAuthenticated && !this.props.VehiculeIsValidated) return <Redirect to={PATHS.SIGN_UP.VEHICULE_STEP} />;
        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTablet }) => {
                    const civSelectOptions = [
                        { value: "MME", label: `${this.props.t("civMadam")}` },
                        { value: "M", label: `${this.props.t("civMister")}` },
                        { value: "STE", label: `${this.props.t("civCompany")}`}
                    ];
                    const civsLabel = {
                        'M': civSelectOptions[1],
                        'MME': civSelectOptions[0],
                        'STE': civSelectOptions[2]
                    };

                    const updateNameAddOn = (
                        <span className="sign-up-personal-step-modal-addon" onClick={this.toggleModal}>
                            {this.props.t("namePopinButton")}
                        </span>
                    );
                    const { errors } = this.state;
                    return (
                        <div className={classnames({ "sign-up-personal-step": true, mobile: isMobile, "mobile-small": isMobileSmall, tablet: isTablet })}>
                            <WelcomeToMySuzukiModal email={this.props.UserEmail} onResendEmail={null} visible={this.state.isWelcomeModalVisible} />
                            <img alt="suzuki-logo" src={LOGO_MY_SUZUKI} className="sign-up-personal-step-logo" />
                            <h1 className="sign-up-personal-step-title">{this.props.t("title")}</h1>
                            <div className={classnames({ "sign-up-personal-step-header": true, mobile: isMobile, "mobile-small": isMobileSmall })}>{this.props.t("header")}</div>
                            <div className={classnames({ "sign-up-personal-step-form": true, mobile: isMobile, "mobile-small": isMobileSmall })}>
                                <div className={classnames({ "sign-up-personal-step-inputs-group": true, mobile: isMobile, tablet: isTablet })}>
                                    <div className="column">
                                        <Select
                                            dark
                                            initialOption={civsLabel[this.state.civ]}
                                            label={this.props.t("civ")}
                                            options={civSelectOptions}
                                            onOptionChanged={(v) => this.setState({ civ: v.value })}
                                        />
                                        <Text disabled transparent large required label={this.props.t("lastName")} initialValue={this.state.lastName} addOn={updateNameAddOn} />
                                        <Text
                                            transparent
                                            large
                                            required
                                            label={this.props.t("firstName")}
                                            initialValue={this.state.firstName}
                                            onValueChanged={(v) => this.setState({ firstName: v })}
                                            error={errors.firstName}
                                            errorMessage={errors.firstName ? this.props.t("firstNameError") : ""}
                                            maxlength={32}
                                        />
                                        <Text
                                            transparent
                                            large
                                            required
                                            multi
                                            initialValue={this.state.addressStreet}
                                            label={this.props.t("address")}
                                            placeholder={this.props.t("addressStreetPlaceholder")}
                                            onValueChanged={(v) => this.setState({ addressStreet: v })}
                                            error={errors.addressStreet}
                                            errorMessage={errors.addressStreet ? this.props.t("addressStreetError") : ""}
                                            maxlength={70}
                                        />
                                        <Text
                                            initialValue={this.state.addressAdditional1}
                                            transparent
                                            large
                                            multi
                                            placeholder={this.props.t("addressAdditional1")}
                                            onValueChanged={(v) => this.setState({ addressAdditional1: v })}
                                            maxlength={70}
                                        />
                                        <Text
                                            initialValue={this.state.addressAdditional2}
                                            transparent
                                            large
                                            placeholder={this.props.t("addressAdditional2")}
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
                                            label={this.props.t("addressZipCode")}
                                            onValueChanged={(v) => this.setState({ addressZipCode: v })}
                                            maxlength={5}
                                            error={errors.addressZipCode || errors.addressZipCodeFormat}
                                            errorMessage={errors.addressZipCode ? this.props.t("addressZipCodeError") : (errors.addressZipCodeFormat ? this.props.t("addressZipCodeFormatError") : "")}
                                        />
                                        <Text
                                            initialValue={this.state.addressCity}
                                            transparent
                                            large
                                            required
                                            label={this.props.t("addressCity")}
                                            onValueChanged={(v) => this.setState({ addressCity: v })}
                                            error={errors.addressCity}
                                            errorMessage={errors.addressCity ? this.props.t("addressCityError") : ""}
                                            maxlength={32}
                                        />
                                        <Text
                                            transparent
                                            large
                                            strongRequired
                                            initialValue={this.state.landlinePhone}
                                            label={this.props.t("landlinePhone")}
                                            inputTooltip={this.props.t("landlinePhoneTooltip")}
                                            isMobile={isMobile}
                                            onValueChanged={(v) => this.setState({ landlinePhone: v })}
                                            error={errors.landlinePhone || errors.phones}
                                            errorMessage={errors.landlinePhone ? this.props.t("landlinePhoneError") : ""}
                                        />
                                        <Text
                                            transparent
                                            large
                                            strongRequired
                                            initialValue={this.state.mobilePhone}
                                            label={this.props.t("mobilePhone")}
                                            inputTooltip={this.props.t("mobilePhoneTooltip")}
                                            isMobile={isMobile}
                                            onValueChanged={(v) => this.setState({ mobilePhone: v })}
                                            error={errors.mobilePhone || errors.phones}
                                            errorMessage={errors.mobilePhone ? this.props.t("mobilePhoneError") : errors.phones ? this.props.t("phonesError") : ""}
                                        />
                                        <Datepicker
                                            initialDate={this.state.dateOfBirth}
                                            transparent
                                            large
                                            required
                                            label={this.props.t("dateOfBirth")}
                                            icon={ICON_NAMES.CALENDAR}
                                            onDateChange={(v) => this.setState({ dateOfBirth: v })}
                                            maxDate={moment()}
                                            error={errors.dateOfBirth}
                                            errorMessage={errors.dateOfBirth ? this.props.t("dateOfBirthError") : ""}
                                        />
                                    </div>
                                </div>
                                <Checkbox id="optinSMS" label={this.props.t("optinSMS")} initialValue={this.state.optinSMS} onValueChanged={(v) => this.setState({ optinSMS: v })} />
                                { errors.optinSMS && (
                                    <div className="sign-up-personal-step-errors-container">
                                        <p className="sign-up-personal-step-error">{this.props.t("errors.smsOptin")}</p>
                                    </div>
                                )}
                                {this.props.Personal.get("loading") ? (
                                    <div className={"sign-up-personal-step-loader"}>
                                        <Loader />
                                    </div>
                                ) : (
                                    <Button primary large={isMobile} center onClick={this.submit} label={this.props.t("formButton")} />
                                )}
                            </div>
                            <div className="sign-up-personal-step-legalNotice">
                                <p className="legalNotice-required">{this.props.t("requiredField")}</p>
                                <p className="legalNotice-strong-required">{this.props.t("strongRequiredField")}</p>
                                <p>{this.props.t("legalNotice")}</p>
                                <p dangerouslySetInnerHTML={{__html: this.props.t("commitmentText")}}/>
                            </div>
                            <IssueModal
                                title={this.props.t("falseInformationModalTitleOnlyLastName")}
                                header={this.props.t("falseInformationModalHeader")}
                                name={this.props.User.get("lastName")}
                                vin={this.props.Vehicle.get("vin")}
                                email={this.props.UserEmail}
                                visible={this.state.isUpdateNameModalVisible}
                                onRequestClose={this.onRequestClose}
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
        Serial: state.SignUpProcess.Serial,
        Credential: state.SignUpProcess.Credential,
        Vehicule: state.SignUpProcess.Vehicule,
        Personal: state.SignUpProcess.Personal,
        isAuthenticated: AuthenticationUtils.isAuthenticated(state),
        hasCompletedTheSignUp: UserInformationsUtils.hasUserCompleteSignUpFromState(state),
        SerialIsValidated: SerialUtils.isValidated(state),
        CredentialIsValidated: CredentialUtils.isValidated(state),
        VehiculeIsValidated: SignUpProcessVehicleUtils.isValidated(state),
        Vehicle: UserVehiclesUtils.getUserFirstVehicleFromState(state),
        UserEmail: UserInformationsUtils.getUserEmailFromState(state),
        UserName: UserInformationsUtils.getUserNameFromState(state),
        User: UserInformationsUtils.getUserFromState(state)
    }),
    (dispatch) => ({
        submitPersonalStep: (stepValues) => dispatch(SignUpProcessPersonalActioner.submitStep(stepValues))
    })
)(Scene);
const TranslatedConnectedScene = translate("signupPersonal", { wait: true })(ReduxConnectedScene);
export { TranslatedConnectedScene as Scene };
