'use strict'

// Node.js’s fs module loads in the app
const fileSystem = require('./fileSystem')
const userInterface = require('./userInterface')
const search = require('./search')

// Function that combines user’s personal folder path with getting its list of files
function main() {
  userInterface.bindDocument(window)
  let folderPath = fileSystem.getUsersHomeFolder()
  userInterface.loadDirectory(folderPath)(window)
  // Listens for changes to search field’s value
  userInterface.bindSearchField((event) => {
    const query = event.target.value
    // If search field is blank, resets filter in UI
    if (query === '') userInterface.resetFilter()
    // If search field has a value, passes it to search module’s find function and filters results in UI
    else search.find(query, userInterface.filterResults)
  })
}

// Calls main function after HTML for app has loaded in window
window.onload = main