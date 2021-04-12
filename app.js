'use strict'

// Node.js’s fs module loads in the app
const osenv = require('osenv')
const fs = require('fs')

function getUsersHomeFolder() {
  return osenv.home()
}

// Simple wrapper around the fs.readdir function for getting list of files
function getFilesInFolder(folderPath, cb) {
  fs.readdir(folderPath, cb)
}

// Function that combines user’s personal folder path with getting its list of files
function main() {
  const folderPath = getUsersHomeFolder()
  getFilesInFolder(folderPath, (err, files) => {
    // Simple message to display in case of error loading folder’s files
    if (err) return alert('Sorry, we could not load your home folder')
    // For each file in list, logs full path for file to console
    files.forEach(file => {
      console.log(`${folderPath}/${file}`)
    })
  })
}

main()