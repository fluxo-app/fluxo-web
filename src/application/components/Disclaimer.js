import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap'

export default class Disclaimer extends Component {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <div className="text-center">
            <span className="text-muted">Fluxo is not affiliated, associated, authorized, endorsed by or in any way officially connected to Trello, Inc. (www.trello.com).</span>
          </div>
        </Col>
      </Row>
    )
  }
}
