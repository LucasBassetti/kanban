const jsdom = require('jsdom').jsdom;

const exposedProperties = ['window', 'navigator', 'document'];
const mockLocalStorage = {
  values: {},
  getItem(key) {
    return this.values[key] || null;
  },
  setItem(key, value) {
    this.values[key] = value;
  },
};
global.document = jsdom('');
global.window = document.defaultView;
global.localStorage = mockLocalStorage;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
