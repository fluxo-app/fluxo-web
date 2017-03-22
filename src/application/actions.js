import {VALIDATE_JWT} from './constants'

export const validateJwtAction = (jwt) => ({type:VALIDATE_JWT, jwt})
