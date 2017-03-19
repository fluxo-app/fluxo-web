import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap'
import Statistics from './Statistics'
import LeadtimeGraph from './LeadtimeGraph'
import CumulativeFlowGraph from './CumulativeFlowGraph'

class Slide extends Component {
  render () {
    const {label, cumulativeLabel} = this.props
    const labelId = label && label.name.replace(new RegExp(' ', 'g'), '');
    const leadTimeId = `label-leadtime-${labelId}`
    const cumulativeFlowId = `label-cumulative-${labelId}`
    return (
      <Row>
        <Col xs={12} md={3}>
          <Statistics key={leadTimeId} {...label} />
        </Col>
        <Col xs={12} md={9}>
          <LeadtimeGraph key={leadTimeId} id={leadTimeId} leadtime={label.leadtime} />
        </Col>
        <Col xs={12} md={12}>
          <CumulativeFlowGraph key={cumulativeFlowId} id={cumulativeFlowId} cumulativeFlow={cumulativeLabel.cumulativeFlow}/>
        </Col>
      </Row>
    )
  }
}

export default Slide
