export class Utils {
    static checkErrors = (state, object) => {
        const { validators, form } = state || {};
        const newState = {};

        Object.keys(validators).map((field) => {
            const result = Utils.validate(validators[field], form[field]);
            newState.errors = {
                ...newState.errors,
                [field]: result.error
            };
            newState.errorMessage = {
                ...newState.errorMessage,
                [field]: result.message
            };
            return newState;
        });

        return new Promise((resolve, reject) => {
            object.setState(
                {...newState},
                Utils.hasError(newState.errors) ? reject(newState.errors) : resolve()
            );
        });
    };

    static parseApiErrors = (errors, object) => {
        let { violations } = errors;
        violations =  Object.values(violations || {});

        if (violations.length === 0) {
            return new Promise((resolve) => {
                object.setState(
                    {
                        errors: {global: true, message: errors.error_description},
                        errorMessage: {global: errors["hydra:description"]}
                    },
                    resolve()
                );
            });
        }

        violations.map((violation) => {
            return object.setState((prevState) => ({
                errors: {
                    ...prevState.errors,
                    [violation.propertyPath]: true,
                },
                errorMessage: {
                    ...prevState.errorMessage,
                    [violation.propertyPath]: violation.message,
                },
            }))
        });

        return Promise.resolve();
    };

    static validate(validators, field) {
        if(!validators) {
            return {
                error: false,
                message: "",
            };
        }

        if (typeof validators === "function") {
            return {
                error: validators(field),
            };
        }

        if (Array.isArray(validators)) {
            let errors;

            for (let validator in validators) {
                errors = Utils.validate(validators[validator], field);
                if(errors.error) {
                    return errors;
                }
            }

            return errors;
        }

        const error = validators.validator(field);

        return {
            error: error,
            message: error && validators.message,
        };
    }

    static hasError(errors) {
        for (let error in errors) {
            // don't validate global form error
            if(error === "global") continue;

            if (errors[error] !== null && typeof errors[error] === "object") {
                if (Utils.hasError(errors[error])) return true;
            } else if (errors[error]) {
                return true;
            }
        }

        return false;
    };
}
