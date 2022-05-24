# rdf-utils-dataset
[![build status](https://img.shields.io/github/workflow/status/rdf-ext/rdf-utils-dataset/Test)](https://github.com/rdf-ext/rdf-utils-dataset/actions/workflows/test.yaml)
[![npm version](https://img.shields.io/npm/v/rdf-utils-dataset.svg)](https://www.npmjs.com/package/rdf-utils-dataset)

Utils for RDFJS Datasets.

## Functions

### resource(dataset, subject)

Returns a subgraph of `dataset`. It's created by traversing `dataset` starting at subject. Traversing stops at quads with a `NamedNode` subject.

#### Example

Say you have the following triples in a *dataset*:

```turtle
@prefix ex:<http://example.org/>.

ex:Alice
    ex:address [ ex:street "Wonderland Street" ;
                 ex:number "22" ] ;
    ex:name "Alice" .

ex:Bob
    ex:name "Bob" .
```

Then, the *resource* function

```js
import { resource } from 'rdf-utils-dataset'

const dataset = // Load the dataset somehow
const result = resource(dataset, rdf.namedNode('http://example.org/Alice'))
console.log(result.toCanonical())
```

yields:

```n3
<http://example.org/Alice> <http://example.org/address> _:c14n0 .
<http://example.org/Alice> <http://example.org/name> "Alice" .
_:c14n0 <http://example.org/number> "22" .
_:c14n0 <http://example.org/street> "WonderLand Street" .
```

(Note that the description follows blank nodes)

### resourcesToGraph (dataset, options)

Searches for all `NamedNode` subjects in `dataset` and creates subgraphs using `resource()`. The graph of the quads are set to the start subject.  

### Example

Say you have the following triples in a *dataset*:

```turtle
@prefix ex:<http://example.org/>.

ex:Alice
    ex:address [ ex:street "Wonderland Street" ;
                 ex:number "22" ] ;
    ex:name "Alice" .

ex:Bob
    ex:name "Bob" .
```

Then, the *resourcesToGraph* function

```js
import { resourcesToGraph } from 'rdf-utils-dataset'

const dataset = // Load the dataset somehow
const result = resourcesToGraph(dataset)
console.log(result.toCanonical())
```

yields:

```n3
<http://example.org/Alice> <http://example.org/address> _:c14n0 <http://example.org/Alice> .
<http://example.org/Alice> <http://example.org/name> "Alice" <http://example.org/Alice> .
<http://example.org/Bob> <http://example.org/name> "Bob" <http://example.org/Bob> .
_:c14n0 <http://example.org/number> "22" <http://example.org/Alice> .
_:c14n0 <http://example.org/street> "WonderLand Street" <http://example.org/Alice> .
```

## Loading the functions

Each util function can be loaded as property from the main module or by loading only the file with the same name. Loading the individual files can decrease the file size after packaging the JavaScript code for the browser.

### Usage

Loading the function from the main module:

```js
import { resource } from 'rdf-utils-dataset'
```

Loading the function from the file with the function name:

```js
import resource from 'rdf-utils-dataset/resource.js'
```
