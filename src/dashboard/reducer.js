import * as constants from './constants'
import moment from 'moment'

const getLeadTime = (cards) => {
  const updateCountAndPercent = item => {
    item.count += 1
    item.percent = item.count / cards.length * 100
  }
  return cards && cards.length > 0 && cards.reduce((previous, card) => {
    if (card && card.actions && card.actions.length > 0) {
      const createDate = moment(card.actions[card.actions.length - 1].date)
      const lastDate = moment(card.actions[0].date)
      const diff = lastDate.diff(createDate)
      const leadtime = Math.abs(moment.duration(diff).asDays())
      previous.total += leadtime
      previous.average = cards.length === 0 ? 0 : previous.total / cards.length
      previous.leadtimeSeries.push([lastDate.utc().valueOf(), leadtime])
      if(leadtime < 1) {
        updateCountAndPercent(previous.lessThenADay)
      }
      if(leadtime >= 1 && leadtime < 8) {
        updateCountAndPercent(previous.betweenOneAndSevenDays)
      }
      if(leadtime >= 8 && leadtime < 31) {
        updateCountAndPercent(previous.betweenEightAndThirtyDay)
      }
      if(leadtime >= 31) {
        updateCountAndPercent(previous.overThirtyDays)
      }
    }
    return previous
  }, {
      total: 0,
      average: 0,
      leadtimeSeries:[],
      lessThenADay: {
        percent: 0,
        count: 0,
      },
      betweenOneAndSevenDays: {
        percent: 0,
        count: 0,
      },
      betweenEightAndThirtyDay: {
        percent: 0,
        count: 0,
      },
      overThirtyDays: {
        percent: 0,
        count: 0,
      }
    })
}

const decorateLabelWithLeadTime = (labels) => {
  return labels && labels.length > 0 && labels.map(label => {
    const leadtime = getLeadTime(label.cards)
    return {...label, leadtime: leadtime}
  })
}

const pushCardToLabel = (array, label, labelCard) => {
  if (array.filter(item => item.name === label.name).length === 0) {
    label.cards = [labelCard]
    array.push(label)
  } else {
    array.filter(item => item.name === label.name)[0].cards.push(labelCard)
  }

  return array
}

const getLabels = (cards) => {
  return cards && cards.length > 0 && cards.reduce((previous, card) => {
    const labelCard = {
      id: card.id,
      name: card.name,
      actions: card.actions,
    }
    previous[0].cards.push(labelCard)

    if(card && card.labels && card.labels.length === 0) {
      return pushCardToLabel(previous, {id: 'nolabel', name:'(no label)', cards:[]}, labelCard)
    }

    for (let label of card.labels) {
      previous = pushCardToLabel(previous, label, labelCard)
    }

    return previous
  }, [{id:'totals', name:'Totals', cards:[]}])
}

const getUtcDateAsTick = (date) => {
  return moment(date).utc().valueOf()
}

const addToLists = (lists, list, tick, value) => {
  if (!list) {
    return lists
  }

  return lists.map(l => {
    const found = l.data.find(d => d[0] === tick)
    if (l.id === list.id) {
      l.name = list.name
      if (found) {
        found[1] += value
      } else {
        l.data.push([tick, value])
        l.ticks.push([tick, value])
      }
    } else {
      if (!found) {
        l.data.push([tick, 0])
        l.ticks.push([tick, 0])
      }
    }

    return l
  })
}
const getCumulativeFlow = (cards, selectedListIds) => {
  const cumulativeFlow = {
    lists: []
  }

  selectedListIds && selectedListIds.map(id => {
    cumulativeFlow.lists.push({
      id: id,
      name: '',
      ticks:[],
      data: []
    })
    return id
  })

  cards.map(card => {
    card.actions.map(action => {
      const tick = getUtcDateAsTick(action.date)
      const listAfter = action.data && action.data.list ? action.data.list : action.data.listAfter
      addToLists(cumulativeFlow.lists, listAfter, tick, 1)

      const listBefore = action.data && action.data.listBefore
      addToLists(cumulativeFlow.lists, listBefore, tick, -1)

      return action
    })

    return card
  })

  cumulativeFlow.lists.map(list => {
    list.data.sort()
    list.ticks.sort()
    list.data.reduce((prev, current) => {
      current[1] += prev[1]
      if (current[1] < 0) {
        current[1] = 0
      }

      return current
    }, [0,0])

    return list
  })

  return cumulativeFlow
}

const decorateLabelWithCumulativeFlow = (labels, selectedListIds) => {
  return labels && labels.map(label => {
    const cumulativeFlow = getCumulativeFlow(label.cards, selectedListIds)
    return {...label, cumulativeFlow: cumulativeFlow}
  })
}

const initialState =  {
  selectedListIds:[],
  cards: [],
  labels: [],
  lists: []
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.LOAD_CARDS:
      return {...state, selectedListIds: state.selectedListIds.concat(action.payload.id)}
    case constants.LOAD_CARDS_SUCCEEDED:
      const lists = state.lists.concat(action.list)
      const lastList = lists[lists.length - 1]
      const labels = decorateLabelWithLeadTime(getLabels(lastList.cards))

      const cards = state.cards.concat(action.list.cards)
      const cumulativeLabels = decorateLabelWithCumulativeFlow(getLabels(cards), state.selectedListIds)

      return {...state, lists: lists, cards: cards, labels: labels, cumulativeLabels: cumulativeLabels}
    default:
      return {...state}
  }
}

export default reducer
