import React from 'react';
import uuid from 'uuid';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Kanban from '../../app/js/containers/Kanban';
import UnlabeledLane from '../../app/js/containers/UnlabeledLane';
import Lane from '../../app/js/containers/Lane';
import Cards from '../../app/js/components/placeholders/Cards';

const mockStore = configureStore();
const card = {
  id: uuid.v4(),
  text: 'Card 1',
  labelId: '1',
};
const lanes = [
  {
    id: uuid.v4(),
    name: 'Unlabeled',
    cards: [],
  },
  {
    id: uuid.v4(),
    labelId: '1',
    cards: [card.id],
  },
  {
    id: uuid.v4(),
    labelId: '2',
    cards: [],
  },
];
const labels = [
  { id: '1', value: 'Backlog' },
  { id: '2', value: 'Review' },
  { id: '3', value: 'Drafts' },
];
const cards = [card];
const loaded = true;

const store = mockStore({
  labels,
  lanes,
  cards,
  loaded,
});

describe('Kanban', () => {
  const wrapper = mount(
    <Provider store={store}>
      <Kanban />
    </Provider>,
  );

  it('should render', () => {
    expect(wrapper.find(Kanban)).to.exist;
  });

  it('should render 1 UnlabeledLane', () => {
    expect(wrapper.find(UnlabeledLane).length).to.be.equal(1);
  });

  it('should render 2 Lanes', () => {
    expect(wrapper.find(Lane).length).to.be.equal(2);
  });

  it('should render the placeholders Cards', () => {
    expect(wrapper.find(Cards).length).to.be.equal(2);
  });
});
