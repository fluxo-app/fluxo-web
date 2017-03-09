import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles/loader.css'

class Loader extends Component {
  render() {
    const {loading} = this.props
    return (
      <div>
        {loading && <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
        }
      </div>
    )
  }
}

export default connect(state => ({ loading: state.application.loading }))(Loader)
