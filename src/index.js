import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger'
import App from './App'
import {Configuration, FakeConfiguration, saga as configurationSaga, reducer as configurationReducer} from './configuration'
import {Dashboard, FakeDashboard, saga as dashboardSaga, reducer as dashboardReducer} from './dashboard'
import {reducer as applicationReducer} from './application'
import 'bootstrap/dist/css/bootstrap.css'
import './static/styles/bootstrap.min.css'
import './index.css'

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger()
const reducers = {
  routing: routerReducer,
  configuration: configurationReducer,
  application: applicationReducer,
  dashboard: dashboardReducer
}
const reducer = combineReducers(reducers)
const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger))
const history = syncHistoryWithStore(browserHistory, store)
sagaMiddleware.run(configurationSaga)
sagaMiddleware.run(dashboardSaga)


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}/>
      <Route path="/configure" component={Configuration}/>
      <Route path="/configure/dashboard" component={Dashboard}/>
      <Route path="/try-it-out" component={FakeConfiguration}/>
      <Route path="/try-it-out/dashboard" component={FakeDashboard}/>
    </Router>
</Provider>, document.getElementById('fluxo-root'))
