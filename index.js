var defaultMenu = require('electron-default-menu')
var electronWindow = require('electron-window')
var electron = require('electron')
var merry = require('merry')
var path = require('path')

var shell = electron.shell
var Menu = electron.Menu
var app = electron.app

var windowStyles = {
  width: 800,
  height: 600,
  minWidth: 640,
  titleBarStyle: 'hidden-inset'
}

var env = merry.env({
  NODE_ENV: 'production',
  PORT: 8080
})

app.on('ready', function () {
  var mainWindow = electronWindow.createWindow(windowStyles)
  if (env.NODE_ENV === 'development') {
    renderDevelopment(mainWindow)
  } else {
    renderProduction(mainWindow)
  }
})

function renderDevelopment (mainWindow) {
  var bankai = require('bankai')
  var clientPath = path.join(__dirname, 'client.js')
  var indexPath = 'http://localhost:8080'
  var assets = bankai(clientPath)
  var server = merry()

  server.router([
    [ '/', _merryAssets(assets.html.bind(assets)) ],
    [ '/bundle.js', _merryAssets(assets.js.bind(assets)) ],
    [ '/bundle.css', _merryAssets(assets.css.bind(assets)) ]
  ])

  server.listen(env.PORT, function () {
    mainWindow.showUrl(indexPath, function () {
      var menu = Menu.buildFromTemplate(defaultMenu(app, shell))
      Menu.setApplicationMenu(menu)
      mainWindow.webContents.openDevTools()
    })
  })
}

function renderProduction (mainWindow) {
  var indexPath = path.join(__dirname, 'dist/index.html')
  mainWindow.showUrl(indexPath, function () {
    var menu = Menu.buildFromTemplate(defaultMenu(app, shell))
    Menu.setApplicationMenu(menu)
  })
}

function _merryAssets (assets) {
  return function (req, res, ctx, done) {
    done(null, assets(req, res))
  }
}
