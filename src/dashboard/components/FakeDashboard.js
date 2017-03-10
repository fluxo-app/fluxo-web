import React, {Component} from 'react'
import Dashboard from './Dashboard'

export default class FakeDashboard extends Component {
  render () {
    return (
      <Dashboard isDemo={true} location={this.props.location}/>
    )
  }
}
