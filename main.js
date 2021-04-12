'use strict'

const {app, BrowserWindow} = require('electron')

// mainWindow 变量保存了对应用窗口的引用
let mainWindow = null

// 监听所有的视窗关闭的事件（Mac OS 不会触发该事件）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('ready', () => {
  // 创建一个新的应用窗口并将它赋值给 mainWindow 变量，以防止被 Node.js 进行垃圾回收时将视窗关闭
  mainWindow = new BrowserWindow()
  // 将 index.html 加载进应用视窗
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  // 应用关闭时，释放 mainWindow 变量对应视窗的引用
  mainWindow.on('closed', () => {
    mainWindow =null
  })
})