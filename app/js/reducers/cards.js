import {
  CREATE_CARD,
  DELETE_CARD,
  UPDATE_CARD,
} from '../constants/actionTypes';

export default function cards(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CARD:
      return state.concat(payload);

    case UPDATE_CARD:
      return state.map((card) => {
        if (card.id === payload.id) {
          return Object.assign({}, card, payload);
        }
        return card;
      });

    case DELETE_CARD:
      return state.filter(card => card.id !== payload.id);

    default:
      return state;
  }
}
