import {
  COMPLETE_LOAD,
} from '../constants/actionTypes';

const defaultState = false;

const loadedReducer = (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMPLETE_LOAD:
      return payload;

    default:
      return state;
  }
};

export default loadedReducer;
