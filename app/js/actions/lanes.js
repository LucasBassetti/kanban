import uuid from 'uuid';
import {
  ATTACH_TO_LANE,
  CREATE_LANE,
  DELETE_LANE,
  DETACH_FROM_LANE,
  MOVE_LANE,
  MOVE_CARD,
  UPDATE_LANE,
} from '../constants/actionTypes';

function createLane(name) {
  return {
    type: CREATE_LANE,
    payload: {
      id: uuid.v4(),
      name,
      cards: [],
    },
  };
}

function updateLane(updatedLane) {
  return {
    type: UPDATE_LANE,
    payload: updatedLane,
  };
}

function deleteLane(id) {
  return {
    type: DELETE_LANE,
    payload: {
      id,
    },
  };
}

function attachToLane(laneId, cardId) {
  return {
    type: ATTACH_TO_LANE,
    payload: {
      laneId,
      cardId,
    },
  };
}

function detachFromLane(laneId, cardId) {
  return {
    type: DETACH_FROM_LANE,
    payload: {
      laneId,
      cardId,
    },
  };
}

function move(target, sourceId, targetId) {
  return {
    type: target === 'card' ? MOVE_CARD : MOVE_LANE,
    payload: {
      sourceId,
      targetId,
    },
  };
}

export default {
  createLane,
  updateLane,
  deleteLane,
  attachToLane,
  detachFromLane,
  move,
};
