import { COMPILE } from "../actions/types";

const initialState = {
  result: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPILE:
      return {
        ...state,
        result: action.payload
      };
    default:
      return state;
  }
}