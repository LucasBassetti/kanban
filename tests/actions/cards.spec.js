import { describe, it } from 'mocha';
import { expect } from 'chai';
import uuid from 'uuid';
import actions from '../../app/js/actions/cards';
import * as actionTypes from '../../app/js/constants/actionTypes';

describe('cards actions', () => {
  it('should create an action to add a card', () => {
    const text = 'New card';
    const labelId = '1';
    const expectedAction = {
      type: actionTypes.CREATE_CARD,
      payload: {
        text,
        labelId,
      },
    };
    const result = actions.createCard(text, labelId);

    expect(result.type).to.equal(expectedAction.type);
    expect(result.payload.id).to.be.a('string');
    expect(result.payload.text).to.equal(expectedAction.payload.text);
    expect(result.payload.labelId).to.equal(expectedAction.payload.labelId);
  });

  it('should create an update action', () => {
    const validId = uuid.v4();
    const validCard = {
      id: validId,
      text: 'Hello',
    };
    const expectedAction = {
      type: actionTypes.UPDATE_CARD,
      payload: validCard,
    };

    expect(actions.updateCard(validCard)).to.deep.equal(expectedAction);
  });

  it('should create a delete action', () => {
    const validId = uuid.v4();
    const expectedAction = {
      type: actionTypes.DELETE_CARD,
      payload: {
        id: validId,
      },
    };

    expect(actions.deleteCard(validId)).to.deep.equal(expectedAction);
  });
});
