import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Kanban from './containers/Kanban';
import store from './store';
import API from './services';

require('../styles/main.scss');

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Kanban />
    </Provider>
  </div>,
  document.querySelector('.app'),
);

store.subscribe(() => {
  const state = store.getState();
  const { loaded, cards, lanes } = state;

  if (loaded) {
    API.updateLanes(lanes);
    API.updateCards(cards);
  }
});
