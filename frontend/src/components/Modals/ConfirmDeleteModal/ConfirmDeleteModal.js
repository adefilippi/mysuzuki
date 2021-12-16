import React, { Component } from "react";
import { translate } from "react-i18next";
import classnames from "classnames";
import { connect } from "react-redux";

import { Modal } from "../components"
import { Button } from "../../Button";
import { DeviceContextConsumer } from "../../contexts";
import { MaintenancesActioner } from "../../../services";
import { Loader } from "../../Loader";

import "./ConfirmDeleteModal.scss";


class ConfirmDeleteModal extends Component {
    delete = () => {
        const { maintenance } = this.props;
        this.setState({loading: true}, () => this.props.remove(maintenance["@id"])
          .then(() => {
            this.setState({loading: false}, () => setTimeout(this.props.onRequestClose, 500));
          }).catch((e) => {
            this.setState({loading: false});
          })
        );
    };

    render() {
        return (
            <Modal visible={this.props.visible} onRequestClose={this.props.onRequestClose}>
                <DeviceContextConsumer>
                    {({ isMobile }) => (
                        <div className="confirm-delete-modal">
                            <h2 className="confirm-delete-modal-title">{this.props.t("deleteModal.title")}</h2>
                            { this.state && this.state.loading ? (
                                <div className="deals-loader">
                                    <Loader />
                                </div>
                            ) : (
                                <div className={classnames({
                                    "confirm-delete-modal-buttons": true,
                                    "mobile": isMobile
                                })}>
                                    <Button
                                        transparent
                                        onClick={this.props.onRequestClose}
                                        label={this.props.t("deleteModal.cancelButton")}
                                    />
                                    <Button
                                        tertiary
                                        onClick={this.delete}
                                        label={this.props.t("deleteModal.deleteButton")}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </DeviceContextConsumer>
            </Modal>
        );
    }
}

const connected = connect(
    () => ({}),
    (dispatch) => ({
        remove: (id) => dispatch(MaintenancesActioner.remove(id)),
    })
)(ConfirmDeleteModal);
const translated = translate("vehicle", { wait: true })(connected);
export { translated as ConfirmDeleteModal };
