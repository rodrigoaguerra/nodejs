import express from "express";
import bodyParser from "body-parser";

const app =  express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

require('../controllers/authController')(app);
require('../controllers/projectController')(app);

app.listen(5000);