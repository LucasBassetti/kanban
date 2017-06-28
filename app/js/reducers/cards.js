import {
  LOAD_CARDS,
  CREATE_CARD,
  DELETE_CARD,
  UPDATE_CARD,
  UPDATE_CARD_LABEL,
} from '../constants/actionTypes';

export default function cards(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_CARDS:
      return payload;

    case CREATE_CARD: {
      return state.concat(payload);
    }

    case UPDATE_CARD:
      return state.map((card) => {
        if (card.id === payload.id) {
          return Object.assign({}, card, payload);
        }
        return card;
      });

    case UPDATE_CARD_LABEL: {
      const targetCard = state.filter(card => card.id === payload.targetId)[0];
      return state.map((card) => {
        if (card.id === payload.sourceId) {
          return Object.assign({}, card, { labelId: targetCard.labelId });
        }
        return card;
      });
    }

    case DELETE_CARD:
      return state.filter(card => card.id !== payload.id);

    default:
      return state;
  }
}
