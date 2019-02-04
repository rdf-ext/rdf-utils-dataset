/* global describe, it */

const assert = require('assert')
const rdf = require('rdf-ext')
const resource = require('../resource')

describe('resource', () => {
  it('should create sub graph for a resource', () => {
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

    const output = resource(input, namedNode0)

    const expected = rdf.dataset([
      rdf.quad(namedNode0, predicate, blankNode0),
      rdf.quad(blankNode0, predicate, namedNode1)
    ])

    assert.equal(output.toCanonical(), expected.toCanonical())
  })

  it('should handle circular links', () => {
    const predicate = rdf.namedNode('http://example.org/predicate')
    const namedNode = rdf.namedNode('http://example.org/node')
    const blankNode = rdf.blankNode()

    const input = rdf.dataset([
      rdf.quad(namedNode, predicate, blankNode),
      rdf.quad(blankNode, predicate, namedNode)
    ])

    const output = resource(input, namedNode)

    assert.equal(output.toCanonical(), input.toCanonical())
  })

  it('should ignore the fragment part of the subject', () => {
    const predicate = rdf.namedNode('http://example.org/predicate')
    const namedNode0 = rdf.namedNode('http://example.org/node')
    const namedNode1 = rdf.namedNode('http://example.org/node#fragmet')
    const blankNode = rdf.blankNode()

    const input = rdf.dataset([
      rdf.quad(namedNode0, predicate, blankNode),
      rdf.quad(namedNode1, predicate, blankNode)
    ])

    const output = resource(input, namedNode0)

    assert.equal(output.toCanonical(), input.toCanonical())
  })
})
