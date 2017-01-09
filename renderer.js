var mount = require('choo/mount')
var html = require('choo/html')
var choo = require('choo')

var app = choo()
app.router(['/', mainView])
mount('body', app.start())

function mainView () {
  return html`
    <body>
      Hello planet
    </body>
  `
}
