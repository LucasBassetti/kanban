import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from 'react-dd-menu';
import Dialog from './common/Dialog';
import { MoreVert } from './icons';

class Editable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
      opened: false,
      editing: props.editing || false,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleValueClick = this.handleValueClick.bind(this);
    this.handleFinishEdit = this.handleFinishEdit.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  handleValueClick() {
    this.setState({ editing: true });
  }

  handleFinishEdit(e) {
    if ((e.type === 'keypress') && (e.key !== 'Enter')) {
      return;
    }

    const value = e.target.value;

    if (this.props.onEdit && value.trim().length) {
      this.props.onEdit(this.props.id, value);
      this.setState({ editing: false });
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
    const { opened, isMenuOpen } = this.state;

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
      <div>
        <DropdownMenu
          className="more-options"
          {...menuOptions}
        >
          <li>
            <a
              className="delete"
              onClick={() => this.setState({ opened: true })}
            >
              Delete
            </a>
          </li>
        </DropdownMenu>
        <Dialog
          opened={opened}
          title="Delete Card"
          message="Are you sure to delete this card?"
          onConfirm={() => this.handleDelete()}
          onCancel={() => this.setState({ opened: false })}
        />
      </div>
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
    const { editing } = this.state;

    return (
      <span>
        { editing ? this.renderEdit() : this.renderValue() }
        { this.renderOptions() }
      </span>
    );
  }
}

Editable.propTypes = {
  editing: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  value: PropTypes.string,
};

Editable.defaultProps = {
  editing: undefined,
  value: undefined,
};

export default Editable;
