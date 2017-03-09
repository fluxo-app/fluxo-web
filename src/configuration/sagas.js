import { call, put, takeEvery } from 'redux-saga/effects'
import {api, settings} from '../application'
import * as constants from './constants'
import {constants as dashboardConstants} from '../dashboard'

export function* loadMeAsync(action) {
  try {
    yield put({ type: constants.LOAD_ME_STARTED })
    const url = yield `${settings.getResourceUrl(action)}/me`
    const loadMeApi = yield new api(url)
    const me = yield call(loadMeApi.get)
    yield put({type: constants.LOAD_ME_SUCCEEDED, me})
  } catch (error) {
    yield put({ type: constants.LOAD_ME_FAILED, error })
  }
}

export function* loadBoardsAsync(action) {
  try {
    yield put({ type: constants.LOAD_BOARDS_STARTED })
    const url = yield `${settings.getResourceUrl(action)}/my/boards`
    const loadBoardsApi = yield new api(url)
    const boards = yield call(loadBoardsApi.get)
    yield put({type: constants.LOAD_BOARDS_SUCCEEDED, boards})
  } catch (error) {
    yield put({type: constants.LOAD_BOARDS_FAILED, error})
  }
}

export function* loadListsAsync(action) {
  try {
    yield put({ type: constants.LOAD_LISTS_STARTED })
    const boardId = yield action.payload.boardId
    const url = yield `${settings.getResourceUrl(action)}/boards/${boardId}/lists`
    const loadListsApi = yield new api(url)
    const lists = yield call(loadListsApi.get)
    yield put({type: constants.LOAD_LISTS_SUCCEEDED, lists})
  } catch (error) {
    yield put({type: constants.LOAD_LISTS_FAILED, error})
  }
}

export function* gotoNextStep(action) {
    if (action.payload.currentStep === 2) {
      const selectedListIds = action.payload.selectedListIds
      yield put({type: dashboardConstants.OPEN_DASHBOARD, payload:selectedListIds})
      yield window.open(`${window.location.href}/dashboard?ids=${encodeURIComponent(JSON.stringify(selectedListIds))}`, "_blank")
    }
}

export function* watchLoadMeAsync() {
  yield takeEvery(constants.LOAD_ME, loadMeAsync)
}

export function* watchLoadBoardsAsync() {
  yield takeEvery(constants.LOAD_BOARDS, loadBoardsAsync)
}

export function* watchLoadListsAsync() {
  yield takeEvery(constants.LOAD_LISTS, loadListsAsync)
}

export function* watchGotoNextStepAsync() {
  yield takeEvery(constants.GOTO_NEXT_STEP, gotoNextStep)
}

export default function* configurationSaga() {
  yield [watchLoadMeAsync(),
    watchLoadBoardsAsync(),
    watchLoadListsAsync(),
    watchGotoNextStepAsync()]
}
