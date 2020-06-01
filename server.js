const express = require('express');
const bodyParser = require('body-parser');
const port = 1000;

const mongoose = require('mongoose');
const dbConfig = require('./config/db-config');
const dbConfigTest = require('./config/test-config');

const routes = require('./routes/routes.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let dbUrl = dbConfig.url;

if(app.get('env') === 'test'){
     dbUrl = dbConfigTest.url;
}

mongoose.connect(dbUrl, { useNewUrlParser: true }) 
   .then(() => {
       console.log("Successfully connected to the MongoDB database");
   }).catch(err => {
       console.log("Can't connect to the MongoDB databse", err);
    //    process.exit();
   })

routes(app);

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});

module.exports = app;   //for unit testing