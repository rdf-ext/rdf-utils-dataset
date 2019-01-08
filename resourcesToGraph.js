const rdf = require('rdf-ext')
const resource = require('./resource')

function resourcesToGraph (input, options) {
  options = options || {}

  const factory = options.factory || rdf

  const output = factory.dataset()

  input.toArray()
    .reduce((resourceIRIs, quad) => {
      if (quad.subject.termType !== 'NamedNode') {
        return resourceIRIs
      }
      const resourceIRI = quad.subject.value.split('#')[0]

      if (resourceIRIs.indexOf(resourceIRI) === -1) {
        resourceIRIs.push(resourceIRI)
      }

      return resourceIRIs
    }, [])
    .forEach((resourceIRI) => {
      const resourceNode = factory.namedNode(resourceIRI)

      output.addAll(resource(input, resourceNode).map((quad) => {
        return factory.quad(quad.subject, quad.predicate, quad.object, resourceNode)
      }))
    })

  return output
}

module.exports = resourcesToGraph
