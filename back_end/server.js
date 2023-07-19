const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json());

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true})
.then((client) => {
    const db = client.db('film_project');
    const filmsCollection = db.collection('films_test');
    const filmsRouter = createRouter(filmsCollection);
    app.use('/api/films', filmsRouter);

})
.catch(console.error);



app.listen(9000, function () {
    console.log(`App running on port ${ this.address().port }`);
});