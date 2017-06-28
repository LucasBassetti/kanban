import { combineReducers } from 'redux';
import labels from './labels';
import lanes from './lanes';
import cards from './cards';

export default combineReducers({
  labels,
  lanes,
  cards,
});
