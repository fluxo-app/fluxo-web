import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {Loader, Disclaimer} from '../../application'
import Slide from './Slide'
import {loadCardsAction, caclulateStatisticsAction} from '../actions'
import {PARSE_QUERY_PARAMS_FAILED} from '../constants'
import './styles/dashboard.css'

class Dashboard extends Component {
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
      parsedIds.map(id => {
        this.props.loadCards(this.props.isDemo, id)
        return id
      })
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
  renderSlide = (labels, cumulativeLabels) => {
    const label = labels[this.state.activeSlide]
    const cumulativeLabel = cumulativeLabels.find(l => l.id === label.id)
    return <Slide label={label} cumulativeLabel={cumulativeLabel}/>  
  }
  render () {
    const {labels, cumulativeLabels} = this.props
    return (
      <Grid fluid>
        <Loader/>
        {labels && labels.length > 0 && this.renderSlide(labels, cumulativeLabels)}
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
  labels: state.dashboard.labels,
  cumulativeLabels: state.dashboard.cumulativeLabels
}), dispatch => ({
  loadCards: (isDemo, id) => dispatch(loadCardsAction(isDemo, id)),
  calculateStatistics: () => dispatch(caclulateStatisticsAction()),
  parseQueryParamsFailed: (error) => dispatch({type:PARSE_QUERY_PARAMS_FAILED, payload: error})
}))(Dashboard)
