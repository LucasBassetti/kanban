import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cards from './Cards';

class UnlabeledLane extends Component {
  constructor() {
    super();

    this.handleDeleteCard = this.handleDeleteCard.bind(this);
  }

  handleDeleteCard(cardId) {
    this.props.onDeleteCard(this.props.lane.id, cardId);
  }

  renderHeader() {
    const { lane } = this.props;

    return (
      <div className="options">
        <span className="label"> {lane.name} </span>
      </div>
    );
  }

  render() {
    const {
      lane,
      allCards,
      connectDropTarget,
      isOver,
    } = this.props;
    const laneCards = lane.cards
      .map(id => allCards.find(card => card.id === id))
      .filter(card => card); // filter out undefined cards

    const dropTarget = connectDropTarget(
      <div
        className="unlabeled-lane"
        style={{ opacity: isOver ? 0.8 : 1 }}
      >
        {this.renderHeader()}
        <Cards
          cards={laneCards}
          onDeleteCard={this.handleDeleteCard}
          onEditCard={this.props.onEditCard}
          onValueClick={this.props.onEditCard}
          onMoveCard={this.props.onMoveCard}
        />
      </div>,
    );

    return dropTarget;
  }
}

UnlabeledLane.propTypes = {
  allCards: PropTypes.array.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  lane: PropTypes.object.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  onEditCard: PropTypes.func.isRequired,
  onMoveCard: PropTypes.func.isRequired,
};

export default UnlabeledLane;
