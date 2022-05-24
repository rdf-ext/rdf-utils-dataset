import fs from 'fs'
import rdf from 'rdf-ext'
import N3Parser from 'rdf-parser-n3'
import Readable from 'readable-stream'

async function deserialize () {
  const parser = new N3Parser({ factory: rdf })
  const string = fs.readFileSync('./ontology.nt')

  const input = new Readable({
    read: () => {
      input.push(string)
      input.push(null)
    }
  })

  const quadStream = parser.import(input)

  return rdf.dataset().import(quadStream)
}

export default deserialize
