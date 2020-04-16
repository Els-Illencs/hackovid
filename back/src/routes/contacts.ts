import express from 'express';
import { ContactRepository } from '../lib/category/ContactRepository';

const contactRepository = new ContactRepository();

const router = express.Router();


router.post('/', async function (req, res, next) {
    const contact = req.body;

    res.send(await contactRepository.create(contact));
});

export default router;