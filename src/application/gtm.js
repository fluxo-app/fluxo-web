const trackEvent = (action, label) => {
  if (window.dataLayer){
    window.dataLayer.push({
     'eventCategory': 'fluxo.hugohaggmark.com',
     'eventAction': action,
     'eventLabel': label,
     'event': 'genericTrackEvent'
    })
  }
}

export default trackEvent
