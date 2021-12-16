import React, { Component } from "react";
import classnames from "classnames";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { animateScroll as scroll } from 'react-scroll';
import { DealershipInformation } from "./components";
import {
    DeviceContextConsumer,
    Loader,
    Icon,
    ICON_NAMES,
    ICON_COLORS,
    Button,
    PlaceSearchBar,
    DealershipMeetingRequestModal,
    DealershipsListWithMap,
    DealerShipMeetingRequestLink,
} from "../../../../../components";
import {
    NavigationActioner, DealershipsUtils, DealershipsActioner, GoogleUtils, UserDealershipActioner, UserDealershipUtils,
    UserInformationsActioner
} from "../../../../../services";
import { Modal } from "../../../../../utils";

import "./Scene.scss";

const MODAL_DEALERSHIP = "modalDealership";
const MODAL_RDV = "modalRDV";

class Scene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            [MODAL_DEALERSHIP]: false,
            [MODAL_RDV]: false,
            dealershipCenter: undefined,
            dealershipPlace: null,
            isUserDealershipDefined: this.isUserDealershipDefined(props.userDealership.toJS())
        };
        this.modalDealership = new Modal(this, MODAL_DEALERSHIP);
        this.modalRDV = new Modal(this, MODAL_RDV);
    }

    componentWillMount() {
        this.props.refreshUser();
    }

    _onPlaceChanged = (center, place, radius) => {
        this.setState({
              dealershipCenter: center,
              dealershipPlace: place
          }, () => {
            this.props.searchDealerships(this.state.dealershipCenter, radius);
        });
    };

    handleDealershipSelect = (dealership) => {
        if (this.props.userDealership.get("externalId") !== dealership.get("externalId")) {
          if (!this.state.isUserDealershipDefined) {
            this.setState({ isUserDealershipDefined: true });
          }
          scroll.scrollToTop({duration: 1000});
          setTimeout(() => this.props.updateUserDealership(dealership), 1000);
        }
    };

    isUserDealershipDefined = userDealership => {
        return userDealership && userDealership.name && !userDealership.closed;
    };

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isTablet }) => {
                    const responsive = { mobile: isMobile, tablet: isTablet };
                    let { userDealership } = this.props;
                    userDealership = userDealership.toJS();
                    const city = GoogleUtils.getLocalityFromAdressComponents(this.state.dealershipPlace);
                    return (
                        <div className={classnames({ "my-dealership": true, ...responsive })}>
                            <DealershipMeetingRequestModal
                                {...this.modalRDV.attr()}
                                phone={userDealership.phone}
                                email={userDealership.email}
                                onMailTo={this.props.onMailTo}
                                onPhone={this.props.onPhone}
                            />
                            {  this.state.isUserDealershipDefined && (
                                <div className={classnames({ "my-dealership-section": true, ...responsive })}>
                                    <h1 className={classnames({ "my-dealership-title": true, ...responsive })}>
                                        <Icon name={ICON_NAMES.PIN_LOC_ROUND} color={ICON_COLORS.SECONDARY} size="27px" />
                                        {this.props.t("title")}
                                    </h1>
                                    <div className={classnames({ "my-dealership-section-content section-dealership": true, ...responsive })}>
                                        <div className={classnames({ column: true, ...responsive })}>
                                            { userDealership.address ? (
                                                <DealershipInformation
                                                    title
                                                    dealershipName={userDealership.name}
                                                    dealershipAddress={userDealership.address}
                                                    dealershipPhone={userDealership.phone}
                                                    dealershipUrl={userDealership.moreInformationUrl}
                                                    link
                                                />
                                            ) : (
                                                <div className="my-dealership-loader">
                                                    <Loader />
                                                </div>
                                            )}
                                        </div>
                                        <div className={classnames({ column: true, ...responsive })}>
                                            <DealerShipMeetingRequestLink
                                                small={isMobile || isTablet }
                                            />
                                            <Button tertiary narrow={!isMobile} compact={isMobile} small={isMobile || isTablet} label={this.props.t("dealershipContactRequest")} onClick={this.modalRDV.openModal} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className={classnames({ "my-dealership-section wide": true, ...responsive })}>
                                <h2 className={classnames({ "my-dealership-section-title": true, ...responsive })}>{ (this.state.isUserDealershipDefined) || userDealership.loading ? this.props.t("dealershipSearchTitle") : this.props.t("dealershipSearchTitle2")}</h2>
                                <div className={classnames({ "my-dealership-section-content section-search": true, ...responsive })}>
                                    <PlaceSearchBar
                                      onPlaceChanged={this._onPlaceChanged}
                                      placeholder={this.props.t("city")}
                                      large={!isMobile} />
                                 </div>
                            </div>
                            <div className={classnames({ "my-dealership-section wide": true, ...responsive, "isHidden": !this.state.dealershipPlace })}>
                                <h2 className={classnames({ "my-dealership-section-title": true, ...responsive })}>
                                    {city ? this.props.t("yourDealershipsLocalized", { city: city}) : this.props.t("yourDealerships")}
                                </h2>
                                <DealershipsListWithMap
                                    currentDealership={this.props.userDealership}
                                    loading={this.props.dealershipsIsLoading}
                                    onDealershipChosen={this.handleDealershipSelect}
                                    center={this.state.dealershipCenter}
                                    dealerships={this.props.dealershipsSearch}
                                    onPlaceChanged={this._onPlaceChanged}
                                />
                            </div>
                        </div>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

Scene.propTypes = {};

const ReduxConnectedScene = connect(
    (state) => ({
        userDealership: UserDealershipUtils.getUserDealershipFromState(state),
        dealershipsSearch: DealershipsUtils.getDealershipListFromState(state),
        dealershipsIsLoading: DealershipsUtils.getDealershipsFromState(state).get("loading")
    }),
    (dispatch) => ({
        updateUserDealership: (dealership) => dispatch(UserDealershipActioner.updateUserDealership(dealership)),
        onMailTo: (email) => dispatch(NavigationActioner.onMailTo(email)),
        onPhone: (phone) => dispatch(NavigationActioner.onPhone(phone)),
        searchDealerships: (center, radius) => dispatch(DealershipsActioner.getDealershipsAroundLocation(center, radius)),
        refreshUser: () => dispatch(UserInformationsActioner.getUserInformations()),
    })
)(Scene);
const TranslatedConnectedScene = translate("dealership", { wait: true })(ReduxConnectedScene);
export { TranslatedConnectedScene as Scene };
