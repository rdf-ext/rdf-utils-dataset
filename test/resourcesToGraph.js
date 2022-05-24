/* global describe, it */

import assert from 'assert'
import rdf from 'rdf-ext'
import resourcesToGraph from '../resourcesToGraph.js'

describe('resourcesToGraph', () => {
  it('should split resources in separate graphs', () => {
    const predicate = rdf.namedNode('http://example.org/predicate')
    const namedNode0 = rdf.namedNode('http://example.org/node0')
    const namedNode1 = rdf.namedNode('http://example.org/node1')
    const blankNode0 = rdf.blankNode()
    const blankNode1 = rdf.blankNode()

    const input = rdf.dataset([
      rdf.quad(namedNode0, predicate, blankNode0),
      rdf.quad(blankNode0, predicate, namedNode1),
      rdf.quad(namedNode1, predicate, blankNode1)
    ])

    const output = resourcesToGraph(input)

    const expected = rdf.dataset([
      rdf.quad(namedNode0, predicate, blankNode0, namedNode0),
      rdf.quad(blankNode0, predicate, namedNode1, namedNode0),
      rdf.quad(namedNode1, predicate, blankNode1, namedNode1)
    ])

    assert.equal(output.toCanonical(), expected.toCanonical())
  })

  it('should ignore the fragment part of the subject', () => {
    const predicate = rdf.namedNode('http://example.org/predicate')
    const namedNode0 = rdf.namedNode('http://example.org/node')
    const namedNode1 = rdf.namedNode('http://example.org/node#fragment')
    const blankNode0 = rdf.blankNode()
    const blankNode1 = rdf.blankNode()

    const input = rdf.dataset([
      rdf.quad(namedNode0, predicate, blankNode0),
      rdf.quad(blankNode0, predicate, namedNode1),
      rdf.quad(namedNode1, predicate, blankNode1)
    ])

    const output = resourcesToGraph(input)

    const expected = rdf.dataset([
      rdf.quad(namedNode0, predicate, blankNode0, namedNode0),
      rdf.quad(blankNode0, predicate, namedNode1, namedNode0),
      rdf.quad(namedNode1, predicate, blankNode1, namedNode0)
    ])

    assert.equal(output.toCanonical(), expected.toCanonical())
  })

  it('should use the given factory', () => {
    const predicate = rdf.namedNode('http://example.org/predicate')
    const namedNode = rdf.namedNode('http://example.org/node')
    const blankNode = rdf.blankNode()

    const input = rdf.dataset([
      rdf.quad(namedNode, predicate, blankNode)
    ])

    let count = 0

    const factory = {
      dataset: () => {
        count++

        return rdf.dataset()
      },
      namedNode: iri => {
        count++

        return rdf.namedNode(iri)
      },
      quad: (s, p, o, g) => {
        count++

        return rdf.quad(s, p, o, g)
      }
    }

    resourcesToGraph(input, { factory })

    assert.equal(count, 3)
  })
})
