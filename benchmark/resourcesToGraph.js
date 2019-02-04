const resourcesToGraph = require('../resourcesToGraph')
require('./ontology')().then(dataset => {
  let TEST = `resourcesToGraph`
  console.time(TEST)
  resourcesToGraph(dataset)
  console.timeEnd(TEST)
})
