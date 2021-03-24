var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser({ limit: '50mb' }));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(2002, () => console.log('Server @ port 2002'));
module.exports = app;