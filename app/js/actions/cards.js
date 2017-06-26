import uuid from 'uuid';
import {
  CREATE_CARD,
  DELETE_CARD,
  UPDATE_CARD,
} from '../constants/actionTypes';

function createCard(text) {
  return {
    type: CREATE_CARD,
    payload: {
      id: uuid.v4(),
      editing: false,
      text,
    },
  };
}

function updateCard(updatedCard) {
  return {
    type: UPDATE_CARD,
    payload: updatedCard,
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
  createCard,
  updateCard,
  deleteCard,
};
