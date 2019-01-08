function resource (input, subject) {
  const quads = input.filter((quad) => {
    if (subject.termType === 'NamedNode') {
      return quad.subject.value.split('#')[0] === subject.value.split('#')[0]
    }

    return quad.subject.equals(subject)
  })

  if (quads.length !== 0) {
    quads.forEach((quad) => {
      if (quad.object.termType !== 'NamedNode') {
        quads.addAll(resource(input, quad.object))
      }
    })
  }

  return quads
}

module.exports = resource
