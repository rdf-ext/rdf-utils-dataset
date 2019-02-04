function resource (_input, subject, cloned = false) {
  const input = cloned ? _input : _input.clone()

  const quads = input.filter((quad) => {
    if (subject.termType === 'NamedNode') {
      return quad.subject.value.split('#')[0] === subject.value.split('#')[0]
    }

    return quad.subject.equals(subject)
  })

  if (quads.length > 0) {
    quads.forEach(triple => {
      if (triple.subject.termType !== 'BlankNode' && triple.object.termType !== 'BlankNode') {
        input.remove(triple)
      }
    })
    quads.forEach((quad) => {
      if (quad.object.termType !== 'NamedNode') {
        quads.addAll(resource(input, quad.object, true))
      }
    })
  }

  return quads
}

module.exports = resource
