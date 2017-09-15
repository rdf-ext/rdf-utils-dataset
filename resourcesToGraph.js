const rdf = require('rdf-ext')
const resource = require('./resource')

function resourcesToGraph (input, options) {
  options = options || {}

  const factory = options.factory || rdf

  const output = factory.dataset()

  input.match(null, null, null).filter((quad) => {
    return quad.subject.termType === 'NamedNode'
  }).forEach((resourceQuad) => {
    output.addAll(resource(input, resourceQuad.subject).map((quad) => {
      return factory.quad(quad.subject, quad.predicate, quad.object, resourceQuad.subject)
    }))
  })

  return output
}

module.exports = resourcesToGraph
