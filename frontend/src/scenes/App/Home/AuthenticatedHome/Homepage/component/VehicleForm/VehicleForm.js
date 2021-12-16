import React, { Component } from "react";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import { ICON_NAMES, Form, Select, Text } from "../../../../../../../components";
import { UserVehiclesUtils, UserVehiclesActioner, Validators } from "../../../../../../../services";

const TTL = 1000;

class VehicleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicle: props.vehicle,
            fields: {},
            errors: {},
            form: {},
        };
        this.submitButton = React.createRef();
    }

    handleValueChanged = (params) => {
        this.setState(params);

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(this.submit, TTL);
    };

    onVehicleChanged = (vehicle) => this.setState({ vehicle: this.props.vehicles.find((v) => v.get("@id") === vehicle.value), fields: {...this.state.fields, maxMileage: vehicle.mileage}}, () => this.props.onVehicleSelected(this.state.vehicle));

    submit = (event) => {
        const { mileage, annualMileage } = this.props;
        const { fields } = this.state;


        if (
            mileage === fields.mileage &&
            annualMileage === fields.annualMileage
        ) return;

        if (event) event.preventDefault();

        this.setState((state) => ({form: {...state.form, submitting: true}}), this.triggerSubmit);
    };

    triggerSubmit = () => {
        this.submitButton.current.click();
    };


    stopValidated = () => {
        this.setState((state) => ({form: {...state.form, isValid: false}}));
    };

    focusMileage = () => {
        this.setState((state) => ({form: {...state.form, mileage: true}}));
        this.mileageComponent.focusInput();
    };

    focusAnnualMileage = () => {
        this.setState((state) => ({form: {...state.form, annualMileage: true}}));
        this.annualMileageComponent.focusInput();
    };

    submitCallback = () => this.props
        .submit(this.state.vehicle.get("@id"), this.state.fields)
        .then(() => {
            this.setState(
                (prevState) => (
                    {form: {...prevState.form, submitting: false, isValid: true}}
                ),
                () => setTimeout(this.stopValidated, 2000)
            );
        })
        .catch(() => {
            this.setState((prevState) => ({form: {...prevState.form, submitting: false}}));
        })
    ;

    componentDidUpdate(prevProps, prevState) {
        if(this.state.vehicle !== prevState.vehicle) {
            this.setState({
                fields: {
                    annualMileage: this.state.vehicle.get("annualMileage") && this.state.vehicle.get("annualMileage").toString(),
                    mileage: this.state.vehicle.get("mileage") && this.state.vehicle.get("mileage").toString(),
                    maxMileage: this.state.vehicle.get("mileage") && this.state.vehicle.get("mileage").toString(),
                }
            });
        }
    }

    componentDidMount() {
        if(this.state.vehicle) {
            this.setState({
                fields: {
                    annualMileage: this.state.vehicle.get("annualMileage") && this.state.vehicle.get("annualMileage").toString(),
                    mileage: this.state.vehicle.get("mileage") && this.state.vehicle.get("mileage").toString(),
                    maxMileage: this.state.vehicle.get("mileage") && this.state.vehicle.get("mileage").toString(),
                }
            });
        }
    }

    render() {
        const vehicleSelectOptions = this.props.vehicles.toJS().map(vehicle => {
            return {
                value: vehicle["@id"],
                label: vehicle["model"],
            }});

        const {
            fields,
            errors,
            form,
        } = this.state;

        return (
            <Form
                submit={this.submitCallback}
                apiError={true}
                className="authenticated-home-infos-form-container"
                customButton
                fields={fields}
                validators={{
                    mileage: [Validators.notBlank ,{validator: (v) => Validators.dataLength({max:8}, v)}, Validators.isNumeric, {validator: (v) => Validators.greaterThan(v, this.state.fields.maxMileage)}],
                    annualMileage: [{validator: (v) => Validators.dataLength({max:8}, v)}, Validators.isNumeric]
                }}
                onSuccess={(state) => this.setState({form: {...form, submitting: false}, errors: state.errors})}
                onUpdate={(state) => this.setState({form: {...form, submitting: true, mileage: false, annualMileage: false}, errors: state.errors})}
                onError={(state) => this.setState({form: {...form, submitting: false}, errors: state.errors})}
            >
                <Select
                    initialOption={vehicleSelectOptions[0]}
                    label={this.props.t("vehicleSelect")}
                    options={vehicleSelectOptions}
                    large
                    onOptionChanged={this.onVehicleChanged}
                />
                <Text
                    icon={!form.mileage && ICON_NAMES.PENCIL}
                    label={this.props.t("vehicleMileage")}
                    initialValue={fields.mileage || ""}
                    large
                    onValueChanged={(v) => this.handleValueChanged((prevState) => ({ fields: { ...prevState.fields, mileage: v, }, form: {...prevState.form, valueChanged: "mileage"}}))}
                    loading={form.submitting && form.valueChanged === "mileage"}
                    isValid={form.valueChanged === "mileage" && !form.submitting && form.isValid}
                    pattern="^[0-9]{0,7}$"
                    type="number"
                    ref={child => this.mileageComponent = child}
                    disabled={!form.mileage}
                    onIconClick={this.focusMileage}
                    onBlur={() => {this.setState({form: {...form, mileage: false}})}}
                    name="mileage"
                    iconSize="20px"
                    boldLabel
                    error={errors.mileage}
                    errorMessage={errors.mileage ? this.props.t("mileageVehicleError") : ""}
                />
                <Text
                    icon={!form.annualMileage && ICON_NAMES.PENCIL}
                    label={this.props.t("vehicleKmPerYear")}
                    initialValue={fields.annualMileage || ""}
                    large
                    ref={child => this.annualMileageComponent = child}
                    disabled={!form.annualMileage}
                    onIconClick={this.focusAnnualMileage}
                    onBlur={() => {this.setState({form: {...form, annualMileage: false}})}}
                    name="annualMileage"
                    iconSize="20px"
                    loading={form.submitting && form.valueChanged === "annualMileage"}
                    onValueChanged={(v) => this.handleValueChanged({ fields: { ...fields, annualMileage: v, }, form: {...form, valueChanged: "annualMileage"}})}
                    pattern="^[0-9]{0,7}$"
                    type="number"
                    error={errors.annualMileage}
                    isValid={form.valueChanged === "annualMileage" && !form.submitting && form.isValid}
                    boldLabel
                />
                <button ref={this.submitButton} type="submit" hidden/>
            </Form>
        );
    }
}

const connected = connect(
    (state) => ({
        vehicles: UserVehiclesUtils.getUserVehiclesFromState(state),
        vehicle: UserVehiclesUtils.getUserFirstVehicleFromState(state),
    }),
    (dispatch) => ({
        submit: (id, values) => dispatch(UserVehiclesActioner.update(id, values))
    })
)(VehicleForm);
const translated = translate("authenticatedHome", { wait: true })(connected);
export { translated as VehicleForm };
