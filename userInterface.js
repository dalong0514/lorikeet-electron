'use strict'

let document
const fileSystem = require('./fileSystem')

// Adds function to display current folder
function displayFolderPath(folderPath) {
  document.getElementById('current-folder').innerText = folderPath
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
  return function (window) {
    if (!document) document = window.document
    displayFolderPath(folderPath)
    fileSystem.getFilesInFolder(folderPath, (err, files) => {
      clearView()
      if (err) return alert('Sorry, you could not load your folder')
      fileSystem.inspectAndDescribeFiles(folderPath, files, displayFiles)
    })
  }
}

// Adds new function called displayFile that handles rendering template instance
function displayFile(file) {
  const mainArea = document.getElementById('main-area')
  const template = document.querySelector('#item-template')
  // Creates copy of template instance
  let clone = document.importNode(template.content, true)
  // Alters instance to include file’s name and icon
  clone.querySelector('img').src = `images/${file.type}.svg`
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

function bindDocument (window) {
  if (!document) document = window.document
}

// Makes sure loadDirectory function is exposed as public API
module.exports = {
  bindDocument,
  displayFiles,
  loadDirectory
}