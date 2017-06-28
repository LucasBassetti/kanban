import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lane from '../containers/Lane';
import UnlabeledLane from '../containers/UnlabeledLane';
import NewLane from './NewLane';
import { ArrowLeft, ArrowRight } from './icons';

class Lanes extends Component {
  constructor() {
    super();

    this.state = {
      collapsed: false,
    };

    this.renderLabeledLanes = this.renderLabeledLanes.bind(this);
    this.renderLane = this.renderLane.bind(this);
  }

  renderUnlabeledLane(lane) {
    return (
      <UnlabeledLane
        key={lane.id}
        lane={lane}
        onEditLane={this.props.onEditLane}
      />
    );
  }

  renderLane(lane) {
    const { lanes, labels } = this.props;
    const currentLabel = labels.filter(label => label.id === lane.labelId)[0];
    const labelIds = lanes.map(l => l.labelId);
    const possibleLabels = labels.filter(label => labelIds.indexOf(label.id) < 0);
    possibleLabels.unshift(currentLabel);

    return (
      <Lane
        key={lane.id}
        lane={lane}
        label={currentLabel}
        labels={possibleLabels}
        onEditLane={this.props.onEditLane}
        onDeleteLane={this.props.onDeleteLane}
        onMoveLane={this.props.onMoveLane}
      />
    );
  }

  renderLabeledLanes() {
    const { lanes, labels } = this.props;
    const labelIds = lanes.map(l => l.labelId);
    const possibleLabels = labels.filter(label => labelIds.indexOf(label.id) < 0);

    return (
      <div className="content">
        { _.map(lanes.slice(1, lanes.length), this.renderLane) }
        {
          possibleLabels.length > 0 &&
          <NewLane
            label={possibleLabels[0]}
            onCreateLane={this.props.onCreateLane}
            onEditLane={this.props.onEditLane}
          />
        }
      </div>
    );
  }

  render() {
    const { collapsed } = this.state;
    const { lanes } = this.props;
    const arrowIcon = collapsed ? <ArrowRight /> : <ArrowLeft />;

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
            { arrowIcon }
          </a>
          { this.renderLabeledLanes() }
        </div>
      </div>
    );
  }
}

Lanes.propTypes = {
  labels: PropTypes.array.isRequired,
  lanes: PropTypes.array.isRequired,
  onCreateLane: PropTypes.func.isRequired,
  onEditLane: PropTypes.func.isRequired,
  onDeleteLane: PropTypes.func.isRequired,
  onMoveLane: PropTypes.func.isRequired,
};

export default Lanes;
