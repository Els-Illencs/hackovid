import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import home from './routes/home';
import users from './routes/users';

const app = express();

app.use(logger('common'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', home);
app.use('/users', users);

export default app;