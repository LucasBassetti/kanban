import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from 'react-dd-menu';
import Dialog from './common/Dialog';
import { Add, MoreVert, Remove } from './icons';

class Lane extends Component {
  constructor() {
    super();

    this.state = {
      isMenuOpen: false,
      opened: false,
    };

    this.handleDeleteLane = this.handleDeleteLane.bind(this);
    this.handleLoadCards = this.handleLoadCards.bind(this);
  }

  handleDeleteLane() {
    const lane = this.props.lane;
    this.props.onDeleteLane(lane.id);
    lane.cards.forEach(cardId => this.props.onDeleteCard(null, cardId));
  }

  handleLoadCards(event) {
    const labelId = event.target.value;
    this.props.onLoadCards(labelId);
  }

  toggleLane() {
    const { lane } = this.props;
    lane.collapsed = !lane.collapsed;
    this.props.onEditLane(lane);
  }

  render() {
    const { opened, isMenuOpen } = this.state;
    const { lane, label, labels } = this.props;

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
    const toggleIcon = lane.collapsed ? (
      <Add size={14} />
    ) : (
      <Remove size={14} />
    );

    const options = labels.map(lb => (
      <option
        key={lb.id}
        value={lb.id}
      >
        {lb.value}
      </option>
    ));

    return (
      <div className="options">
        <a
          className="toggle"
          onClick={() => this.toggleLane()}
        >
          { toggleIcon }
        </a>
        <div className="label">
          <select
            className="select"
            defaultValue={label.id}
            disabled={lane.collapsed}
            onChange={this.handleLoadCards}
          >
            { options }
          </select>
        </div>
        <DropdownMenu
          className="more-options"
          {...menuOptions}
        >
          <li>
            <a onClick={() => this.setState({ opened: true })}>
              Delete
            </a>
          </li>
        </DropdownMenu>
        <Dialog
          opened={opened}
          title="Delete Lane"
          message="Are you sure to delete this lane?"
          onConfirm={() => this.handleDeleteLane()}
          onCancel={() => this.setState({ opened: false })}
        />
      </div>
    );
  }
}

Lane.propTypes = {
  label: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired,
  lane: PropTypes.object.isRequired,
  onLoadCards: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  onDeleteLane: PropTypes.func.isRequired,
  onEditLane: PropTypes.func.isRequired,
};

export default Lane;
