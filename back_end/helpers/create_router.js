const express = require('express');
const Collection = require('mongodb/lib/collection');
const createRouter = function (collection) {
    const router = express.Router();
    router.get('/', (req, res) => {
        res.json(data);
    });
    router.get('/:id', (req, res) => {
        res.json(data[req.params.id]);
    });
    
    // post to database base url
    router.post('/', (request, response) => {
        const newData = request.body
        collection
        .insertOne(newData)
        .then((result => {
            response.json(result.ops[0])
        }))

    });




    router.put('/:id', (req, res) => {
        data[req.params.id] = req.body;
        res.json(data);
    });
    router.delete('/:id', (req, res) => {
        data.splice(req.params.id, 1);
        res.json(data);
    });
    return router;
};
module.exports = createRouter;