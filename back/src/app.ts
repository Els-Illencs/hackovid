import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';

import home from './routes/home';
import categories from './routes/categories';
import products from './routes/products';
import packages from './routes/packages';
import orders from './routes/orders';
import users from './routes/users';
import contacts from './routes/contacts';

const app = express();

app.use(logger('common'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());

app.use('/', home);
app.use('/categories', categories);
app.use('/products', products);
app.use('/packages', packages);
app.use('/orders', orders);
app.use('/users', users);
app.use('/contacts', contacts);

export default app;