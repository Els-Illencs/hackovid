import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import home from './routes/home';
import categories from './routes/categories';
import products from './routes/products';
import packages from './routes/packages';

const app = express();

app.use(logger('common'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', home);
app.use('/categories', categories);
app.use('/products', products);
app.use('/packages', packages);

export default app;