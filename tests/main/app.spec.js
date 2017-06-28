import React from 'react';
import uuid from 'uuid';
import { describe, it, after } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../../app/js/containers/App';
import UnlabeledLane from '../../app/js/containers/UnlabeledLane';
import Lane from '../../app/js/containers/Lane';
import Card from '../../app/js/containers/Card';

const mockStore = configureStore();
const card = {
  id: uuid.v4(),
  name: 'Card 1',
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
const store = mockStore({
  labels,
  lanes,
  cards,
});

describe('App', () => {
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  after(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    expect(wrapper.find(App)).to.exist;
  });

  it('should render 1 UnlabeledLane', () => {
    expect(wrapper.find(UnlabeledLane).length).to.be.equal(1);
  });

  it('should render 2 Lanes', () => {
    expect(wrapper.find(Lane).length).to.be.equal(2);
  });

  it('should render 1 Card', () => {
    expect(wrapper.find(Card).length).to.be.equal(1);
  });
});
