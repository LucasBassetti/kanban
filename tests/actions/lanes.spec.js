import { describe, it } from 'mocha';
import { expect } from 'chai';
import uuid from 'uuid';
import actions from '../../app/js/actions/lanes';
import * as actionTypes from '../../app/js/constants/actionTypes';

describe('lanes actions', () => {
  it('should return an action to create a lane', () => {
    const name = 'Active';
    const expectedAction = {
      type: actionTypes.CREATE_LANE,
      payload: {
        id: uuid(),
        name,
      },
    };

    expect(actions.createLane(name).type).to.equal(expectedAction.type);
    expect(actions.createLane(name).payload.id).to.be.a('string');
    expect(actions.createLane(name).payload.name).to.equal(expectedAction.payload.name);
    expect(actions.createLane(name).payload.cards).to.be.an('array');
  });

  it('should return an action to attach a card to a lane', () => {
    const validId = uuid.v4();
    const expectedAction = {
      type: actionTypes.ATTACH_TO_LANE,
      payload: {
        laneId: validId,
        cardId: validId,
      },
    };

    expect(actions.attachToLane(validId, validId)).to.deep.equal(expectedAction);
  });

  it('should return an action to update a lane', () => {
    const validId = uuid.v4();
    const updatedLane = {
      id: validId,
      name: 'Text',
    };
    const expectedAction = {
      type: actionTypes.UPDATE_LANE,
      payload: {
        id: validId,
        name: 'Text',
      },
    };

    expect(actions.updateLane(updatedLane)).to.deep.equal(expectedAction);
  });

  it('should create an action to delete the lane', () => {
    const validId = uuid.v4();
    const expectedAction = {
      type: actionTypes.DELETE_LANE,
      payload: {
        id: validId,
      },
    };

    expect(actions.deleteLane(validId)).to.deep.equal(expectedAction);
  });

  it('should return an action to detach a card from a lane', () => {
    const validId = uuid.v4();
    const expectedAction = {
      type: actionTypes.DETACH_FROM_LANE,
      payload: {
        laneId: validId,
        cardId: validId,
      },
    };

    expect(actions.detachFromLane(validId, validId)).to.deep.equal(expectedAction);
  });

  it('should return an action to move a card in the lane', () => {
    const validId = uuid.v4();
    const expectedAction = {
      type: actionTypes.MOVE_CARD,
      payload: {
        sourceId: validId,
        targetId: validId,
      },
    };

    expect(actions.move('card', validId, validId)).to.deep.equal(expectedAction);
  });

  // it('should throw an error', () => {
  //   expect(actions.createLane.bind(null, {})).to.throw(Error);
  //   expect(actions.attachToLane.bind(null, 1, 'invalidId')).to.throw(Error);
  //   expect(actions.detachFromLane.bind(null, 1, 'invalidId')).to.throw(Error);
  // });
});
