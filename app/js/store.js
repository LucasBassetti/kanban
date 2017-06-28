import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers/';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

export default createStoreWithMiddleware(reducers);

// export default function configStore(initialState = {}) {
//   return configStore(
//     rootReducer,
//     initialState,
//     // compose(
//     //   window.devToolsExtension ? window.devToolsExtension() : f => f
//     // )
//   );
// }
