import { fromJS } from "immutable";
import { Utils } from "./utils";

const initialState = () =>
  new fromJS({
    redirections: {
      [Utils.redirections.suzukifr]: "http://suzuki.fr",
      [Utils.redirections.masuzukifr]: "http://masuzuki.fr",
      [Utils.redirections.facebook]: "https://www.facebook.com/SuzukiFranceAutomobiles/",
      [Utils.redirections.youtube]: "https://www.youtube.com/channel/UCGlf1DJMwismCgLlGvF_rsw",
      [Utils.redirections.instagram]: "https://www.instagram.com/suzuki_france_auto/",
      [Utils.redirections.personalDataPolicy]: "https://www.suzuki.fr/donnees-personnelles",
      [Utils.redirections.termsOfService]: "/CGU_mysuzuki.pdf"
    },
  });

export const Reducer = (state = initialState(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};
