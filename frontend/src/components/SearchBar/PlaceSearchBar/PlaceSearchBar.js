import React, { Component } from "react";
import GoogleMapsManager from '../../../services/GoogleMapsManager/GoogleMapsManager';
import classnames from "classnames";
import { Icon, ICON_NAMES, Loader } from "../../";
import { translate } from "react-i18next";
import "./PlaceSearchBar.scss";

class PlaceSearchBar extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.onPlaceChanged = this._onPlaceChanged.bind(this);
    this.autocomplete = null;
    this.places = null;
    this.countryRestrict = {'country' : 'fr'};
    this.map = null;
    this.google = null;
    this.infoWindow = null;
    this.locationBlocked = false;
    this.loadingLocation = false;
    this.handleLocationError = this._handleLocationError.bind(this);
    this.onKeyUp = this._onKeyUp.bind(this);
    this.onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount() {
    GoogleMapsManager.getMapInstance('DealershipsMap').then( ({ googleLib, map }) => {
        this.map = map;
        this.google = googleLib;

        this.autocomplete = new googleLib.maps.places.Autocomplete(
          this.inputRef.current,
          {
            types: ['(cities)'],
            componentRestrictions: this.countryRestrict
          }
        );

        this.places = new googleLib.maps.places.PlacesService(map);

        this.autocomplete.addListener('place_changed', this.onPlaceChanged);
      });
  }

  _onKeyUp(event){
    if(event.target.value.length > 2 && event.key === 'Enter') {
      this._autoSelect()
    }
  }

  _onSubmit(){
    this._autoSelect();
  }

  _autoSelect(){
    const getKeyboardEvent = (key) => {
      if(typeof KeyboardEvent === 'function') {
        return new KeyboardEvent('keydown', { keyCode: key, which: key });
      }else {
        // if old ie 
        const oEvent = document.createEvent('KeyboardEvent');
        Object.defineProperty(oEvent, 'keyCode', {
          get() { return this.keyCodeVal; }
        });
        Object.defineProperty(oEvent, 'which', {
          get() { return this.keyCodeVal; }
        });
        if (oEvent.initKeyboardEvent) {
          oEvent.initKeyboardEvent(
            "keydown",
            true,
            true,
            document.defaultView,
            false,
            false,
            false,
            false,
            key,
            key
          );
        } else {
          oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, key, 0);
        }
        oEvent.keyCodeVal = key;
        if (oEvent.keyCode !== key) {
          console.log("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
        }
        return oEvent;
      } 
    }
    const items = document.querySelectorAll(".pac-item");
    if (items.length) {
      this.inputRef.current.dispatchEvent(getKeyboardEvent(40));
      this.inputRef.current.dispatchEvent(getKeyboardEvent(13));
    }
  }

  getLocation() {
    if (this.infoWindow) {
      this.infoWindow.close();
    }
    this.infoWindow = new this.google.maps.InfoWindow;
    this.loadingLocation = true;

    if (navigator.geolocation) {
      this.locationBlocked = false;

      navigator.geolocation.getCurrentPosition((position) => {
        const center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.infoWindow.setPosition(center);
        this.infoWindow.setContent('Location found.');
        this.infoWindow.open(this.map);

        const radius = GoogleMapsManager.getRadius(this.map.getZoom());

        GoogleMapsManager.getPlace(center).then((place) => {
          this.loadingLocation = false;
          this.props.onPlaceChanged(center, place, radius);
        });
      }, () => {
        this.loadingLocation = false;
        this.handleLocationError(true, this.infoWindow, this.map.getCenter());
      });
    } else {
      this.loadingLocation = false;
      this.handleLocationError(false, this.infoWindow, this.map.getCenter());
    }
  }

  render() {
    return (
      <div className="place-search-bar">
        <div className={classnames({ searchbar: true, large: this.props.large })}>
          <input ref={this.inputRef} type="text" className="searchbar-input" placeholder={this.props.placeholder} onKeyUp={this.onKeyUp} />
          {<Icon color={"#003145"} size={this.props.large ? "32px" : "25px"} name={ICON_NAMES.SEARCH} onClick={this.onSubmit} /> }
        </div>
        <div className={classnames({ "place-search-bar-locate": true, "location-not-available": this.locationBlocked })} onClick={(e) => this.getLocation(e)}>
          <span>{this.props.t("locate")}</span>
          { this.loadingLocation ? <Loader size={25} /> : <Icon name={ICON_NAMES.LOCALISER} color={"#003145"} size="25px" /> }
        </div>
      </div>
    )
  }

  _onPlaceChanged() {
    const place = this.autocomplete.getPlace();

    if (!place.geometry) {
      return null;
    }

    const center = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };

    const radius = GoogleMapsManager.getRadius(this.map.getZoom());

    this.props.onPlaceChanged(center, place, radius);
  }

  _handleLocationError(browserHasGeolocation, infoWindow, pos) {
    this.loadingLocation = false;
    this.locationBlocked = true;

    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      this.props.t("geolocation.errors.failed") :
      this.props.t("geolocation.errors.support")
    );
    infoWindow.open(this.map);
  }
}

const translatedEnhancedPlaceSearchBar = translate("search", { wait: true })(PlaceSearchBar);

export { translatedEnhancedPlaceSearchBar as PlaceSearchBar };
