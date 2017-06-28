import update from 'react-addons-update';
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

const defaultState = [];

const lanesReducer = (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_LANES:
      return payload;

    case CREATE_LANE:
      return state.concat(payload);

    case UPDATE_LANE:
      return state.map((lane) => {
        if (lane.id === payload.id) {
          return Object.assign({}, lane, payload);
        }

        return lane;
      });

    case DELETE_LANE:
      return state.filter(lane => lane.id !== payload.id);

    case ATTACH_TO_LANE: {
      const laneId = payload.laneId;
      const cardId = payload.cardId;
      let cardIndex;

      return state.map((lane) => {
        cardIndex = lane.cards.indexOf(cardId);
        if (cardIndex >= 0) {
          return Object.assign({}, lane, {
            cards: lane.cards.filter(id => id !== cardId),
          });
        }

        if (lane.id === laneId) {
          return Object.assign({}, lane, {
            cards: lane.cards.concat(cardId),
          });
        }

        return lane;
      });
    }

    case DETACH_FROM_LANE: {
      const laneId = payload.laneId;
      const cardId = payload.cardId;

      return state.map((lane) => {
        if (lane.id === laneId) {
          return Object.assign({}, lane, {
            cards: lane.cards.filter(id => id !== cardId),
          });
        }

        return lane;
      });
    }

    case MOVE_CARD: {
      const sourceId = payload.sourceId;
      const targetId = payload.targetId;
      const sourceLane = state.filter(lane => lane.cards.indexOf(sourceId) >= 0)[0];
      const targetLane = state.filter(lane => lane.cards.indexOf(targetId) >= 0)[0];
      const sourceCardIndex = sourceLane.cards.indexOf(sourceId);
      const targetCardIndex = targetLane.cards.indexOf(targetId);

      if (sourceLane.id === targetLane.id) {
        return state.map((lane) => {
          if (lane.id === sourceLane.id) {
            return Object.assign({}, lane, {
              cards: update(sourceLane.cards, {
                $splice: [
                  [sourceCardIndex, 1],
                  [targetCardIndex, 0, sourceId],
                ],
              }),
            });
          }

          return lane;
        });
      }

      return state.map((lane) => {
        if (lane.id === sourceLane.id) {
          return Object.assign({}, lane, {
            cards: update(lane.cards, {
              $splice: [[sourceCardIndex, 1]],
            }),
          });
        }

        if (lane.id === targetLane.id) {
          return Object.assign({}, lane, {
            cards: update(lane.cards, {
              $splice: [[targetCardIndex, 0, sourceId]],
            }),
          });
        }

        return lane;
      });
    }

    case MOVE_LANE: {
      const sourceId = payload.sourceId;
      const targetId = payload.targetId;
      const sourceLane = state.find(lane => lane.id === sourceId);
      const sourceLaneIndex = state.findIndex(lane => lane.id === sourceId);
      const targetLaneIndex = state.findIndex(lane => lane.id === targetId);

      if (sourceLaneIndex > 0 && targetLaneIndex > 0) {
        return update(state, {
          $splice: [
            [sourceLaneIndex, 1],
            [targetLaneIndex, 0, sourceLane],
          ],
        });
      }

      return state;
    }

    default:
      return state;
  }
};

export default lanesReducer;
