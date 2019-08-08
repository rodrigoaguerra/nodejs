import bodyParser from 'body-parser';
import express from 'express';
import fileLoader from 'app/controllers/';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

fileLoader(app);

app.listen(3047);
