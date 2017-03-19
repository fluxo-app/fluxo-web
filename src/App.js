import React, {Component} from 'react'
import {Link} from 'react-router'
import {
  Grid,
  Row,
  Image,
  Col,
  Jumbotron
} from 'react-bootstrap'
import {Disclaimer} from './application'
import fluxo from './static/images/logo.png'

class App extends Component {
  render() {
    document.title = 'Welcome | Fluxo'
    const title = (
      <blockquote>
        <h3>
          <strong>Fluxo</strong>, the Kanban dasboard for Trello boards
        </h3>
      </blockquote>
    )
    const footer = (
      <Row>
        <Col xs={12} md={4}>
          <Link to="/configure" className="btn btn-info btn-block">Configure</Link>
        </Col>
        <Col xs={12} md={4}>
          <Link to="/try-it-out" className="btn btn-info btn-block">Try it out</Link>
        </Col>
        <Col xs={12} md={4}>
          <a href="https://github.com/fluxo-app" target="_blank" className="btn btn-info btn-block">Source Code</a>
        </Col>
      </Row>
    )
    const logo = (
      <Row>
        <Col xs={6} xsOffset={3} sm={6} smOffset={3} md={4} mdOffset={4}>
          <Image src={fluxo} responsive/>
        </Col>
      </Row>
    )
    const body = (
      <div>
        <p>Fluxo is a free open source software product for those who want to get Kanban type statistics like lead time from their Trello boards.</p>
        <p>From here you can proceed by clicking the Configure button or you can try out Fluxo with fictious data by clicking on the Try it out button
        </p>
      </div>
    )
    return (
      <Grid>
        <Row>
          <Col xs={12} md={10} mdOffset={1}>
            <Jumbotron>
              {logo}
              {title}
              {body}
              {footer}
            </Jumbotron>
          </Col>
        </Row>
        <Disclaimer/>
      </Grid>
    )
  }
}

export default App
