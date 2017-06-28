import uuid from 'uuid';
import {
  LOAD_CARDS,
  CREATE_CARD,
  DELETE_CARD,
  UPDATE_CARD,
  UPDATE_CARD_LABEL,
} from '../constants/actionTypes';
import { loadAllCards } from '../services/cards';

function loadCards() {
  return {
    type: LOAD_CARDS,
    payload: loadAllCards(),
  };
}

function createCard(text, labelId) {
  return {
    type: CREATE_CARD,
    payload: {
      id: uuid.v4(),
      editing: true,
      text,
      labelId,
    },
  };
}

function updateCard(updatedCard) {
  return {
    type: UPDATE_CARD,
    payload: updatedCard,
  };
}

function updateCardLabel(sourceId, targetId) {
  return {
    type: UPDATE_CARD_LABEL,
    payload: {
      sourceId,
      targetId,
    },
  };
}

function deleteCard(id) {
  return {
    type: DELETE_CARD,
    payload: {
      id,
    },
  };
}

export default {
  loadCards,
  createCard,
  updateCard,
  updateCardLabel,
  deleteCard,
};
