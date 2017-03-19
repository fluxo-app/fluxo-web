import {LOAD_CARDS} from './constants'

export const loadCardsAction = (isDemo, id) => ({type: LOAD_CARDS, payload: {isDemo: isDemo, id: id}})
