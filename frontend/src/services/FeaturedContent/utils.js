export class Utils {
  static getFeaturedContentsFromState(state) {
    const contents = state.FeaturedContents;
    return !Array.isArray(contents) ? contents.toJS() : contents;
  }
}
