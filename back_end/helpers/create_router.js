const express = require('express');
const Collection = require('mongodb/lib/collection');
const ObjectID = require('mongodb').ObjectID

const createRouter = function (collection) {
    
    const router = express.Router();

    // post new record to database
    router.post('/', (request, response) => {
        const newData = request.body
        collection
        .insertOne(newData)
        .then((result => {
            response.json(result.ops[0])
        }))
    });

    // get all films with rating = null (i.e. wishlist films)
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

    // delete film from wishlist by MongoDB id
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

    // get films with rating NOT null (i.e. rated films)
    router.get('/rating', (request, response) => {
        collection.find({rating: {$ne: null}})
        .toArray()
        .then((docs) => response.json(docs))
        .catch((err) => {
            console.error(err)
            response.status(500)
            response.json({status: 500, error: err})
        })
    })

    // delete films from ratedFilms by MongoDB id
    router.delete('/rating/:id', (request, response) => {
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


    // get film by film id
    router.get('/film_id/:id', (request, response) => {
        const id = Number(request.params.id)
        collection
            .findOne({ id: id })
            .then(result => {
                response.json(result)
            })
            .catch((err) => {
                console.error(err)
                response.status(404)
                response.json({ status: 404, error: err })
            })
    })

    // update film by MongoDB id
    router.put('/:id', (req, res) => {
        const id = req.params.id
        const updatedData = req.body
        delete updatedData._id
        collection
            .updateOne({ _id: ObjectID(id) }, { $set: updatedData })
            .then(result => {
                res.json(result)
            })
            .catch((err) => {
                res.status(500)
                res.json({ status: 500, error: err })
            })
    })

    return router;
};
module.exports = createRouter;