import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import baselineApp from './reducers/baselineApp'
import App from './components/App.jsx'
import { initSession, whoami, routeChange } from './actions/actions'
import { LocalStorage }from './util/utils'
import { AddressSubviews } from './util/enums'

let reset = (initialState) => {
  if (!initialState) return;
  initialState.views.addressPanel.mode = AddressSubviews.Default
  initialState.addresses.forEach(a => {
    a.isVisible = true;
  })
  initialState.views.addressPanel.filterText = ''
}

// build our store from stored state
// always start on the default view, even if the last state was another view
const initialState = LocalStorage.getSavedState();
reset(initialState);
const store = createStore(baselineApp, initialState, applyMiddleware(thunkMiddleware))

// store any needed state to local storage
store.subscribe((e) => {
  var state = store.getState();
  LocalStorage.set('appState', JSON.stringify(state));
});

// initialize the app
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
)
