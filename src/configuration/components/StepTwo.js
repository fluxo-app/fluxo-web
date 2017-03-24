import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Row, Col, ButtonGroup, Button, Well} from 'react-bootstrap'
import {loadListsAction, selectListAction, unSelectListAction} from '../actions'
import StepNavigator from './StepNavigator'
import './styles/steptwo.css'

class StepTwo extends Component {
  componentWillMount() {
    this.props.loadLists(this.props.isDemo, this.props.selectedBoardId)
  }
  isSelected = (id) => {
    return this.props.selectedListIds && this.props.selectedListIds.indexOf(id) !== -1
  }
  render () {
    const {lists, selectedListIds, selectList, unSelectList} = this.props
    return (
      <div className="step-two-container">
        <Row>
          <Col xs={12} xsHidden smHidden>
            {lists && lists.map(list => {
              return <Button
                key={`lists-${list.id}`}
                active={this.isSelected(list.id)}
                bsStyle={this.isSelected(list.id) ? "success" : "info"}
                onClick={() => this.isSelected(list.id) ? unSelectList(list.id) : selectList(list.id)}>
                {list.name}
              </Button>
            })}
          </Col>
          <Col xs={12} lgHidden mdHidden>

            {lists && lists.map(list => {
              return <Button
                bsSize="small"
                key={`lists-${list.id}`}
                active={this.isSelected(list.id)}
                bsStyle={this.isSelected(list.id) ? "success" : "info"}
                onClick={() => this.isSelected(list.id) ? unSelectList(list.id) : selectList(list.id)}>
                {list.name}
              </Button>
            })}

          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Well bsSize="lg" className="lists-container">
              {selectedListIds && selectedListIds.length > 0 && selectedListIds.map(selectedlist => {
                const filtered = lists.filter(list => list.id === selectedlist)
                const list = filtered && filtered.length > 0 ? filtered[0] : {}
                  return <div
                    key={`selectedlist-${list.id}`}
                           className="list">
                    <span>{list.name}</span>
                    <div className="fake-card"></div>
                    <div className="fake-card"></div>
                  </div>
              })}
            </Well>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <StepNavigator/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(state => ({
  lists: state.configuration.lists,
  selectedBoardId: state.configuration.selectedBoardId,
  selectedListIds: state.configuration.selectedListIds,
}), dispatch => ({
  loadLists: (isDemo, selectedBoardId) => dispatch(loadListsAction(isDemo, selectedBoardId)),
  selectList: (listId) => dispatch(selectListAction(listId)),
  unSelectList: (listId) => dispatch(unSelectListAction(listId)),
}))(StepTwo)
