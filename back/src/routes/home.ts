import express from 'express';

const router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Nothing to see here');
})

export default router;