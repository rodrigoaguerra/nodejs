import express from 'express';
import bodyParser from 'body-parser';
import fileLoader from './app/controllers/authRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

fileLoader(app);

app.listen(3045);
