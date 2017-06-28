import { describe, it } from 'mocha';
import { expect } from 'chai';
import reducer from '../../app/js/reducers/lanes';
import * as actionTypes from '../../app/js/constants/actionTypes';

describe('lanes reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).to.have.length(0);
  });

  it('should handle CREATE_LANE', () => {
    const createAction = {
      type: actionTypes.CREATE_LANE,
      payload: {
        name: 'New Lane',
      },
    };

    expect(reducer([], createAction)).to.deep.equal([createAction.payload]);
  });

  // it('should handle ATTACH_TO_LANE', () => {
  //   const action = {
  //     type: actionTypes.ATTACH_TO_LANE,
  //     payload: {
  //       laneId: 1,
  //       cardId: 1,
  //     },
  //   };
  //
  //   expect(reducer(undefined, action)).to.have.length(4);
  // });
});
