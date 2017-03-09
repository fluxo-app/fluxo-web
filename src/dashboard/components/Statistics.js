import React, {Component} from 'react'
import {Panel, ListGroup} from 'react-bootstrap'
import ListItemWithBadge from './ListItemWithBadge'
import ListItemWithBadgeAndTotals from './ListItemWithBadgeAndTotals'
import './styles/statistics.css'

class Statistics extends Component {
  renderFooter = (color) => (
    <div style={{
      backgroundColor:color,
      display:"block",
      width: "100%",
      minHeight:"15px"
    }}>
    </div>
  )
  render () {
    const {name, cards, leadtime, color} = this.props
    return (
      <div>
        <Panel header={name} footer={this.renderFooter(color)}>
          <ListGroup>
            <ListItemWithBadge text="Average:" badge={leadtime && Math.round(leadtime.average)}/>
            <ListItemWithBadge text="Days:" badge={leadtime && Math.round(leadtime.total)}/>
            <ListItemWithBadge text="Cards:" badge={cards && cards.length}/>
          </ListGroup>
          <ListGroup>
            <ListItemWithBadgeAndTotals
              text="&lt; 1day:"
              badge={leadtime && leadtime.lessThenADay && leadtime.lessThenADay.percent}
              count={leadtime && leadtime.lessThenADay && leadtime.lessThenADay.count}
              color="success"/>
            <ListItemWithBadgeAndTotals
              text="1 - 7 days:"
              badge={leadtime && leadtime.betweenOneAndSevenDays && leadtime.betweenOneAndSevenDays.percent}
              count={leadtime && leadtime.betweenOneAndSevenDays && leadtime.betweenOneAndSevenDays.count}
              color="info"/>
            <ListItemWithBadgeAndTotals
              text="8 - 30 days:"
              badge={leadtime && leadtime.betweenEightAndThirtyDay && leadtime.betweenEightAndThirtyDay.percent}
              count={leadtime && leadtime.betweenEightAndThirtyDay && leadtime.betweenEightAndThirtyDay.count}
              color="warning"/>
            <ListItemWithBadgeAndTotals
              text="&gt; 30 days:"
              badge={leadtime && leadtime.overThirtyDays && leadtime.overThirtyDays.percent}
              count={leadtime && leadtime.overThirtyDays && leadtime.overThirtyDays.count}
              color="danger"/>
          </ListGroup>
        </Panel>
      </div>
    )
  }
}

export default Statistics
