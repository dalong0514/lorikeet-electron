'use strict'

let document
const fileSystem = require('./fileSystem')
const search = require('./search')
const path = require('path')

// Adds function to display current folder
function displayFolderPath(folderPath) {
  document.getElementById('current-folder')
    .innerHTML= convertFolderPathIntoLinks(folderPath)
}

// Clears items out of main-area div element
function clearView() {
  const mainArea = document.getElementById('main-area')
  let firstChild = mainArea.firstChild
  while (firstChild) {
    mainArea.removeChild(firstChild)
    firstChild = mainArea.firstChild
  }
}

// loadDirectory changes current folder path and updates main area
function loadDirectory(folderPath) {
  return function(window) {
    if (!document) document = window.document
    // Adds the call to reset the search index
    search.resetIndex()
    displayFolderPath(folderPath)
    fileSystem.getFilesInFolder(folderPath, (err, files) => {
      clearView()
      if (err) return alert('Sorry, you could not load your folder')
      fileSystem.inspectAndDescribeFiles(folderPath, files, displayFiles)
    })
  }
}

function displayFile(file) {
  const mainArea = document.getElementById('main-area')
  const template = document.querySelector('#item-template')
  // Creates copy of template instance
  let clone = document.importNode(template.content, true)
  // Adds file to search index here
  search.addToIndex(file)
  // Alters instance to include file’s name and icon
  clone.querySelector('img').src = `images/${file.type}.svg`
  // Attaches file’s path as data attribute to image element
  clone.querySelector('img').setAttribute('data-filePath', file.path)
  // Adds double-click event listener to icon if it’s for a directory
  if (file.type === 'directory') {
    clone.querySelector('img')
      .addEventListener('dblclick', () => {
        loadDirectory(file.path)()
      }, false)
  }
  clone.querySelector('.filename').innerText = file.file
  // Appends template instance to "mainarea" div element
  mainArea.appendChild(clone)
}

// Creates displayFiles function to be end point where files will end up being displayed
function displayFiles(err, files) {
  if (err) return alert('Sorry, we could not display your files')
  files.forEach(displayFile)
}

function bindDocument(window) {
  if (!document) document = window.document
}

function bindSearchField(cb) {
  document.getElementById('search').addEventListener('keyup', cb, false)
}

function filterResults(results) {
  // Collects file paths for search results so you can compare them
  const validFilePaths = results.map((result) => { 
    return result.ref
   })
  const items = document.getElementsByClassName('item')
  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    let filePath = item.getElementsByTagName('img')[0]
      .getAttribute('data-filepath')
    // Does file’s path match with one of the search results?
    // If so, make sure file is visible
    if (validFilePaths.indexOf(filePath) !== -1) item.style = null
    // If not, hide file
    else item.style = 'display:none;'
  }
}

function resetFilter() {
  const items = document.getElementsByClassName('item')
  for (let i = 0; i < items.length; i++) items[i].style = null
}

function convertFolderPathIntoLinks(folderPath) {
  const folders = folderPath.split(path.sep)
  const contents = []
  let pathAtFolder = ''
  folders.forEach((folder) => {
    pathAtFolder += folder + path.sep
    contents.push(`<span class="path" data-path="${pathAtFolder.slice(0,-1)}">${folder}</span>`)
  })
  return contents.join(path.sep).toString()
}

// Makes sure function is exposed as public API
module.exports = {
  bindDocument,
  displayFiles,
  loadDirectory,
  bindSearchField,
  filterResults,
  resetFilter
}