var defaultMenu = require('electron-default-menu')
var electronWindow = require('electron-window')
var electron = require('electron')
var merry = require('merry')
var path = require('path')

var shell = electron.shell
var Menu = electron.Menu
var app = electron.app

const windowStyles = {
  width: 800,
  height: 600,
  titleBarStyle: 'hidden-inset',
  minWidth: 640
}

var env = merry.env({
  ENVIRONMENT: 'production'
})

app.on('ready', function () {
  var mainWindow = electronWindow.createWindow(windowStyles)
  var indexPath = path.join(__dirname, 'index.html')

  mainWindow.showUrl(indexPath, function () {
    var menu = Menu.buildFromTemplate(defaultMenu(app, shell))
    Menu.setApplicationMenu(menu)
    if (env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools()
    }
  })
})
