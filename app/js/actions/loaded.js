import {
  COMPLETE_LOAD,
} from '../constants/actionTypes';

function completeLoad() {
  return {
    type: COMPLETE_LOAD,
    payload: true,
  };
}

export default {
  completeLoad,
};
