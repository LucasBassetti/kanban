import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import Lane from '../components/Lane';
import lanesActions from '../actions/lanes';
import cardsActions from '../actions/cards';
import * as itemTypes from '../constants/itemTypes';

const laneSource = {
  beginDrag(props) {
    const item = {
      id: props.lane.id,
    };

    return item;
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  },
};

const laneTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.lane.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;
    const sourceType = monitor.getItemType();
    const labelId = targetProps.lane.labelId;
    if ((!targetProps.lane.cards.length) && sourceType === itemTypes.CARD) {
      targetProps.attachToLane(targetId, sourceId, labelId);
    } else if ((targetId !== sourceId) && (sourceType === itemTypes.LANE)) {
      targetProps.onMoveLane(sourceId, targetId);
    }
  },
};

const collectDragSource = (DnDconnect, monitor) => ({
  connectDragSource: DnDconnect.dragSource(),
  connectDragPreview: DnDconnect.dragPreview(),
  isDragging: monitor.isDragging(),
});

const collectDropTarget = (DnDconnect, monitor) => ({
  connectDropTarget: DnDconnect.dropTarget(),
  isOver: monitor.isOver(),
});

const mapStateToProps = ({ cards }) => ({
  allCards: cards,
});

const mapDispatchToProps = dispatch => ({
  onLoadCards(laneId) {
    dispatch(lanesActions.loadCards(laneId));
  },

  onCreateCard(laneId, labelId) {
    const newCard = cardsActions.createCard('New Card', labelId);
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
    }

    dispatch(cardsActions.updateCard(updatedCard));
  },

  onMoveCard(sourceId, targetId) {
    dispatch(cardsActions.updateCardLabel(sourceId, targetId));
    dispatch(lanesActions.move('card', sourceId, targetId));
  },

  attachToLane(laneId, cardId, labelId) {
    const updatedCard = {
      id: cardId,
      labelId,
    };

    dispatch(cardsActions.updateCard(updatedCard));
    dispatch(lanesActions.attachToLane(laneId, cardId));
  },
});

const dropTarget = DropTarget(
  [itemTypes.CARD, itemTypes.LANE], laneTarget, collectDropTarget,
)(Lane);
const dragSource = DragSource(
  itemTypes.LANE, laneSource, collectDragSource,
)(dropTarget);

export default connect(mapStateToProps, mapDispatchToProps)(dragSource);
