import rdf from 'rdf-ext'
import resource from './resource.js'

function resourcesToGraph (dataset, options = {}) {
  const factory = options.factory || rdf

  const input = factory.dataset()
  for (const quad of dataset) {
    input.add(quad)
  }

  const output = factory.dataset()

  const resourceIRIs = [...input]
    .reduce((iriSet, quad) => {
      if (quad.subject.termType !== 'NamedNode') {
        return iriSet
      }

      iriSet.add(quad.subject.value.split('#')[0])

      return iriSet
    }, new Set())

  resourceIRIs.forEach((resourceIRI) => {
    const resourceNode = factory.namedNode(resourceIRI)
    const resourceTriples = resource(input, resourceNode)

    resourceTriples.forEach(triple => {
      if (triple.subject.termType !== 'BlankNode') {
        input.delete(triple)
      }
    })

    output.addAll(resourceTriples.map((quad) => factory.quad(quad.subject, quad.predicate, quad.object, resourceNode)))
  })

  return output
}

export default resourcesToGraph
