import resourcesToGraph from '../resourcesToGraph.js'
import deserialize from './ontology.js'

async function logTimes () {
  const dataset = await deserialize()
  let TEST = `resourcesToGraph`
  console.time(TEST)
  resourcesToGraph(dataset)
  console.timeEnd(TEST)
}

logTimes()
