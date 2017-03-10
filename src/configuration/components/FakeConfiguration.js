import React, {Component} from 'react'
import Configuration from './Configuration'

export default class FakeConfiguration extends Component {
  render() {
    return(
      <Configuration isDemo={true}/>
    )
  }
}
