import React, { Component } from "react";
import { Button, Loader } from "../";
import { FormUtils } from "../../services";
import PropTypes from 'prop-types';
import { translate } from "react-i18next";
import * as classnames from "classnames";
import './Form.scss';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: props.errors,
            form: props.fields,
            validators: props.validators
        };
    };

    onError = () => {
        this.setState({submitting: false, success: false});
        this.props.onError(this.state);
    };

    submit = () => {
        FormUtils.checkErrors(this.state, this).then(() => {
            this.props.onUpdate(this.state);
            this.props.submit(this.state.form)
                .then(() => {
                    this.setState({submitting: false, success: true});
                    this.props.onSuccess(this.state);
                })
                .catch((errors) => {
                    if (this.props.apiError) {
                        return FormUtils.parseApiErrors(errors, this).then(this.onError);
                    }

                    return this.onError();
                })
            ;
        }).catch(() => {
            this.onError();
        });
    };

    render = () => {
        const { isMobile, t, buttonProps, customButton, className } = this.props;

        return (
            <form
                className={classnames({...className})}
                onSubmit={(e) => {
                    e.preventDefault();
                    this.setState({form: this.props.fields, submitting: true}, () => this.submit())
                }}
            >
                {this.props.children}
                { !customButton && (
                    this.state.submitting ? (
                        <div className="center-loader">
                            <Loader />
                        </div>
                    ) : (
                        <Button type="submit" disabled={this.state.success} center large={isMobile} label={this.state.success ? t(this.props.successButton) : t(this.props.submitButton)} {...buttonProps}/>
                    )
                )}
            </form>
        );
    };
}

Form.defaultProps = {
    onSuccess: () => {},
    onError: () => {},
    onUpdate: () => {},
    submit: () => {},
    successButton: "buttons.success",
    submitButton: "buttons.submit",
    customButton: false,
    apiError: false,
    fields: {},
    validators: {},
    errors: {},
    buttonProps: {
         primary: true
    }
};

Form.propTypes = {
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    onUpdate: PropTypes.func,
    customButton: PropTypes.bool,
    apiError: PropTypes.bool,
};

const translated = translate("common", { wait: true })(Form);
export { translated as Form }
