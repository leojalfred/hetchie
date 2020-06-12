import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { mongoURI as db } from './config/keys';

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));
const port = 3001;
app.listen(port, () => console.log(`Server up and running on port ${port}!`));
