import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lane from '../containers/Lane';
import UnlabeledLane from '../containers/UnlabeledLane';
import { ArrowLeft, ArrowRight } from './icons';

class Lanes extends Component {
  constructor() {
    super();

    this.renderLane = this.renderLane.bind(this);

    this.state = {
      collapsed: false,
    };
  }

  renderUnlabeledLane(lane) {
    return (
      <UnlabeledLane
        key={lane.id}
        lane={lane}
        onEditLane={this.props.onEditLane}
        onDeleteLane={this.props.onDeleteLane}
        onMoveLane={this.props.onMoveLane}
      />
    );
  }

  renderLane(lane) {
    return (
      <Lane
        key={lane.id}
        lane={lane}
        onEditLane={this.props.onEditLane}
        onDeleteLane={this.props.onDeleteLane}
        onMoveLane={this.props.onMoveLane}
      />
    );
  }

  render() {
    const { collapsed } = this.state;
    const { lanes } = this.props;

    return (
      <div className={`${collapsed ? 'lanes collapsed' : 'lanes'}`}>
        <div className="unlabeled">
          { this.renderUnlabeledLane(lanes[0]) }
        </div>
        <div className="labeled">
          <a
            className="toggle"
            onClick={() => this.setState({ collapsed: !collapsed })}
          >
            { collapsed ? <ArrowRight /> : <ArrowLeft /> }
          </a>
          <div className="content">
            { _.map(lanes.slice(1, lanes.length), this.renderLane) }
          </div>
        </div>
      </div>
    );
  }
}

Lanes.propTypes = {
  lanes: PropTypes.array.isRequired,
  onEditLane: PropTypes.func.isRequired,
  onDeleteLane: PropTypes.func.isRequired,
  onMoveLane: PropTypes.func.isRequired,
};

export default Lanes;
