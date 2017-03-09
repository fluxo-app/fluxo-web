import {LOAD_CARDS} from './constants'

export const loadCardsAction = (isDemo, selectedListIds) => ({type: LOAD_CARDS, payload: {isDemo: isDemo, selectedListIds: selectedListIds}})
