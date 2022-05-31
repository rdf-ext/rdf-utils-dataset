import datasetFactory from '@rdfjs/dataset'
import rdf from 'rdf-ext'

function morph (dataset, createDataset) {
  const result = createDataset()
  for (const quad of dataset) {
    result.add(quad)
  }
  return result
}

function toRDFCore (dataset) {
  return morph(dataset, datasetFactory.dataset)
}

function toRDFExt (dataset) {
  return morph(dataset, rdf.dataset)
}

export { toRDFCore, toRDFExt }
