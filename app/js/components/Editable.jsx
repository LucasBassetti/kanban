import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from 'react-dd-menu';
import { MoreVert } from './icons';

export default class Editable extends Component {
  constructor() {
    super();

    this.state = {
      isMenuOpen: false,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleValueClick = this.handleValueClick.bind(this);
    this.handleFinishEdit = this.handleFinishEdit.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  handleValueClick() {
    this.props.onValueClick(this.props.id);
  }

  handleFinishEdit(e) {
    if ((e.type === 'keypress') && (e.key !== 'Enter')) {
      return;
    }

    const value = e.target.value;

    if (this.props.onEdit && value.trim().length) {
      this.props.onEdit(this.props.id, value);
    }
  }

  renderEdit() {
    return (
      <input
        type="textarea"
        autoFocus
        className="editing"
        defaultValue={this.props.value}
        onBlur={this.handleFinishEdit}
        onKeyPress={this.handleFinishEdit}
      />
    );
  }

  renderOptions() {
    const { isMenuOpen } = this.state;

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
      <DropdownMenu
        className="more-options"
        {...menuOptions}
      >
        <li><a onClick={this.handleDelete}>Delete</a></li>
      </DropdownMenu>
    );
  }

  renderValue() {
    return (
      <input
        type="text"
        onClick={this.handleValueClick}
        defaultValue={this.props.value}
        readOnly
      />
    );
  }

  render() {
    const { editing } = this.props;

    return (
      <span>
        { editing ? this.renderEdit() : this.renderValue() }
        { this.props.onDelete ? this.renderOptions() : null }
      </span>
    );
  }
}

Editable.propTypes = {
  editing: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func.isRequired,
  onValueClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

Editable.defaultProps = {
  editing: undefined,
  onDelete: undefined,
};
