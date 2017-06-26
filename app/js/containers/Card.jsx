import { DragSource, DropTarget } from 'react-dnd';
import Card from '../components/Card';
import * as itemTypes from '../constants/itemTypes';

const cardSource = {
  beginDrag(props) {
    const item = {
      id: props.id,
    };

    return item;
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  },
};

const cardTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if (sourceId !== targetId) {
      targetProps.onMoveCard(sourceId, targetId);
    }
  },
};

const collectDragSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const collectDropTarget = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

const dropTarget = DropTarget(
  itemTypes.CARD, cardTarget, collectDropTarget,
)(Card);

const dragSource = DragSource(
  itemTypes.CARD, cardSource, collectDragSource,
)(dropTarget);

export default dragSource;
