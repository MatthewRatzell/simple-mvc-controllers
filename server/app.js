// import libraries
const path = require('path');
//middleware handles response request 
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const router = require('./router.js');
//process.END."mykey"
//DB URL
const port = process.env.PORT || process.env.NODE_PORT || 3000;
//grab the mongo we want to connect to
const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/simpleMVCExample';
mongoose.connect(dbURL, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

//set up our express app for routing
const app = express();

//grabs the static files for express to interact with
app.use('/assets', express.static(path.resolve(`${__dirname}/../client/`)));
//compress response for all requests
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
//make sure it returns json
app.use(bodyParser.json());

app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: '',
}));
//set what we wnt for views
app.set('view engine', 'handlebars');
//tell it where to find them
app.set('views', `${__dirname}/../views`);

app.use(favicon(`${__dirname}/../client/img/favicon.png`));

router(app);

//listen for requests
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});

