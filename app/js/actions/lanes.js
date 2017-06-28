import uuid from 'uuid';
import {
  ATTACH_TO_LANE,
  CREATE_LANE,
  DELETE_LANE,
  DETACH_FROM_LANE,
  LOAD_LANES,
  MOVE_LANE,
  MOVE_CARD,
  UPDATE_LANE,
} from '../constants/actionTypes';
import { loadAllLanes } from '../services/lanes';

function loadLanes() {
  return {
    type: LOAD_LANES,
    payload: loadAllLanes(),
  };
}

function createLane(labelId) {
  return {
    type: CREATE_LANE,
    payload: {
      id: uuid.v4(),
      labelId,
      collapsed: true,
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
  loadLanes,
  createLane,
  updateLane,
  deleteLane,
  attachToLane,
  detachFromLane,
  move,
};
