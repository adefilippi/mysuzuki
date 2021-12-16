import React, { Component } from "react";
import classnames from "classnames";
import moment from "moment";
import { translate } from "react-i18next";
import {
    DeviceContextConsumer,
    Button,
    Infos,
    Text,
    Datepicker,
    Icon,
    ICON_NAMES,
    Link
} from "../../../../../../../components";
import { Validators } from "../../../../../../../services/Form/validators";
import { UserVehiclesActioner, FormUtils } from "../../../../../../../services";
import { connect } from "react-redux";

import "./VehiclesForm.scss";

const TTL = '750';

class VehiclesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            purchaseDate: false,
            annualMileage: false,
            mileage: false,
            maxMileage: false,
            registrationDate: false,
            errors: {
                purchaseDate: false,
                mileage: false,
                annualMileage: false
            },
            form: this.getInitialFormState(props),
            validators: {
                mileage: [Validators.notBlank,{validator: (v) => Validators.dataLength({max:8}, v)}, Validators.isNumeric, {validator: (v) => Validators.greaterThan(v, props.maxMileage)}],
                annualMileage: [{validator: (v) => Validators.dataLength({max:8}, v)}, Validators.isNumeric],
                purchaseDate: [{validator: (v) => Validators.dateMax(v)}]
            }
        };
        this.timeout = null;
    }

    getInitialFormState(props) {
         return  {
            purchaseDate: props.purchaseDate,
            mileage:  (props.mileage && props.mileage.toString()) || "",
            annualMileage: (props.annualMileage && props.annualMileage.toString()) || "",
            maxMileage: (props.maxMileage && props.maxMileage.toString()) || ""
        }
    }

    shouldComponentUpdate(nextProps) {
        if (
            this.props.vin !== nextProps.vin ||
            this.props.purchaseDate !== nextProps.purchaseDate ||
            this.props.mileage !== nextProps.mileage ||
            this.props.annualMileage !== nextProps.annualMileage ||
            this.props.maxMileage !== nextProps.maxMileage
        ) {
            this.state.form = this.getInitialFormState(nextProps);
        }
        return true;
    }

    handleValueChanged = (params) => {
        this.setState(params);

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(this.submit, TTL);
    };

    stopValidated = () => {
        this.setState({isValid: false});
    };

    focusMileage = () => {
        this.setState({mileage: true});
        this.mileageComponent.focusInput();
    };

    focusAnnualMileage = () => {
        this.setState({annualMileage: true});
        this.annualMileageComponent.focusInput();
    };

    submitCallback = () => this.props
        .submit(this.props.vin, this.state.form)
        .then(() => {
            this.setState({submitting: false, isValid: true});
            setTimeout(this.stopValidated, 2000);
        })
        .catch(() => {
            this.setState({submitting: false});
        })
    ;

    submit = (event) => {
        const { purchaseDate, mileage, annualMileage, maxMileage } = this.props;
        const { form } = this.state;

        if (
            purchaseDate === form.purchaseDate &&
            mileage === form.mileage &&
            annualMileage === form.annualMileage &&
            maxMileage <= form.mileage
        ) return;

        if (event) event.preventDefault();

        FormUtils.checkErrors(this.state, this).then(() => {
            this.setState({submitting: true});
            this.timeout = setTimeout(this.submitCallback, TTL);
        }).catch(() => {});
    };

    render() {
        const { errors } = this.state;

        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTablet }) => {
                    const responsive = { mobile: isMobile, "mobile-small": isMobileSmall, tablet: isTablet };
                    const { form, submitting, valueChanged, isValid, mileage, annualMileage, registrationDate } = this.state;
                    return (
                        <form className={classnames({ "my-vehicle-form": true , ...responsive})} onSubmit={this.submit}>
                            <div className="my-vehicle-form-inputs-group">
                                <Infos
                                    title={this.props.t("serialNumber")}
                                    text={this.props.vin || this.props.t("form.undefinedValue")}
                                />
                                <Infos
                                    title={this.props.t("form.registrationDate")}
                                    text={(this.props.registrationDate
                                    && new Date(this.props.registrationDate).toLocaleDateString("fr-FR"))
                                    || this.props.t("form.fundefinedValue")}
                                />
                                <Infos
                                    title={this.props.t("registrationNumber")}
                                    text={this.props.registration || this.props.t("form.fundefinedValue")}
                                />
                                {!!this.props.purchaseType &&
                                    <Infos
                                        title={this.props.t(`form.purchaseType${this.props.purchaseType}`)}
                                        text={""}
                                    />
                                }
                                <Button
                                    underline
                                    white
                                    label={this.props.t("form.uncorrectInformation")}
                                    onClick={this.props.infoErrorModal}
                                />
                                <Datepicker
                                    isValid={valueChanged === "date" && !submitting && isValid}
                                    onBlur={() => this.setState({date: false})}
                                    initialDate={form.purchaseDate}
                                    label={this.props.t("form.purchaseDate")}
                                    icon={ICON_NAMES.PENCIL}
                                    large={isMobile || isTablet}
                                    iconSize="20px"
                                    onDateChange={(v) => this.handleValueChanged({
                                        form: { ...form, purchaseDate: v, },
                                        valueChanged: "date"
                                    })}
                                    maxDate={moment()}
                                    error={errors.purchaseDate}
                                    errorMessage={errors.purchaseDate ? this.props.t("errors.purchaseDateError") : ""}
                                    loading={submitting && valueChanged === "date"}
                                />
                                <Text
                                    ref={(child) => this.mileageComponent = child}
                                    disabled={!mileage}
                                    onIconClick={this.focusMileage}
                                    onBlur={() => {this.setState({mileage: false})}}
                                    boldLabel
                                    figuresOnly
                                    large={isMobile || isTablet}
                                    name="mileage"
                                    value=""
                                    label={this.props.t("form.mileage")}
                                    initialValue={form.mileage}
                                    onValueChanged={(v) => this.handleValueChanged({
                                        form: { ...form, mileage: v, },
                                        valueChanged: "mileage"
                                    })}
                                    icon={!mileage && ICON_NAMES.PENCIL}
                                    iconSize="20px"
                                    pattern="^[0-9]{0,7}$"
                                    type="number"
                                    error={errors.mileage}
                                    errorMessage={errors.mileage ? this.props.t("errors.mileageError") : ""}
                                    loading={submitting && valueChanged === "mileage"}
                                    isValid={valueChanged === "mileage" && !submitting && isValid}
                                />
                                <Text
                                    ref={(child) => this.annualMileageComponent = child}
                                    disabled={!annualMileage}
                                    onIconClick={this.focusAnnualMileage}
                                    onBlur={() => {this.setState({annualMileage: false})}}
                                    boldLabel
                                    figuresOnly
                                    large={isMobile || isTablet}
                                    name="annualMileage"
                                    value=""
                                    label={this.props.t("form.annualMileage")}
                                    largeLabel={!isMobile && !isTablet}
                                    initialValue={form.annualMileage}
                                    icon={!annualMileage && ICON_NAMES.PENCIL}
                                    iconSize="20px"
                                    onValueChanged={(v) => this.handleValueChanged({
                                        form: { ...form, annualMileage: v, },
                                        valueChanged: "annualMileage"
                                    })}
                                    pattern="^[0-9]{0,7}$"
                                    type="number"
                                    error={errors.annualMileage}
                                    errorMessage={errors.annualMileage ? this.props.t("errors.annualMileageError") : ""}
                                    loading={submitting && valueChanged === "annualMileage"}
                                    isValid={valueChanged === "annualMileage" && !submitting && isValid}
                                />
                                { this.props.purchaseDealership && (
                                    <div>
                                        <Infos
                                            title={this.props.t("form.purchaseDealership")}
                                            text={this.props.purchaseDealership.get("name")}
                                        />
                                        { !this.props.purchaseDealership.get("closed") && (
                                            <Link
                                                white
                                                medium
                                                label={this.props.t("form.seeInformation")}
                                                attributes={{
                                                    href: this.props.purchaseDealership.get("moreInformationUrl"),
                                                    target: "_blank"
                                                }}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </form>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

VehiclesForm.defaultProps = {
    annualMileage: null
};

const ConnectedForm = connect(
    (state) => ({}),
    (dispatch) => ({
        submit: (vin, values) => dispatch(UserVehiclesActioner.updateUserVehicle(vin, values))
    }),
)(VehiclesForm);

const TranslatedVehiclesForm = translate("vehicle", { wait: true })(ConnectedForm);
export { TranslatedVehiclesForm as VehiclesForm };
