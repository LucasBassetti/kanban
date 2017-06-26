import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import UnlabeledLane from '../components/UnlabeledLane';
import lanesActions from '../actions/lanes';
import cardsActions from '../actions/cards';
import * as itemTypes from '../constants/itemTypes';

const laneTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.lane.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;
    const sourceType = monitor.getItemType();
    if ((!targetProps.lane.cards.length) && sourceType === itemTypes.CARD) {
      targetProps.attachToLane(targetId, sourceId);
    } else if ((targetId !== sourceId) && (sourceType === itemTypes.LANE)) {
      targetProps.onMoveLane(sourceId, targetId);
    }
  },
};

const collectDropTarget = (DnDconnect, monitor) => ({
  connectDropTarget: DnDconnect.dropTarget(),
  isOver: monitor.isOver(),
});

const mapStateToProps = ({ cards }) => ({
  allCards: cards,
});

const mapDispatchToProps = dispatch => ({
  onCreateCard(laneId) {
    const newCard = cardsActions.createCard('New card');
    dispatch(newCard);
    dispatch(lanesActions.attachToLane(laneId, newCard.payload.id));
  },

  // Used both to detach a card from a lane and delete all the cards when a
  // lane is removed
  onDeleteCard(laneId, cardId) {
    dispatch(cardsActions.deleteCard(cardId));

    if (laneId) {
      dispatch(lanesActions.detachFromLane(laneId, cardId));
    }
  },

  onEditCard(cardId, value) {
    const updatedCard = {
      id: cardId,
    };

    if (value) {
      updatedCard.text = value;
      updatedCard.editing = false;
    } else {
      updatedCard.editing = true;
    }

    dispatch(cardsActions.updateCard(updatedCard));
  },

  onMoveCard(sourceId, targetId) {
    dispatch(lanesActions.move('card', sourceId, targetId));
  },

  attachToLane(laneId, cardId) {
    dispatch(lanesActions.attachToLane(laneId, cardId));
  },
});

const dropTarget = DropTarget(
  [itemTypes.CARD, itemTypes.LANE], laneTarget, collectDropTarget,
)(UnlabeledLane);

export default connect(mapStateToProps, mapDispatchToProps)(dropTarget);
