import React, { Component } from "react";
import "./DealershipsMap.scss";
import GoogleMapsManager from '../../../services/GoogleMapsManager/GoogleMapsManager';
import { greyColoredMapStyle } from '../../../services/GoogleMapsManager/Style';
import { DealershipsMarker } from "./DealershipsMarker/DealershipsMarker";
import { translate } from "react-i18next";

class DealershipsMap extends Component {
  constructor(props) {
      super(props);
      this.mapRef = React.createRef();
      this.onPlaceChanged = this._onPlaceChanged.bind(this);
      this.map = null;
      this.google = null;
      this.markers = [];
      this.parameters = {};
      this.circle = null;
  }

  componentDidMount() {
    this.renderMap();
  }

  render() {
    return (
      <div className="DealershipsMap">
        <div className="Map" ref={this.mapRef}>
          {this.props.dealerships.map((dealership, index) => {
            return <DealershipsMarker
              dealership={dealership}
              index={index}
              key={index}
              onDealershipChosen={this.props.onDealershipChosen}
              currentDealership={this.props.currentDealership}
              google={this.google}
              map={this.map}
              center={this.props.center}
            />
          })}
        </div>
      </div>
    )
  }

  renderMap() {
    this.parameters = {
      zoom: this.props.isMobile ? 8 : 9,
      center: this.props.center || { lat: -34.397, lng: 150.644 },
      styles: greyColoredMapStyle
    };

    GoogleMapsManager.initNewMap('DealershipsMap', this.mapRef.current, this.parameters)
      .then( res => {
        this.map = res.map;
        this.map.addListener('dragend', this.onPlaceChanged);
        this.map.addListener('zoom_changed', this.onPlaceChanged);
        this.google = res.googleLib;
      });
  }

  componentDidUpdate(oldProps) {
    if (this.map) {
      const newProps = this.props;
      const { Circle } = this.google.maps;

      // Update map position and Circle
      if(oldProps.center !== newProps.center) {
        this.map.panTo(newProps.center);

        if (this.circle) {
          this.circle.setMap(null);
        }

        this.circle = new Circle({
          map: this.map,
          center: newProps.center,
          radius: (GoogleMapsManager.getRadius(this.map.getZoom())) * 1000,
          fillOpacity: 0,
          strokeColor: '#003145',
          strokeWeight: 2,
        })
      }
    }
  }

  _onPlaceChanged() {
    const center = {
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng(),
    };

    const radius = GoogleMapsManager.getRadius(this.map.getZoom());

    GoogleMapsManager.getPlace(center).then((place) => {
      this.props.onPlaceChanged(center, place, radius);
    });
  }

}

const TranslatedDealershipsMap = translate("dealership", { wait: true })(DealershipsMap);
export { TranslatedDealershipsMap as DealershipsMap };
