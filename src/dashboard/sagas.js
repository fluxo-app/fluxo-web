import { call, put, takeEvery } from 'redux-saga/effects'
import {api, settings} from '../application'
import * as constants from './constants'

export function* loadCardsAsync(action) {
  try {
    yield put({type: constants.LOAD_CARDS_STARTED })
    const selectedListIds = yield action.payload.selectedListIds
    const endListId = yield selectedListIds[selectedListIds.length -1]
    const url = yield `${settings.getResourceUrl(action)}/lists/${endListId}`
    const loadcardsApi = yield new api(url)
    const cards = yield call(loadcardsApi.get)
    yield put({type: constants.LOAD_CARDS_SUCCEEDED, cards})
  } catch (error) {
    yield put({type: constants.LOAD_CARDS_FAILED, error})
  }
}

export function* watchCardsAsync() {
  yield takeEvery(constants.LOAD_CARDS, loadCardsAsync)
}

export default function* dashboardSaga() {
  yield [watchCardsAsync()]
}
