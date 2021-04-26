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
//   const smartContract = require('./blockchain/Methods');
//   await smartContract.addElection(6);
//   await smartContract.getNumOfElections();
// };

// a();

require('./routes/admin.js')(app);
require('./routes/voter.js')(app);

app.listen(2002, () => console.log('Server @ port 2002'));
console.log("Don't forget to start Ganache on port 8545");
module.exports = app;
