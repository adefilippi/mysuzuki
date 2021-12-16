import { XHTTP } from '../Api';

export class Api {
  static END_POINTS = {
    featuredContents: '/api/featured-contents'
  }

  static get(accessToken) {
    return XHTTP(this.END_POINTS.featuredContents, {
          method: 'get',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
    )
  }
}
