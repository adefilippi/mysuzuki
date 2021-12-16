import React, { Component } from "react";
import { translate } from "react-i18next";
import { Textarea, Text, DeviceContextConsumer, Icon, ICON_NAMES, Modal, Datepicker, Form } from "../../";
import { Validators, MaintenancesActioner } from "../../../services";
import classnames from "classnames";
import moment from "moment";
import { connect } from "react-redux";

class MaintenanceModal extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(props);
        this.timeout = null;
    }

    initialState = (props) => {
        return {
            fields: {
                vehicle: props.vehicle
            },
            errors: {},
        };
    };

    onRequestClose = () => {
        this.props.onRequestClose();
        this.setState(this.initialState(this.props));
    };

    componentDidUpdate(prevProps) {
        if (!prevProps.visible && this.props.visible) {
            this.setState(this.initialState(this.props));
        }
    }

    render() {
        const { maintenance, t } = this.props;
        const { fields, errors } = this.state;

        fields.date = fields.date || (maintenance ? moment(maintenance.date) : undefined);
        fields.type = fields.type || (maintenance ? maintenance.type : "");
        fields.place = fields.place || (maintenance ? maintenance.place : "");

        return (
            <DeviceContextConsumer>
                {({ isMobile }) => (
                    <Modal visible={this.props.visible} onRequestClose={this.onRequestClose} mobile={isMobile}>
                        <div className="false-information-modal">
                            <div className={classnames({"false-information-modal-title": true, mobile: isMobile})}>
                                {t("maintenanceModal.title." + (maintenance ? "update": "create"))}
                            </div>
                            <div className={classnames({"false-information-modal-fields": true, mobile: isMobile})}>
                                <Form
                                    submit={(values) => maintenance ? this.props.update(maintenance["@id"], values) : this.props.create(values)}
                                    validators={{
                                        type: Validators.notBlank,
                                        date: Validators.notBlank,
                                        place: Validators.notBlank,
                                    }}
                                    fields={fields}
                                    onError={(state) => this.setState(state)}
                                    onSuccess={this.onRequestClose}
                                    isMobile={isMobile}
                                >
                                    <Datepicker
                                        transparent
                                        required
                                        large
                                        isBottom
                                        label={t("maintenanceModal.dateFieldLabel")}
                                        icon={ICON_NAMES.CALENDAR}
                                        onDateChange={(v) => this.setState({fields: { ...fields, date: v }})}
                                        initialDate={fields.date}
                                        error={errors.date}
                                    />
                                    <Textarea
                                        required
                                        large
                                        onValueChanged={(v) => this.setState({fields: { ...fields, type: v }})}
                                        transparent
                                        initialValue={fields.type}
                                        label={t("maintenanceModal.typeFieldLabel")}
                                        cols="45"
                                        rows="5"
                                        error={errors.type}
                                    />
                                    <Text
                                        onValueChanged={(v) => this.setState({fields: { ...fields, place: v }})}
                                        initialValue={fields.place}
                                        large
                                        required
                                        id="place"
                                        name="place"
                                        transparent
                                        label={t("maintenanceModal.placeFieldLabel")}
                                        error={errors.place}
                                    />
                                </Form>
                            </div>
                        </div>
                    </Modal>
                )}
            </DeviceContextConsumer>
        );
    }
}

const connected = connect(
    (state) => ({}),
    (dispatch) => ({
        update: (id, values) => dispatch(MaintenancesActioner.update(id, values)),
        create: (values) => dispatch(MaintenancesActioner.create(values)),
    })
)(MaintenanceModal);
const translated = translate("vehicle", { wait: true })(connected);
export { translated as MaintenanceModal };
