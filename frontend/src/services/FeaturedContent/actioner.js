import { AuthenticationUtils } from '../Authentication';
import { ActionTypes } from './actionTypes';
import { Api } from './api';
import { APIUtils } from '../Api';

export class Actioner {
  static resetFeaturedContents() {
    return {
      type: ActionTypes.RESET_FEATURED_CONTENTS
    }
  };

  static setFeaturedContents(featuredContents) {
    return {
      type: ActionTypes.SET_FEATURED_CONTENTS,
      featuredContents,
    };
  };

  static getFeaturedContents() {
    return (dispatch, getState) => {
      const accessToken = AuthenticationUtils.getAccessTokenFromState(getState());
      return Api.get(accessToken).then(data => {
        const contents = APIUtils.unserializeCollection(data);
        dispatch(Actioner.setFeaturedContents(contents));
        return Promise.resolve({
          featuredContents: contents
        });
      })
    }
  }
}
