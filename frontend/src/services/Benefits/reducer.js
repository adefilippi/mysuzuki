import { List } from "immutable";
import { Statics } from "./statics";

const initialState = () => new List(Statics);

export const Reducer = (state = initialState(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};
