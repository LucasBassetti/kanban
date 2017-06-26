import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isOver,
    } = this.props;

    const dropTarget = connectDropTarget(
      <li className={`card ${isOver ? 'dragging' : ''}`}>
        {this.props.children}
      </li>,
    );

    return connectDragSource(dropTarget);
  }
}

Card.propTypes = {
  children: PropTypes.node,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool,
};

Card.defaultProps = {
  children: undefined,
  isOver: undefined,
};

export default Card;
