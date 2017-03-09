import * as constants from './constants'

const initialState =  {
  selectedBoardId: -1,
  selectedListIds: [],
  step: -1,
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.LOAD_ME_SUCCEEDED:
      return {...state, me: action.me, step: 1}
    case constants.LOAD_BOARDS_SUCCEEDED:
      return {...state, boards: action.boards, step: 1}
    case constants.LOAD_LISTS_SUCCEEDED:
      return {...state, lists: action.lists}
    case constants.GOTO_NEXT_STEP:
      const nextStep = action.payload.currentStep >= 2 ? action.payload.currentStep : action.payload.currentStep + 1
      return {...state, step: nextStep}
    case constants.GOTO_PREVIOUS_STEP:
      const previousStep = action.payload.currentStep <= 1 ? action.payload.currentStep : action.payload.currentStep - 1
      return {...state, step: previousStep}
    case constants.SELECT_BOARD:
      const selectedBoardId = action.payload.selectedBoardId
      return {...state, selectedBoardId: selectedBoardId, selectedListIds: []}
    case constants.SELECT_LIST:
      const selectedListId = action.payload.selectedListId
      return {...state, selectedListIds: state.selectedListIds.concat(selectedListId)}
    case constants.UNSELECT_LIST:
      const unSelectedListId = action.payload.unSelectedListId
      return {...state, selectedListIds: state.selectedListIds.filter(id => id !== unSelectedListId)}
    default:
      return {...state}
  }
}

export default reducer
