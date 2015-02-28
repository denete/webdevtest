var express = require('express');
var app = express();

app.use(express.static('src'));

app.get('/', function (req, res) {
  res.send('you should be seeing src folder stuff.');
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Site Demo listening at http://%s:%s', host, port)

})
