'use strict'

const lunr = require('lunr')
let index

// resetIndex function resets search index
function resetIndex() {
  index = lunr(() => {
    this.field('file')
    this.field('type')
    this.ref('path')
  })
}

// Adds file to index for searching against
function addToIndex(file) {
  index.add(file)
}

// Queries index for a given file here
function find(query, cb) {
  if (!index) resetIndex()
  const results = index.search(query)
  cb(results)
}

// Exposes some functions for public API
module.exports = {
  addToIndex,
  find,
  resetIndex
}