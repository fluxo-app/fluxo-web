import React, {Component} from 'react'
import {ListGroupItem, Badge} from 'react-bootstrap'

class ListItemWithBadge extends Component {
  render () {
    const {text, badge} = this.props
    return (
      <ListGroupItem>
        <span>
          {text}
        </span>
        <Badge>
          {badge}
        </Badge>
      </ListGroupItem>
    )
  }
}

export default ListItemWithBadge
