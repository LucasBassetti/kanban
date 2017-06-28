import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import labelsActions from '../actions/labels';
import lanesActions from '../actions/lanes';
import Lanes from '../components/Lanes';

class App extends Component {
  componentWillMount() {
    this.props.onLoadLabels();
    this.props.onLoadLanes();
  }

  render() {
    const { labels, lanes } = this.props;

    if (lanes.length === 0) {
      return (
        <div className="loading">
          Loading...
        </div>
      );
    }

    return (
      <div className="kanban">
        <Lanes
          labels={labels}
          lanes={lanes}
          onCreateLane={this.props.onCreateLane}
          onEditLane={this.props.onEditLane}
          onDeleteLane={this.props.onDeleteLane}
          onMoveLane={this.props.onMoveLane}
        />
      </div>
    );
  }
}

App.propTypes = {
  labels: PropTypes.array.isRequired,
  lanes: PropTypes.array.isRequired,
  onLoadLabels: PropTypes.func.isRequired,
  onLoadLanes: PropTypes.func.isRequired,
  onCreateLane: PropTypes.func.isRequired,
  onDeleteLane: PropTypes.func.isRequired,
  onEditLane: PropTypes.func.isRequired,
  onMoveLane: PropTypes.func.isRequired,
};

const mapStateToProps = ({ labels, lanes }) => ({
  labels,
  lanes,
});

const mapDispatchToProps = dispatch => ({
  onLoadLabels() {
    dispatch(labelsActions.loadLabels());
  },

  onLoadLanes() {
    dispatch(lanesActions.loadLanes());
  },

  onCreateLane(labelId) {
    const lane = dispatch(lanesActions.createLane(labelId)).payload;
    return lane;
  },

  onEditLane(lane) {
    dispatch(lanesActions.updateLane(lane));
  },

  onDeleteLane(laneId) {
    dispatch(lanesActions.deleteLane(laneId));
  },

  onMoveLane(sourceId, targetId) {
    dispatch(lanesActions.move('lane', sourceId, targetId));
  },
});

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps, mapDispatchToProps)(App),
);
