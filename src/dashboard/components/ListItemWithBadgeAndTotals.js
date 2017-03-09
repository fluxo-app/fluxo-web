import React, {Component} from 'react'
import {ListGroupItem, Badge} from 'react-bootstrap'
import './styles/listitemwithbadgeandtotals.css'

class ListItemWithBadgeAndTotals extends Component {
  render () {
    const {text, badge, count, color} = this.props
    return (
      <ListGroupItem>
        <span>
          {text}
        </span>
        <span className="pull-right">
          &nbsp;({count})
        </span>
        <Badge bsStyle={color}>
          {Math.round(badge)}%
        </Badge>
      </ListGroupItem>
    )
  }
}

export default ListItemWithBadgeAndTotals
