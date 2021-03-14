const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    Router = require('./server.Routes'),
    cors = require('cors');
    bodyParser = require('body-parser'),

module.exports.init = () => {

    /*
        connect to database
        - reference README for db uri
    */
    
     mongoose.connect(process.env.DB_URI || require('./config.js').mongoURI, {
         useNewUrlParser: true
     });
     



    /*mongoose.connect(require('./config').mongoURI, {
        useNewUrlParser: true
    });*/


    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);


    // initialize app
    const app = express();

    app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    // enable request logging for development debugging

    // add a router

    app.use('/api', Router);

    return app
};
