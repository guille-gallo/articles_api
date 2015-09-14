// BASE SETUP
// =============================================================================

var mongoose   = require('mongoose');
mongoose.connect('mongodb://guille-gallo:Papichulisimo1234@ds039000.mongolab.com:39000/node-api-test'); // connect to our database

var Item     = require('./app/models/item');

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
/*Middleware Uses Using middleware like this can be very powerful. 
We can do validations to make sure that everything coming from a request is safe and sound. 
We can throw errors here in case something is wrong. 
We can do some extra logging for analytics or any statistics we’d like to keep. There are many possibilities here.*/
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/items')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var item = new Item();      // create a new instance of the Bear model
                                    // set the bears name (comes from the request)
        item.id = req.body.id;
        item.name = req.body.name;
        item.description = req.body.description;
        item.author = req.body.author;
        item.borrowed = req.body.borrowed;

        // save the bear and check for errors
        item.save(function(err) {
            if (err)
                res.send(err);

            //res.json({ message: 'Bear created!' });
            res.json(item);
        });
        
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Item.find(function(err, items) {
            if (err)
                res.send(err);

            res.json(items);
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/items/:item_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Item.findById(req.params.item_id, function(err, item) {
            if (err)
                res.send(err);
            res.json(item);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Item.findById(req.params.item_id, function(err, item) {

            if (err)
                res.send(err);

            // update the bears info
            item.name = req.body.name,
            item.description = req.body.description,
            item.author = req.body.author,
            item.borrowed = req.body.borrowed
            
            // save the bear
            item.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'item updated!' });
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Item.remove({
            _id: req.params.item_id
        }, function(err, item) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);