function resource (input, subject) {
  const quads = input.match(subject, null, null)

  if (quads.length !== 0) {
    quads.filter((quad) => {
      return quad.object.termType !== 'NamedNode'
    }).forEach((quad) => {
      quads.addAll(resource(input, quad.object))
    })
  }

  return quads
}

module.exports = resource
