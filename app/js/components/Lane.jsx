import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cards from './Cards';
import PlaceholderCards from './placeholders/Cards';
import LaneHeader from './LaneHeader';
import API from '../services';

class Lane extends Component {
  constructor() {
    super();

    this.state = {
      isMenuOpen: false,
      loading: true,
    };

    this.handleCreateCard = this.handleCreateCard.bind(this);
    this.handleDeleteCard = this.handleDeleteCard.bind(this);
    this.handleLoadCards = this.handleLoadCards.bind(this);
  }

  componentWillMount() {
    this.handleLoadCards();
  }

  handleLoadCards(labelId) {
    const { lane } = this.props;
    this.setState({ loading: true }, () => {
      API.getCards(labelId || lane.labelId).then((cards) => {
        lane.labelId = labelId || lane.labelId;
        lane.cards = cards;
        this.props.onEditLane(lane);
        this.setState({ loading: false });
      });
    });
  }

  handleCreateCard() {
    const { lane } = this.props;
    this.props.onCreateCard(lane.id, lane.labelId);
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
        onLoadCards={this.handleLoadCards}
        onDeleteCard={this.props.onDeleteLane}
        onDeleteLane={this.props.onDeleteLane}
        onEditLane={this.props.onEditLane}
      />
    );
  }

  render() {
    const { loading } = this.state;
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
        {
          loading ? (
            <PlaceholderCards />
          ) : (
            <Cards
              cards={laneCards}
              onDeleteCard={this.handleDeleteCard}
              onEditCard={this.props.onEditCard}
              onMoveCard={this.props.onMoveCard}
            />
          )
        }
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
