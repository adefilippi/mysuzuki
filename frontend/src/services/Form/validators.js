//Validators must return false in case of no error
export class Validators {
    static notBlank(value) {
        return !value;
    }

    static email(value) {
        if (!value) {
            return false; // cant validate if no value, use notBlank to validate emptiness
        }

        return !value.match(/.+@.+\..+/);
    }

    static isNumeric(value) {
        if (!value) {
            return false; // cant validate if no value, use notBlank to validate emptiness
        }

        value = parseInt(value, 10);
        return !Number.isInteger(value) || value < 0;
    }

    static dataLength(params, value) {
        if (!value) {
            return false; // cant validate if no value, use notBlank to validate emptiness
        }

        if (params.min && Number.isInteger(params.min)) {
            return params.min > value.length;
        }

        if (params.max && Number.isInteger(params.max)) {
            return params.max < value.length;
        }

        return false;
    }

    static greaterThan(value, max) {
        return max > value;
    }

    static dateMax(value) {
        return value > Date.now();
    }

    static regex(regex, value) {
        if (!value) {
            return false; // cant validate if no value, use notBlank to validate emptiness
        }

        return !value.match(regex);
    }

    static vin(value) {
        return Validators.regex(/^[A-HJ-NPR-Z0-9]{17}$/i, value);
    }

    static confirmation(value, field, object) {
        if (!value) {
            return false; // cant validate if no value, use notBlank to validate emptiness
        }

        return value !== object.state.values[field];
    }

    static fileSize(value, size) {
        if (!value) {
            return false; // cant validate if no value, use notBlank to validate emptiness
        }

        return size * 1000000 < value.size;
    }
}
