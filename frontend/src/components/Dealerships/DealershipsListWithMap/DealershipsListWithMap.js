import React, { Component } from "react";
import propTypes from "prop-types";
import classnames from "classnames";
import { DeviceContextConsumer } from "../../../components";
import { DealershipsMap, DealershipList } from "../";
import GoogleMapsManager from '../../../services/GoogleMapsManager/GoogleMapsManager';
import "./DealershipsListWithMap.scss";

class DealershipsListWithMap extends Component {
    componentDidMount() {
      GoogleMapsManager.init();
    }

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isTablet }) => {
                    return (
                        <div className={classnames({ DealershipsListWithMap: true, mobile: isMobile, tablet: isTablet })}>
                            <div className={classnames({ "DealershipsListWithMap-list": true, mobile: isMobile, tablet: isTablet })}>
                                <DealershipList
                                    currentDealership={this.props.currentDealership}
                                    onDealershipChosen={this.props.onDealershipChosen}
                                    loading={this.props.loading}
                                    dealerships={this.props.dealerships}
                                />
                            </div>
                            <div className={classnames({ "DealershipsListWithMap-map": true, mobile: isMobile, tablet: isTablet })}>
                                <DealershipsMap
                                  center={this.props.center}
                                  dealerships={this.props.dealerships}
                                  currentDealership={this.props.currentDealership}
                                  onDealershipChosen={this.props.onDealershipChosen}
                                  onPlaceChanged={this.props.onPlaceChanged}
                                />
                            </div>
                        </div>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

DealershipsListWithMap.propTypes = {
    loading: propTypes.bool,
    center: propTypes.object,
    dealerships: propTypes.object.isRequired,
    currentDealership: propTypes.object,
    onDealershipChosen: propTypes.func
};

export { DealershipsListWithMap };
