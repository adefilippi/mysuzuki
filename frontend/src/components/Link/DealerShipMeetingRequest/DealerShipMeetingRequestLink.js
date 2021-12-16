import React, { Component } from 'react';
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { Link } from '../Link';

import { UserDealershipUtils } from "../../../services";

class DealerShipMeetingRequestLink extends Component {
    render() {
        const {
            small,
            compact,
            medium,
            userDealership,
            user,
            secondary,
            tertiary,
        } = this.props;

        const codeCE = userDealership.get('externalId');
        const idCRM = user.Informations && user.Informations.get('externalId');
        let url = null;

        if (codeCE && idCRM) {
            url = `https://atelier.suzuki.fr/auto/?origine=mySUZUKI&Geo=${codeCE}&id_client=${idCRM}`;
        }

        return url && (
            <Link
                attributes={{
                    href: url,
                    target: "_blank",
                }}
                label={this.props.t("workshopMeetingRequest")}
                button
                small={small}
                medium={medium}
                compact={compact}
                secondary={secondary}
                tertiary={tertiary}
            />
        );
    }
}

DealerShipMeetingRequestLink.defaultProps = {
    small: false,
    compact: false,
    medium: false,
    secondary: false,
    tertiary: false,
};

const ReduxConnectedScene = connect(
    (state) => ({
        userDealership: UserDealershipUtils.getUserDealershipFromState(state),
        user: state.User,
    }),
)(DealerShipMeetingRequestLink);
const TranslatedComponent = translate("dealership", { wait: true })(ReduxConnectedScene);
export { TranslatedComponent as DealerShipMeetingRequestLink };
