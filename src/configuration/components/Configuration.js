import React, {Component} from 'react'
import {Grid, Row, Col, Jumbotron} from 'react-bootstrap'
import {connect} from 'react-redux'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import TopNavigation from './TopNavigation'
import {loadMeAction} from '../actions'
import {Loader, Disclaimer} from '../../application'


class Configuration extends Component {
  componentWillMount() {
    this.props.loadMe(this.props.isDemo)
  }
  render() {
    const steps = [null, <StepOne isDemo={this.props.isDemo}/>, <StepTwo isDemo={this.props.isDemo}/>]
    const {me, step} = this.props
    const fullName = me ? me.fullName : ''
    return (
      <Grid fluid>
        <Loader/>
        <Row>
          <Col md={10} mdOffset={1}>
            <Jumbotron>
              <h2>{`Welcome to Fluxo ${fullName}`}</h2>
              <p>Follow these simple steps to get Kanban style statistics for your Trello Board.</p>
              <TopNavigation step={step}/>
              {steps[step]}
            </Jumbotron>
          </Col>
        </Row>
        <Disclaimer/>
      </Grid>
    )
  }
}

export default connect(state => ({
  me: state.configuration.me,
  step: state.configuration.step
}), dispatch => ({
  loadMe: (isDemo) => dispatch(loadMeAction(isDemo))
}))(Configuration)
