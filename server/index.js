require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser({ limit: '50mb' }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use blockchain functions like this
// let a = async () => {
//   const voting = require('./blockchain/Methods');
//   await voting.addElection(6);
//   await voting.getNumOfElections();
// };

// a();

require('./routes/admin.js')(app);
require('./routes/voter.js')(app);

app.listen(2002, () => console.log('Server @ port 2002'));
module.exports = app;
