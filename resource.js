function resource (_input, subject, cloned = false) {
  const input = cloned ? _input : _input.clone()

  const quads = input.filter((quad) => {
    if (subject.termType === 'NamedNode') {
      return quad.subject.value.split('#')[0] === subject.value.split('#')[0]
    }

    return quad.subject.equals(subject)
  })

  for (const triple of quads) {
    if (triple.subject.termType !== 'BlankNode' && triple.object.termType !== 'BlankNode') {
      input.delete(triple)
    }
  }

  for (const quad of quads) {
    if (quad.object.termType !== 'NamedNode') {
      quads.addAll(resource(input, quad.object, true))
    }
  }

  return quads
}

export default resource
