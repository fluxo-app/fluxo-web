import React,{Component} from 'react'
import {Nav, NavItem} from 'react-bootstrap'
import Help from './Help'
import './styles/topnavigation.css'

export default class TopNavigation extends Component {
  render () {
    const {step} = this.props
    const helpStepOne = ["Choose the board that you want to base your statistics on and then click the button <strong>Next step</strong>"]
    const helpStepTwo = ["In this step you mark the lists that make up your Kanban flow by clicking on them in the order you like. The chosen flow is shown in the area below as the lists are clicked. ", "The <strong>first list</strong> chosen will automatically count as the start of your process and the <strong>last list</strong> will be automatically count as the stop of your process. ", "When you click <strong>Next step</strong> you'll we be redirected to the your statistics."] 
    return (
      <Nav bsStyle="pills" activeKey={step} onSelect={() => {}}>
        <NavItem eventKey={1} disabled={step !== 1}>Step 1, choose board</NavItem>
        <NavItem eventKey={2} disabled={step !== 2}>Step 2, define flow</NavItem>
        {step === 1 && <Help lines={helpStepOne}/>}
        {step === 2 && <Help lines={helpStepTwo}/>}
      </Nav>
    )
  }
}
