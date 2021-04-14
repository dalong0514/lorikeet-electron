'use strict'

// Node.js’s fs module loads in the app
const fileSystem = require('./fileSystem')
const userInterface = require('./userInterface')

// Function that combines user’s personal folder path with getting its list of files
function main() {
  userInterface.bindDocument(window)
  let folderPath = fileSystem.getUsersHomeFolder()
  userInterface.loadDirectory(folderPath)(window)
}

// Calls main function after HTML for app has loaded in window
window.onload = main