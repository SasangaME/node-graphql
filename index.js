import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.json({ message: "server is running" });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express app listening on port: ${port}`);
});