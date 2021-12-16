import { Config } from "./config";

export class Utils {
  static toQueryString(obj) {
    var parts = [];
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        parts.push(i + "=" + obj[i]);
      }
    }
    return parts.join("&");
  }

  static toFormData(obj) {
    let data = new FormData();
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        data.append(i, obj[i]);
      }
    }
    return data;
  }

  static generateUrl(endpoint) {
      if (endpoint && (endpoint.indexOf("http") === 0)) {
          return endpoint;
      }

      if (endpoint && (endpoint[0] === "/")) {
          endpoint = endpoint.substr(1);
      }

      return Config.root + endpoint;
  }

  static unserializeCollection(data) {
    return data && data['hydra:member'];
  }

  static unserializePagination(data) {
    return data && data["hydra:view"] && data["hydra:view"]["hydra:next"];
  }

  static getCurrentBaseUrl(){
      return window.location.protocol + "//" + window.location.hostname + ( window.location.port ? ":" + window.location.port : "");
  }
}
