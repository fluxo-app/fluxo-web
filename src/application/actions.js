import {AUTHORIZATION_FAILED} from './constants'

export const authorizationFailedAction = (error) => ({type:AUTHORIZATION_FAILED, error})
