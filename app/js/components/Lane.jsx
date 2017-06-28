import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cards from './Cards';
import LaneHeader from './LaneHeader';

class Lane extends Component {
  constructor() {
    super();

    this.state = {
      isMenuOpen: false,
    };

    this.handleCreateCard = this.handleCreateCard.bind(this);
    this.handleDeleteCard = this.handleDeleteCard.bind(this);
  }

  handleCreateCard() {
    this.props.onCreateCard(this.props.lane.id);
  }

  handleDeleteCard(cardId) {
    this.props.onDeleteCard(this.props.lane.id, cardId);
  }

  renderHeader() {
    const { lane, label, labels } = this.props;

    return (
      <LaneHeader
        label={label}
        labels={labels}
        lane={lane}
        onDeleteCard={this.props.onDeleteLane}
        onDeleteLane={this.props.onDeleteLane}
        onEditLane={this.props.onEditLane}
      />
    );
  }

  render() {
    const {
      lane,
      allCards,
      connectDragSource,
      connectDropTarget,
      isOver,
    } = this.props;
    const laneCards = lane.cards
      .map(id => allCards.find(card => card.id === id))
      .filter(card => card); // filter out undefined cards

    const dragSource = connectDragSource(
      <div
        className={lane.collapsed ? 'lane collapsed' : 'lane'}
        style={{ opacity: isOver ? 0.8 : 1 }}
      >
        { this.renderHeader() }
        <Cards
          cards={laneCards}
          onDeleteCard={this.handleDeleteCard}
          onEditCard={this.props.onEditCard}
          onMoveCard={this.props.onMoveCard}
        />
        <a
          className="add-card"
          onClick={this.handleCreateCard}
        >
          + Add Card
        </a>
      </div>,
    );

    return connectDropTarget(dragSource);
  }
}

Lane.propTypes = {
  label: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired,
  allCards: PropTypes.array.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  lane: PropTypes.object.isRequired,
  onCreateCard: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  onDeleteLane: PropTypes.func.isRequired,
  onEditCard: PropTypes.func.isRequired,
  onEditLane: PropTypes.func.isRequired,
  onMoveCard: PropTypes.func.isRequired,
};

export default Lane;
