import React, { Component } from "react";
import propTypes from "prop-types";
import "./DealershipsMarker.scss";
import { ICON_COLORS } from "../../../";
import GoogleMapsManager from '../../../../services/GoogleMapsManager/GoogleMapsManager';

class DealershipsMarker extends Component {
  constructor(props) {
    super(props);
    this.marker = null;
  }

  componentDidMount() {
    this.renderMarker();
  }

  render() {
    return (
      <div className="DealershipsMarker"></div>
    )
  }

  renderMarker() {
    const { Marker } = this.props.google.maps;

    const icon = GoogleMapsManager.generateMarkerIcon(
      this.props.index,
      this.getMarkerColor().text,
      this.getMarkerColor().fill,
    );

    const marker = new Marker(
      {
        position: {
          lat: parseFloat(this.props.dealership.get('coordinates').get('latitude')),
          lng: parseFloat(this.props.dealership.get('coordinates').get('longitude')),
        },
        map: this.props.map,
        icon: icon,
      }
    );

    marker.addListener('click', () => this.props.onDealershipChosen(this.props.dealership));

    this.marker = marker;

    return marker;
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;

    if (oldProps.currentDealership !== newProps.currentDealership) {
      this.marker.setMap(null);

      const icon = GoogleMapsManager.generateMarkerIcon(
        this.props.index,
        this.getMarkerColor().text,
        this.getMarkerColor().fill
      );

      this.marker.setIcon(icon);
      this.marker.setMap(this.props.map);
    }

    if (oldProps.center !== newProps.center) {
      this.marker.setMap(null);
    }
  }

  getMarkerColor() {
    const isCurrentDealership = this.props.dealership.get("externalId") === this.props.currentDealership.get("externalId");

    return {
      fill: isCurrentDealership ? encodeURIComponent(ICON_COLORS.PRIMARY) : "none",
      text: isCurrentDealership ? encodeURIComponent(ICON_COLORS.WHITE) : encodeURIComponent(ICON_COLORS.PRIMARY),
    };
  };
}

DealershipsMarker.defaultProps = {
  onDealershipChosen: (dealership) => {}
};

DealershipsMarker.propTypes = {
  onDealershipChosen: propTypes.func,
};

export { DealershipsMarker };
