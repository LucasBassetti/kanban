import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../containers/Card';
import Editable from './Editable';

class Cards extends Component {
  constructor() {
    super();

    this.renderCard = this.renderCard.bind(this);
  }

  renderCard(card) {
    return (
      <Card
        id={card.id}
        key={card.id}
        onMoveCard={this.props.onMoveCard}
      >
        <Editable
          editing={card.editing}
          id={card.id}
          value={card.text}
          onDelete={this.props.onDeleteCard}
          onEdit={this.props.onEditCard}
        />
      </Card>
    );
  }

  render() {
    const { cards } = this.props;

    return (
      <ul className="cards-list">
        {_.map(cards, this.renderCard)}
      </ul>
    );
  }
}

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  onEditCard: PropTypes.func.isRequired,
  onMoveCard: PropTypes.func.isRequired,
};

export default Cards;
