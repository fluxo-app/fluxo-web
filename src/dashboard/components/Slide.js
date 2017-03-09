import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap'
import Statistics from './Statistics'
import Graph from './Graph'

class Slide extends Component {
  render () {
    const {label} = this.props
    const labelId = label && label.name.replace(new RegExp(' ', 'g'), '');
    const id = `label-${labelId}`
    return (
      <Row>
        <Col xs={12} md={3}>
          <Statistics key={id} {...label} />
        </Col>
        <Col xs={12} md={9}>
          <Graph key={id} id={id} {...label} />
        </Col>
      </Row>
    )
  }
}

export default Slide
