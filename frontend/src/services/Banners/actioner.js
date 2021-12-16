import { AuthenticationUtils } from '../Authentication';
import { ActionTypes } from './actionTypes';
import { Api } from './api';
import { APIUtils } from '../Api';

export class Actioner {
  static resetBanners() {
    return {
      type: ActionTypes.RESET_BANNERS,
    };
  }

  static setBanners(banners) {
    return {
      type: ActionTypes.SET_BANNERS,
      banners,
    };
  }

  static getBanners() {
    return (dispatch, getState) => {
      const accessToken = AuthenticationUtils.getAccessTokenFromState(getState());

      return Api.get(accessToken).then((data) => {
        const contents = APIUtils.unserializeCollection(data);

        dispatch(Actioner.setBanners(contents));

        return Promise.resolve({
          banners: contents,
        });
      });
    };
  }
}
