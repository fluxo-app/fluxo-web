import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger'
import {reducer as toastrReducer} from 'react-redux-toastr'
import ReduxToastr from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'
import App from './App'
import {Configuration, FakeConfiguration, saga as configurationSaga, reducer as configurationReducer} from './configuration'
import {Dashboard, FakeDashboard, saga as dashboardSaga, reducer as dashboardReducer} from './dashboard'
import {reducer as applicationReducer, settings, actions as applicationActions, constants as applicationConstants} from './application'
import 'bootstrap/dist/css/bootstrap.css'
import './static/styles/bootstrap.min.css'
import './static/styles/react-redux-toastr.min.css'
import './index.css'


const getQueryParamValue = param => {
  const regex = new RegExp("[?&]" + param + "(=([^&#]*)|&|#|$)")
  const results = regex.exec(window.location.href)
  return results[2]
    ? decodeURIComponent(results[2].replace(/\+/g, " "))
    : null
}

const jwtMiddleWare = browserHistory => {
  return store => next => action => {
    if (location.search.indexOf("jwt=") >= 0) {
      const jwt = getQueryParamValue("jwt")
      sessionStorage.setItem(applicationConstants.SESSIONSTORAGE_JWT, jwt)
      browserHistory.push(window.location.pathname)
    }
    if (action.type === "@@router/LOCATION_CHANGE") {
      const jwt = sessionStorage.getItem(applicationConstants.SESSIONSTORAGE_JWT)
      store.dispatch(applicationActions.validateJwtAction(jwt))
    }

    return next(action)
  }
}

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger()
const reducers = {
  routing: routerReducer,
  configuration: configurationReducer,
  application: applicationReducer,
  dashboard: dashboardReducer,
  toastr:toastrReducer
}
const reducer = combineReducers(reducers)
const store = createStore(reducer, applyMiddleware(sagaMiddleware, jwtMiddleWare(browserHistory), logger))
const history = syncHistoryWithStore(browserHistory, store)
sagaMiddleware.run(configurationSaga)
sagaMiddleware.run(dashboardSaga)

const requireAuth = (nextState, replace, callback) => {
  const token = sessionStorage.getItem(applicationConstants.SESSIONSTORAGE_JWT)
  if (!token) {
    const endPoint = settings.getOauthEndPoint()
    window.location.href = `${endPoint}/?redirectUrl=${window.location.href}`
  } else {
    callback()
  }
}

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}/>
        <Route path="/configure" onEnter={requireAuth} component={Configuration}/>
        <Route path="/configure/dashboard" onEnter={requireAuth} component={Dashboard}/>
        <Route path="/try-it-out" component={FakeConfiguration}/>
        <Route path="/try-it-out/dashboard" component={FakeDashboard}/>
      </Router>
      <ReduxToastr
        timeOut={10000}
        newestOnTop={false}
        preventDuplicates={true}
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"/>
    </div>
  </Provider>, document.getElementById('fluxo-root'))
