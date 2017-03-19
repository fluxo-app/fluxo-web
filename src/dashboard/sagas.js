import { call, put, takeEvery } from 'redux-saga/effects'
import {api, settings} from '../application'
import * as constants from './constants'

export function* loadCardsAsync(action) {
  try {
    yield put({type: constants.LOAD_CARDS_STARTED })
    const id = yield action.payload.id
    const url = yield `${settings.getApiEndPoint(action.payload.isDemo)}/lists/${id}`
    const loadcardsApi = yield new api(url)
    const list = yield call(loadcardsApi.get)
    yield put({type: constants.LOAD_CARDS_SUCCEEDED, list:list.response})
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
