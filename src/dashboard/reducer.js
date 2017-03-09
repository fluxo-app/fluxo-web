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

const initialState =  {
  selectedListIds:[],
  cards: [],
  labels: [],
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.LOAD_CARDS:
      return {...state, selectedListIds: action.payload.selectedListIds}
    case constants.LOAD_CARDS_SUCCEEDED:
      const cards = action.cards
      const labels = decorateLabelWithLeadTime(getLabels(cards))
      return {...state, cards: cards, labels: labels}
    default:
      return {...state}
  }
}

export default reducer
