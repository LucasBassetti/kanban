import {
  LOAD_LABELS,
} from '../constants/actionTypes';
import { getLabels } from '../services/labels';

function loadLabels() {
  return {
    type: LOAD_LABELS,
    payload: getLabels(),
  };
}

export default {
  loadLabels,
};
