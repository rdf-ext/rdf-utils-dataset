# rdf-utils-dataset

[![Build Status](https://travis-ci.org/rdf-ext/rdf-utils-dataset.svg?branch=master)](https://travis-ci.org/rdf-ext/rdf-utils-dataset)
[![npm version](https://badge.fury.io/js/rdf-utils-dataset.svg)](https://badge.fury.io/js/rdf-utils-dataset)

Utils for RDFJS Datasets.

## Usage

Each util function can be loaded as property from the main module or by loading only the file with the same name.
Loading the individual files can decrease the file size after packaging the JavaScript code for the browser.

### Example

Loading the function from the main module:

    const resource = require('rdf-utils-dataset').resource
 
Loading the function from the file with the function name:

    const resource = require('rdf-utils-dataset/resource')

## Functions

### resource(input, subject)

Returns a subgraph of `input`.
It's created by traversing `input` starting at subject.
Traversing stops at quads with a `NamedNode` subject.

### resourcesToGraph (input, options)

Searches for all `NamedNode` subjects in `input` and creates subgraphs using `resource()`.
The graph of the quads are set to the start subject.  
