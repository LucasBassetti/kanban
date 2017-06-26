import { describe, it } from 'mocha';
import { expect } from 'chai';
import uuid from 'uuid';
import reducer from '../../app/js/reducers/cards';
import * as actionTypes from '../../app/js/constants/actionTypes';

describe('cards reducer', () => {
  it('should return the initial state', () => {
    expect(reducer([], { type: 'unknown type' })).to.deep.equal([]);
  });

  it('should handle CREATE_CARD', () => {
    const createAction = {
      type: actionTypes.CREATE_CARD,
      payload: {
        id: uuid.v4(),
        text: 'New task',
      },
    };

    expect(reducer([], createAction)).to.deep.equal([createAction.payload]);
    expect(reducer(undefined, createAction)).to.have.length(1);
  });

  it('should handle UPDATE_CARD', () => {
    const v4Id = uuid.v4();
    const oldState = [{
      id: v4Id,
      text: 'Old task',
    }];
    const updateAction = {
      type: actionTypes.UPDATE_CARD,
      payload: {
        id: v4Id,
        text: 'New task',
      },
    };

    expect(reducer(oldState, updateAction)).to.deep.equal([updateAction.payload]);
  });

  it('should handle DELETE_CARD', () => {
    const v4Id = uuid.v4();
    const oldState = [{
      id: v4Id,
      text: 'Old task',
    }];
    const deleteAction = {
      type: actionTypes.DELETE_CARD,
      payload: {
        id: v4Id,
      },
    };

    expect(reducer(oldState, deleteAction)).to.deep.equal([]);
  });
});
