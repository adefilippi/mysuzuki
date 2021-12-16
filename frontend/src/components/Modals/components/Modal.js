import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ReactModal from "react-responsive-modal";
import { ICON_NAMES, Icon } from "../../Icon";
import "./Modal.scss";

export class Modal extends Component {
    render() {
        return (
            <ReactModal
              showCloseIcon={false}
              open={this.props.visible}
              onClose={this.props.onRequestClose}
              center>
                <div className={classnames({
                  "modal": true,
                  "large": this.props.large,
                  "mobile": this.props.mobile
                })}>
                  <div className="modal-close">
                    <Icon onClick={this.props.onRequestClose} name={ICON_NAMES.CLOSING} size={"20px"} color={"#090909"} />
                  </div>
                  <div className="modal-content-overflow">
                    {this.props.children}
                  </div>
                </div>
            </ReactModal>
        );
    }
}

Modal.defaultProps = {
    large: false,
    onRequestClose: () => {},
    visible: false
};

Modal.propTypes = {
    large: PropTypes.bool,
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool
};
