import { XHTTP } from '../Api';

export class Api {
  static END_POINTS = {
    banners: '/api/banners',
  };

  static get(accessToken) {
    return XHTTP(this.END_POINTS.banners, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
