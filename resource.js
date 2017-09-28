function resource (input, subject) {
  const quads = input.filter((quad) => {
    if (subject.termType === 'NamedNode') {
      return quad.subject.value.split('#').shift() === subject.value.split('#').shift()
    }

    return quad.subject.equals(subject)
  })

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
