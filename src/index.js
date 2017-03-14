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
import {reducer as applicationReducer, api, settings, actions as applicationActions} from './application'
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

const requireAuth = (nextState, replace, callback) => {
    const endPoint = settings.getApiEndPoint(false)
    const url = `${endPoint}/me`
    const loadMeApi = new api(url)
    loadMeApi.get()
      .then(me => callback())
      .catch(error => {
        if(error.status === 401) {
          const redirectUrl = settings.getRedirectUrl(error.response.signInUrl)
          window.location.href = redirectUrl
        } else {
          store.dispatch(applicationActions.authorizationFailedAction(error))
        }
      })
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}/>
      <Route path="/configure" onEnter={requireAuth} component={Configuration}/>
      <Route path="/configure/dashboard" onEnter={requireAuth} component={Dashboard}/>
      <Route path="/try-it-out" component={FakeConfiguration}/>
      <Route path="/try-it-out/dashboard" component={FakeDashboard}/>
    </Router>
</Provider>, document.getElementById('fluxo-root'))
