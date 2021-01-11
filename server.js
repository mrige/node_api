const express = require("express");
const uuid = require("uuid");
const pool = require('./db/dev/pool');
const user_route = require('./routes/users');
const closet_route = require('./routes/closets');
const cloth_route = require('./routes/cloths');


const app = express();

const port = 3000;

app.use(express.json());

app.use('/api', user_route );
app.use('/api', closet_route);
app.use('/api', cloth_route);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
