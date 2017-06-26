import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from 'react-dd-menu';
import Cards from './Cards';
import { Add, MoreVert, Remove } from './icons';

class Lane extends Component {
  constructor() {
    super();

    this.state = {
      collapsed: false,
      isMenuOpen: false,
    };

    this.handleCreateCard = this.handleCreateCard.bind(this);
    this.handleDeleteLane = this.handleDeleteLane.bind(this);
    this.handleDeleteCard = this.handleDeleteCard.bind(this);
  }

  handleCreateCard() {
    this.props.onCreateCard(this.props.lane.id);
  }

  handleDeleteLane() {
    const lane = this.props.lane;
    this.props.onDeleteLane(lane.id);
    lane.cards.forEach(cardId => this.props.onDeleteCard(null, cardId));
  }

  handleDeleteCard(cardId) {
    this.props.onDeleteCard(this.props.lane.id, cardId);
  }

  renderOptions() {
    const { collapsed, isMenuOpen } = this.state;
    const { lane } = this.props;

    const menuOptions = {
      isOpen: isMenuOpen,
      close: () => this.setState({ isMenuOpen: false }),
      toggle: (
        <a onClick={() => this.setState({ isMenuOpen: !isMenuOpen })}>
          <MoreVert size={20} />
        </a>
      ),
      align: 'right',
    };

    return (
      <div className="options">
        <a
          className="toggle"
          onClick={() => this.setState({ collapsed: !collapsed })}
        >
          { collapsed ? <Add size={14} /> : <Remove size={14} /> }
        </a>
        <span className="name"> {lane.name} </span>
        <DropdownMenu
          className="more-options"
          {...menuOptions}
        >
          <li><a>Delete</a></li>
        </DropdownMenu>
      </div>
    );
  }

  render() {
    const { collapsed } = this.state;
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
        className={collapsed ? 'lane collapsed' : 'lane'}
        style={{ opacity: isOver ? 0.8 : 1 }}
      >
        { this.renderOptions() }
        <Cards
          cards={laneCards}
          onDeleteCard={this.handleDeleteCard}
          onEditCard={this.props.onEditCard}
          onValueClick={this.props.onEditCard}
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
  allCards: PropTypes.array.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  lane: PropTypes.object.isRequired,
  onCreateCard: PropTypes.func.isRequired,
  onDeleteLane: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  onEditCard: PropTypes.func.isRequired,
  onMoveCard: PropTypes.func.isRequired,
};

export default Lane;
