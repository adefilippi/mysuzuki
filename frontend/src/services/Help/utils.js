import moment from "moment";

export class Utils {
    static formatValues(values){
        let clonedValues = JSON.parse(JSON.stringify(values));

        clonedValues.subject += " ";

        if (clonedValues.deleteNature) {
            clonedValues.subject += `[Cause: ${clonedValues.deleteNature}]`
        }

        if (clonedValues.date) {
            const date = moment(clonedValues.date).format('L');
            clonedValues.subject += `[Date: ${date}]`
        }

        return clonedValues;
    }
}
