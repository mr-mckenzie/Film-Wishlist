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

    // get all films (wishlist and rated)
    router.get('/', (request, response) => {
        collection.find()
        .toArray()
        .then((docs) => response.json(docs))
        .catch((err) => {
            console.error(err)
            response.status(404)
            response.json({status: 404, error: err})
        })
    })

    // get film by film id
    router.get('/single/:film_id', (request, response) => {
        const film_id = Number(request.params.film_id)
        collection
            .findOne({ id: film_id })
            .then(result => {
                response.json(result)
            })
            .catch((err) => {
                console.error(err)
                response.status(404)
                response.json({ status: 404, error: err })
            })
    })

    // delete film by film id
    router.delete('/single/:film_id', (request, response) => {
        const film_id = Number(request.params.film_id)
        collection.deleteOne({ id : film_id })
        .then(result => response.json(result))
        .catch((err) => {
            console.error(err)
            response.status(500)
            response.json({status: 500, error: err})
        })
    })

    // update film by film id
    router.put('/single/:film_id', (req, res) => {
        const film_id = Number(req.params.film_id)
        const updatedData = req.body
        delete updatedData._id
        collection
            .updateOne({ id: film_id }, { $set: updatedData })
            .then(result => {
                res.json(result)
            })
            .catch((err) => {
                console.error(err)
                res.status(500)
                res.json({ status: 500, error: err })
            })
    })

    // get all films with rating = null (i.e. wishlist films)
    router.get('/wishlist', (request, response) => {
        collection.find({rating: null})
        .toArray()
        .then((docs) => response.json(docs))
        .catch((err) => {
            console.error(err)
            response.status(404)
            response.json({status: 404, error: err})
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
            response.status(404)
            response.json({status: 404, error: err})
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

    return router;
};
module.exports = createRouter;