import React, {Component} from 'react'
import {Popover, Glyphicon, OverlayTrigger} from 'react-bootstrap'
import {gtm} from '../../application'
import './styles/help.css'

export default class Help extends Component {
  constructor () {
    super()
    this.state = {
      show: false
    }
  }
  toggleVisible = () => {
    const label = this.state.show ? 'show -> hide' : 'hide -> show'
    gtm('toggle-help', `${label} | step ${this.props.step}`)
    this.setState({show: !this.state.show})
  }
  render () {
    const {lines} = this.props
    const popoverHelp = (
      <Popover id="popover-help">
        {lines && lines.length > 0 && lines.map((line, index) => {
          return <span key={`line-${index}`} dangerouslySetInnerHTML={{__html: line}} />
        })}
      </Popover>
    )
    return (
      <li>
        <OverlayTrigger trigger="click" placement="right" overlay={popoverHelp}>
          <Glyphicon className="help-icon" glyph="question-sign" onClick={() => this.toggleVisible()}/>
        </OverlayTrigger>
      </li>
    )
  }
}
