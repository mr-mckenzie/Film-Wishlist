const express = require('express');
const app = express();
const cors = require('cors');

const createRouter = require('./helpers/create_router.js');

app.use(express.json());
app.use(cors());
const filmsRouter = createRouter(films);
app.use('/api/films', filmsRouter);

app.listen(9000, function () {
    console.log(`App running on port ${ this.address().port }`);
});