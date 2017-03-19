import React, {Component} from 'react'
import Highcharts from 'highcharts/highstock'
import theme from '../highchartTheme.json'
import Exporting from '../highcharts-exporting.js'
import '../indicators.js'
import './styles/graph.css'

class CumulativeFlowGraph extends Component {
  constructor() {
    super()
    Exporting(Highcharts)
    this.setChartTheme()
  }
  setChartTheme = () => {
    Highcharts.setOptions(theme);
  }
  renderGraph = (id, cumulativeFlow) => {
    const options = {
      chart: {
          type: 'area'
      },
      title: {
          text: ''
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
          title: {
              text: 'Cards'
          }
      },
      tooltip: {
          split: true,
          valueSuffix: ''
      },
      plotOptions: {
          area: {
              stacking: 'normal',
              lineColor: '#666666',
              lineWidth: 1
          }, series: {
            marker: {
                enabled: false
            }
        }
      },
      series: cumulativeFlow.lists
    }

    Highcharts.chart(id, options)
  }
  componentDidMount() {
    this.renderGraph(this.props.id, this.props.cumulativeFlow)
  }
  render () {
    return (
      <div id={this.props.id} className="graph">
      </div>
    )
  }
}

export default CumulativeFlowGraph
