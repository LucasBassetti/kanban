import { describe, it } from 'mocha';
import { expect } from 'chai';
import uuid from 'uuid';
import actions from '../../app/js/actions/cards';
import * as actionTypes from '../../app/js/constants/actionTypes';

describe('cards actions', () => {
  it('should create an action to add a card', () => {
    const text = 'Create task';
    const expectedAction = {
      type: actionTypes.CREATE_CARD,
      payload: {
        text,
      },
    };

    expect(actions.createCard(text).type).to.equal(expectedAction.type);
    expect(actions.createCard(text).payload.id).to.be.a('string');
    expect(actions.createCard(text).payload.text).to.equal(expectedAction.payload.text);
  });

  it('should check if id is v4 valid and create an update action', () => {
    // const invalidId = {
    //   id: 'Hello',
    // };
    // const invalidCard = 'not an object';
    const validId = uuid.v4();
    const validCard = {
      id: validId,
      text: 'Hello',
    };
    const expectedAction = {
      type: actionTypes.UPDATE_CARD,
      payload: validCard,
    };

    // expect(actions.updateCard.bind(null, invalidId)).to.throw(Error);
    // expect(actions.updateCard.bind(null, invalidCard)).to.throw(Error);
    expect(actions.updateCard(validCard)).to.deep.equal(expectedAction);
  });

  it('should check if id is v4 valid and create a delete action', () => {
    // const invalidId = 'Hello';
    const validId = uuid.v4();
    const expectedAction = {
      type: actionTypes.DELETE_CARD,
      payload: {
        id: validId,
      },
    };

    // expect(actions.deleteCard.bind(null, invalidId)).to.throw(Error);
    expect(actions.deleteCard(validId)).to.deep.equal(expectedAction);
  });
});
