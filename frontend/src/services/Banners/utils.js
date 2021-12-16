export class Utils {
  static getBannersFromState(state) {
    const banners = state.Banners;

    return !Array.isArray(banners) ? banners.toJS() : banners;
  }
}
