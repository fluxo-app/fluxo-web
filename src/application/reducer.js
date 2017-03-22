import jwt from 'jwt-simple'
import {constants as configurationConstants} from '../configuration'
import {constants as dashboardConstants} from '../dashboard'
import {VALIDATE_JWT, SESSIONSTORAGE_JWT} from './constants'

const initialState = {
  loading: false,
  accessToken: null
}

const decodeJwtToken = token => {
  try {
    return jwt.decode(token, null, true)
  } catch (e) {
    return null
  }
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case VALIDATE_JWT:
      const decodedJwt = decodeJwtToken(action.jwt)
      if (!decodedJwt) {
        sessionStorage.removeItem(SESSIONSTORAGE_JWT)
        return initialState
      }
      sessionStorage.setItem(SESSIONSTORAGE_JWT, action.jwt)
      return {...state, accessToken: decodedJwt.accessToken}
    case configurationConstants.LOAD_ME_STARTED:
    case configurationConstants.LOAD_BOARDS_STARTED:
    case configurationConstants.LOAD_LISTS_STARTED:
    case dashboardConstants.LOAD_CARDS_STARTED:
      return {...state, loading: true}
    case configurationConstants.LOAD_ME_FAILED:
    case configurationConstants.LOAD_BOARDS_FAILED:
    case configurationConstants.LOAD_LISTS_FAILED:
    case dashboardConstants.LOAD_CARDS_FAILED:
      return {...initialState}
    default:
      return {...initialState}
  }
}

export default reducer
