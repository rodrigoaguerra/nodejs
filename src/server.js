import express from 'express';
import bodyParser from 'body-parser';
import fileLoader from './app/controllers/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// não é uma regra, mas é ruim utiliza import e require no mesmo arquivo
fileLoader(app);

app.listen(3666);
