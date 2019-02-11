import { COMPILE } from "../actions/types";

const initialState = {
  result: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COMPILE:
      return {
        ...state,
        courses: action.payload
      };
    default:
      return state;
  }
}