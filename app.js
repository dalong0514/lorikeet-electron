'use strict'

// Node.js’s fs module loads in the app
const osenv = require('osenv')
const fs = require('fs')

function getUsersHomeFolder() {
  return osenv.home()
}

function getFilesInFolder(folderPath, cb) {
  fs.readdir(folderPath, cb)
}

function main() {
  const folderPath = getUsersHomeFolder()
  getFilesInFolder(folderPath, (err, files) => {
    if (err) return alert('Sorry, we could not load your home folder')
    files.forEach(file => {
      console.log(`${folderPath}/${file}`)
    })
  })
}

main()