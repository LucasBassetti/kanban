import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import labelsActions from '../actions/labels';
import lanesActions from '../actions/lanes';
import cardsActions from '../actions/cards';
import loadedActions from '../actions/loaded';
import Lanes from '../components/Lanes';

class Kanban extends Component {
  componentWillMount() {
    this.props.onLoadData();
  }

  render() {
    const { labels, lanes, loaded } = this.props;

    if (!loaded) {
      return (
        <div className="loading">
          Loading ...
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

Kanban.propTypes = {
  loaded: PropTypes.bool.isRequired,
  labels: PropTypes.array.isRequired,
  lanes: PropTypes.array.isRequired,
  onLoadData: PropTypes.func.isRequired,
  onCreateLane: PropTypes.func.isRequired,
  onDeleteLane: PropTypes.func.isRequired,
  onEditLane: PropTypes.func.isRequired,
  onMoveLane: PropTypes.func.isRequired,
};

const mapStateToProps = ({ labels, lanes, loaded }) => ({
  labels,
  lanes,
  loaded,
});

const mapDispatchToProps = dispatch => ({
  onLoadData() {
    Promise.all([
      dispatch(labelsActions.loadLabels()),
      dispatch(cardsActions.loadCards()),
      dispatch(lanesActions.loadLanes()),
    ]).then(() => {
      dispatch(loadedActions.completeLoad());
    });
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
  connect(mapStateToProps, mapDispatchToProps)(Kanban),
);
