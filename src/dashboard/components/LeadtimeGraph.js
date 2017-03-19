import React, {Component} from 'react'
import Highcharts from 'highcharts/highstock'
import theme from '../highchartTheme.json'
import Exporting from '../highcharts-exporting.js'
import '../indicators.js'
import './styles/graph.css'

class LeadtimeGraph extends Component {
  constructor() {
    super()
    Exporting(Highcharts)
    this.setChartTheme()
  }
  setChartTheme = () => {
    Highcharts.setOptions(theme);
  }
  renderGraph = (id, leadtime) => {
    const options = {
          xAxis: {
              type: 'datetime'
          },
          yAxis: {
              floor: 0,
              title: {
                  text: 'Days'
              }
          },
          tooltip: {
              crosshairs: true,
              shared: true
          },
          rangeSelector: {
              selected: 5
          },
          legend: {
              enabled: true,
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
              borderWidth: 0
          },
          plotOptions: {
              series: {
                  marker: {
                      enabled: false,
                  }
              }
          },
          series: [{
              name: 'Lead time',
              type: 'line',
              id: 'primary',
              data: leadtime.leadtimeSeries.sort()
          }, {
              name: '7-day SMA',
              linkedTo: 'primary',
              showInLegend: true,
              type: 'trendline',
              algorithm: 'SMA',
              periods: 7
          }, {
              name: '30-day SMA',
              linkedTo: 'primary',
              showInLegend: true,
              type: 'trendline',
              algorithm: 'SMA',
              periods: 30
          }]
      }

    Highcharts.stockChart(id, options)
  }
  componentDidMount() {
    this.renderGraph(this.props.id, this.props.leadtime)
  }
  render () {
    const {id} = this.props
    return (
      <div id={id} className="graph">
      </div>
    )
  }
}

export default LeadtimeGraph
