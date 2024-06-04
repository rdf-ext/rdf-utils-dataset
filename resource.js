import rdf from 'rdf-ext'

function resource (dataset, subject) {
  const siblings = rdf.termSet()

  for (const quad of dataset) {
    if (quad.subject.value.split('#')[0] === subject.value.split('#')[0]) {
      siblings.add(quad.subject)
    }
  }

  const descriptionWithBlankNodes = rdf.traverser(({ level, quad }) => {
    return level === 0 || quad.subject.termType === 'BlankNode'
  })

  const result = rdf.dataset()
  siblings.forEach(subject => {
    result.addAll(descriptionWithBlankNodes.match({ term: subject, dataset }))
  })
  return result
}

export default resource
