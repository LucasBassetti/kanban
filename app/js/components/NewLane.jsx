import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Add } from './icons';

class Lane extends Component {
  constructor() {
    super();

    this.createLane = this.createLane.bind(this);
  }

  createLane() {
    const { label } = this.props;
    const lane = this.props.onCreateLane(label.id);
    setTimeout(() => {
      lane.collapsed = false;
      this.props.onEditLane(lane);
    }, 100);
  }

  renderOptions() {
    return (
      <div className="options">
        <a
          className="toggle"
          onClick={() => this.createLane()}
        >
          <Add size={14} />
        </a>
        <span className="label"> Select label </span>
      </div>
    );
  }

  render() {
    return (
      <div className="lane collapsed new-lane">
        { this.renderOptions() }
      </div>
    );
  }
}

Lane.propTypes = {
  label: PropTypes.object.isRequired,
  onCreateLane: PropTypes.func.isRequired,
  onEditLane: PropTypes.func.isRequired,
};

export default Lane;
