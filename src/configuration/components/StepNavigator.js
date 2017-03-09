import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Row, Col, PageHeader, Button} from 'react-bootstrap'
import './styles/stepnavigator.css'

class StepNavigator extends Component {
  render () {
    const {currentStep, selectedBoardId, selectedListIds, gotoPreviousStep, gotoNextStep} = this.props
    const isPreviousButtonDisabled = currentStep <= 1
    const isNextButtonDisabled = (currentStep === 1 && selectedBoardId === -1) || (currentStep >= 2 && selectedListIds.length < 2)
    return (
      <div className="step-navigator">
        <Row>
          <Col xs={12}>
            <PageHeader/>
          </Col>
          <Col xs={12}>
            <Button
              bsStyle="success"
              onClick={() => gotoPreviousStep(currentStep)}
              disabled={isPreviousButtonDisabled}>
              <i className="glyphicon glyphicon-chevron-left"></i>
              Previous step
            </Button>
            <Button
              bsStyle="success"
              onClick={() => gotoNextStep(currentStep, selectedListIds)}
              disabled={isNextButtonDisabled}>
              Next step
              <i className="glyphicon glyphicon-chevron-right"></i>
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(state => ({
  currentStep: state.configuration.step,
  selectedBoardId: state.configuration.selectedBoardId,
  selectedListIds: state.configuration.selectedListIds,
}), dispatch => ({
  gotoPreviousStep: (currentStep) => dispatch({type: 'GOTO_PREVIOUS_STEP', payload:{currentStep: currentStep}}),
  gotoNextStep: (currentStep, selectedListIds) => dispatch({type: 'GOTO_NEXT_STEP', payload:{currentStep: currentStep, selectedListIds: selectedListIds}})
}))(StepNavigator)
