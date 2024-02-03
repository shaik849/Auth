const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
let cors = require('cors');

const userRoute = require('./Router/User.js');

let DB_URL = process.env.DATABASE_URL

app.use(morgan('dev'))
app.use(cors('*'));
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.text({ limit: '50mb', type: 'text/html' }));
// next();
// express.json()(req, res, next);  // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
//   }
// });

app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected....');
}).catch(err => {console.error(err);});
app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
})

app.use('/api', userRoute);