const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.json({ message: "server is running" });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express app listening on port: ${port}`);
});