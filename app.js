'use strict'

// Node.js’s fs module loads in the app
const fileSystem = require('./fileSystem')
const userInterface = require('./userInterface')

// Function that combines user’s personal folder path with getting its list of files
function main() {
  userInterface.bindDocument(window)
  const folderPath = fileSystem.getUsersHomeFolder()
  fileSystem.getFilesInFolder(folderPath, (err, files) => {
    // Simple message to display in case of error loading folder’s files
    if (err) return alert('Sorry, we could not load your home folder')
    fileSystem.inspectAndDescribeFiles(folderPath, files, userInterface.displayFiles)
  })
}

main()