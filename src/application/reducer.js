import {constants as configurationConstants} from '../configuration'
import {constants as dashboardConstants} from '../dashboard'
import {getRedirectUrl} from './settings'

const initialState = {
  loading: false
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case configurationConstants.LOAD_ME_STARTED:
    case configurationConstants.LOAD_BOARDS_STARTED:
    case configurationConstants.LOAD_LISTS_STARTED:
    case dashboardConstants.LOAD_CARDS_STARTED:
      return {...state, loading: true}
    case configurationConstants.LOAD_ME_FAILED:
    case configurationConstants.LOAD_BOARDS_FAILED:
    case configurationConstants.LOAD_LISTS_FAILED:
    case dashboardConstants.LOAD_CARDS_FAILED:
      window.location.href = getRedirectUrl(action.error.signInUrl)
      return {...initialState}
    default:
      return {...initialState}
  }
}

export default reducer
