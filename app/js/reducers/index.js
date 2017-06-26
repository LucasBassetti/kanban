import { combineReducers } from 'redux';
import lanes from './lanes';
import cards from './cards';

export default combineReducers({
  lanes,
  cards,
});
