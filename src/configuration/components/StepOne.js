import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Row, Col, Button} from 'react-bootstrap'
import {loadBoardsAction, selectBoardAction} from '../actions'
import StepNavigator from './StepNavigator'
import './styles/stepone.css'

class StepOne extends Component {
  componentWillMount() {
    this.props.loadBoards(this.props.isDemo)
  }
  render () {
    const {boards, selectedBoardId, selectBoard} = this.props
    return (
      <div className="step-one-container">
        <Row>
          <Col xs={12} xsHidden smHidden>
            {boards && boards.map(board => {
              return <Button
                key={`board-${board.id}`}
                active={selectedBoardId === board.id}
                bsStyle={selectedBoardId === board.id ? "success" : "info"}
                onClick={() => selectBoard(board.id)}>
                {board.name}
              </Button>
            })}
            <StepNavigator/>
          </Col>
          <Col xs={12} lgHidden mdHidden>
            {boards && boards.map(board => {
              return <Button
                bsSize="small"
                key={`board-${board.id}`}
                active={selectedBoardId === board.id}
                bsStyle={selectedBoardId === board.id ? "success" : "info"}
                onClick={() => selectBoard(board.id)}>
                {board.name}
              </Button>
            })}
            <StepNavigator/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(state => ({
  boards: state.configuration.boards,
  selectedBoardId: state.configuration.selectedBoardId
}), dispatch => ({
  loadBoards: (isDemo) => dispatch(loadBoardsAction(isDemo)),
  selectBoard: (boardId) => dispatch(selectBoardAction(boardId))
}))(StepOne)
