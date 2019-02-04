const rdf = require('rdf-ext')
const resource = require('./resource')
const cloned = true

function resourcesToGraph (_input, options = {}) {
  const input = _input.clone()
  const factory = options.factory || rdf

  const output = factory.dataset()

  const resourceIRIs = input.toArray()
    .reduce((iriSet, quad) => {
      if (quad.subject.termType !== 'NamedNode') {
        return iriSet
      }

      iriSet.add(quad.subject.value.split('#')[0])

      return iriSet
    }, new Set())

  resourceIRIs.forEach((resourceIRI) => {
    const resourceNode = factory.namedNode(resourceIRI)
    const resourceTriples = resource(input, resourceNode, cloned)

    resourceTriples.forEach(triple => {
      if (triple.subject.termType !== 'BlankNode') {
        input.remove(triple)
      }
    })

    output.addAll(resourceTriples.map((quad) => factory.quad(quad.subject, quad.predicate, quad.object, resourceNode)))
  })

  return output
}

module.exports = resourcesToGraph
