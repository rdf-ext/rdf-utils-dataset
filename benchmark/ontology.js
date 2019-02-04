const fs = require('fs')
const rdf = require('rdf-ext')
const N3Parser = require('rdf-parser-n3')
const Readable = require('readable-stream').Readable

module.exports = deserialize

async function deserialize () {
  const parser = new N3Parser({ factory: rdf })
  const string = fs.readFileSync(require.resolve('./ontology.nt'))

  const input = new Readable({
    read: () => {
      input.push(string)
      input.push(null)
    }
  })

  const quadStream = parser.import(input)

  return rdf.dataset().import(quadStream)
}
