import { GoogleConfig } from "../Google/index";

class GoogleMapsManager {
  constructor() {
    this.libInjected = false;
    this._google = null;
    this._resolve = null;
    this._mapInstances = {};
    this.maxDistance = 25600;
  }

  init() {
    if (this.libInjected === false) {
      this.renderMap();
      this.libInjected = true;
    }
  }

  renderMap() {
    this.loadScript(`https://maps.googleapis.com/maps/api/js?key=${GoogleConfig.mapsApiKey}&libraries=places&callback=initGoogleLib`);
    window.initGoogleLib = () => this.initGoogleLib();
  }

  initGoogleLib() {
    this._google = window.google;
    if (typeof this._resolve === 'function') {
      this._resolve(this._google);
      this._resolve = null;
    }
  }

  getMapLib() {
    return new Promise((resolve) => {
      if(this._google) {
        resolve(this._google);
      } else {
        this._resolve = resolve;
      }
    })
  }

  getRadius(zoom) {
    return Math.min(this.maxDistance / Math.pow(2, zoom), 200);
  }

  getPlace(latLng) {
    return new Promise((resolve) => {
      const geocoder = new this._google.maps.Geocoder;

      geocoder.geocode({'location': latLng}, (results, status) => {
        if (status === "OK" && results.length > 0) {
          resolve(results[0]);
        }
      });
    });
  }

  loadScript(src) {
    const index = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
  }

  initNewMap(keyMap, domElt, mapParameters) {
    return new Promise( (resolve) => {
      this.getMapLib()
        .then(googleLib => {
          this._mapInstances[keyMap] = new googleLib.maps.Map(domElt, mapParameters);
          resolve({ map: this._mapInstances[keyMap], googleLib: googleLib});
          document.dispatchEvent(new CustomEvent('newGoogleMapInitialized', { detail: {keyMap} }))
        })
    });
  }

  getMapInstance(keyMap) {
    return new Promise((resolve, reject) => {

      if (this._mapInstances[keyMap]) {
        resolve({ map: this._mapInstances[keyMap], googleLib: this._google});
      } else {
        const handleEvent = evt => {
          if (evt.detail.keyMap === keyMap) {
            resolve({ map: this._mapInstances[keyMap], googleLib: this._google});
            document.removeEventListener('newGoogleMapInitialized', handleEvent)
          }
        };

        document.addEventListener('newGoogleMapInitialized', handleEvent);

        setTimeout(()=>{
          reject(new Error('No instance'));
          document.removeEventListener('newGoogleMapInitialized', handleEvent)
        }, 30000);
      }
    })
  }

  generateMarkerIcon(key, textColor, fillColor) {
    return {
      url: `data:image/svg+xml;utf-8, \
        <svg width="40" height="60" viewBox="0 -3 90 140" xmlns="http://www.w3.org/2000/svg"> \
            <path fill="${fillColor}" stroke="${encodeURIComponent('#003145')}" stroke-width="5px" d="M10705,4992s-41.9-41.65-42-72,19.1-47,42-47,42,17.35,42,46S10720.7,4976.33,10705,4992Z" transform="translate(-10661.5 -4871.5)" /> \
            <text x="${(key + 1) < 10 ? 32 : 20}" y="60" font-size="40" font-weight="600" font-family="Arial" fill="${textColor}">${(key + 1)}</text> \
        </svg>`
    };
  }
}

const Instance = new GoogleMapsManager();
export default Instance;
