const express = require('express');
const Collection = require('mongodb/lib/collection');
const ObjectID = require('mongodb').ObjectID

const createRouter = function (collection) {
    
    const router = express.Router();


    // post to database base url
    router.post('/', (request, response) => {
        const newData = request.body
        collection
        .insertOne(newData)
        .then((result => {
            response.json(result.ops[0])
        }))
    });

    // get films with rating = null
    router.get('/wishlist', (request, response) => {
        collection.find({rating: null})
        .toArray()
        .then((docs) => response.json(docs))
        .catch((err) => {
            console.error(err)
            response.status(500)
            response.json({status: 500, error: err})
        })
    })

    // delete films from wishlist
    router.delete('/wishlist/:id', (request, response) => {
        const id = request.params.id;
        collection
            .deleteOne({ _id: ObjectID(id)})
            .then(result => {
                response.json(result)
            })
            .catch((err) => {
                console.error(err)
                response.status(500)
                response.json({status: 500, error: err})
            }) 
        })


    
    // get films with rating NOT null
    router.get('/rated', (request, response) => {
        collection.find({rating: {$ne: null}})
        .toArray()
        .then((docs) => response.json(docs))
        .catch((err) => {
            console.error(err)
            response.status(500)
            response.json({status: 500, error: err})
        })
    })


    // router.put('/:id', (req, res) => {
    //     data[req.params.id] = req.body;
    //     res.json(data);
    // });

    // router.delete('/:id', (req, res) => {
    //     data.splice(req.params.id, 1);
    //     res.json(data);
    // });

    // router.get('/', (req, res) => {
    //     res.json(data);
    // });

    // router.get('/:id', (req, res) => {
    //     res.json(data[req.params.id]);
    // });

    return router;
};
module.exports = createRouter;