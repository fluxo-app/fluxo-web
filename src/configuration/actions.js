import {LOAD_ME, LOAD_BOARDS, SELECT_BOARD, LOAD_LISTS, SELECT_LIST, UNSELECT_LIST} from './constants'

export const loadMeAction = (isDemo) => ({type: LOAD_ME, payload: {isDemo: isDemo}})
export const loadBoardsAction = (isDemo) => ({type: LOAD_BOARDS, payload: {isDemo: isDemo}})
export const selectBoardAction = (boardId) => ({type: SELECT_BOARD, payload: {selectedBoardId: boardId}})
export const loadListsAction = (isDemo, boardId) => ({type: LOAD_LISTS, payload: {isDemo: isDemo, boardId: boardId}})
export const selectListAction = (listId) => ({type: SELECT_LIST, payload: {selectedListId: listId}})
export const unSelectListAction = (listId) => ({type: UNSELECT_LIST, payload: {unSelectedListId: listId}})
