'use strict'

// Node.js’s fs module loads in the app
const osenv = require('osenv')
const fs = require('fs')
const async = require('async')
const path = require('path')

function getUsersHomeFolder() {
  return osenv.home()
}

// Simple wrapper around the fs.readdir function for getting list of files
function getFilesInFolder(folderPath, cb) {
  fs.readdir(folderPath, cb)
}

// Uses path module to get name for file
function inspectAndDescribeFile(filePath, cb) {
  let result = {
    file: path.basename(filePath),
    path: filePath,
    type: ''
  }
  // fs.stat call supplies an object you can query to find out file’s type
  fs.stat(filePath, (err, stat) => {
    if (err) cb(err)
    if (stat.isFile()) result.type = 'file'
    if (stat.isDirectory()) result.type = 'directory'
    cb(err, result)
  })
}

// Uses async module to call asynchronous function and collects results together
function inspectAndDescribeFiles(folderPath, files, cb) {
  async.map(files, (file, asyncCb) => {
    let resolvedFilePath = path.resolve(folderPath, file)
    inspectAndDescribeFile(resolvedFilePath, asyncCb)
  }, cb)
}

module.exports = {
  getUsersHomeFolder,
  getFilesInFolder,
  inspectAndDescribeFiles
}