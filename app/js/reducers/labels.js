import {
  LOAD_LABELS,
} from '../constants/actionTypes';

const defaultState = [];

const labelsReducer = (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_LABELS:
      return payload;

    default:
      return state;
  }
};

export default labelsReducer;
