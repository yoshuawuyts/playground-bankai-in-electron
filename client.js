var mount = require('choo/mount')
var html = require('choo/html')
var css = require('sheetify')
var log = require('choo-log')
var choo = require('choo')

;css('tachyons')

var app = choo()
app.use(log())

app.router(['/', mainView])
mount('body', app.start())

function mainView () {
  return html`
    <body>
      Hello planet
    </body>
  `
}
