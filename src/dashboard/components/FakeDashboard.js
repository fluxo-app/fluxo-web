import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {Loader, Disclaimer} from '../../application'
import Slide from './Slide'
import {loadCardsAction} from '../actions'
import {PARSE_QUERY_PARAMS_FAILED} from '../constants'
import './styles/dashboard.css'

class FakeDashboard extends Component {
  constructor() {
    super()
    this.state = {
      activeSlide: 0
    }
  }
  showPreviousSlide = () => {
    const maxSlide = this.props.labels && this.props.labels.length - 1
    const previousSlide = this.state.activeSlide - 1 < 0 ? maxSlide : this.state.activeSlide - 1
    this.setState({
      activeSlide: previousSlide
    })
  }
  showNextSlide = () => {
    const maxSlide = this.props.labels && this.props.labels.length - 1
    const nextSlide = this.state.activeSlide + 1 > maxSlide ? 0 : this.state.activeSlide + 1
    this.setState({
      activeSlide: nextSlide
    })
  }
  componentWillMount() {
    try {
      const selectedListIds = this.props.location && this.props.location.query && this.props.location.query.ids
      const decodedListIds = decodeURIComponent(selectedListIds)
      const parsedIds = JSON.parse(decodedListIds)
      this.props.loadCards(true, parsedIds)
    } catch (error) {
      this.props.parseQueryParamsFailed(error)
    }
  }
  componentDidMount() {
    this._interval = setInterval(() => this.showNextSlide(), 1000 * 60)
  }
  componentWillUnmount() {
    clearInterval(this._interval)
  }
  render () {
    const {labels} = this.props
    return (
      <Grid fluid>
        <Loader/>
        {labels && labels.length > 0 && <Slide label={labels[this.state.activeSlide]}/>}
        <Row>
          <Col xs={12} className="text-center slide-navigation">
            <Button
              bsSize="small"
              bsStyle="success"
              onClick={() => this.showPreviousSlide()}>
              <i className="glyphicon glyphicon-chevron-left"></i>
              Previous
            </Button>
            <Button
              bsSize="small"
              bsStyle="success"
              onClick={() => this.showNextSlide()}>
              Next
              <i className="glyphicon glyphicon-chevron-right"></i>
            </Button>
          </Col>
        </Row>
        <Disclaimer/>
      </Grid>
    )
  }
}

export default connect(state => ({
  labels : state.dashboard.labels,
}), dispatch => ({
  loadCards: (isDemo, selectedListIds) => dispatch(loadCardsAction(isDemo, selectedListIds)),
  parseQueryParamsFailed: (error) => dispatch({type:PARSE_QUERY_PARAMS_FAILED, payload: error})
}))(FakeDashboard)
