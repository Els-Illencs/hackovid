import express from 'express';

const router = express.Router();

router.get('/', function(req, res, next) {
    res.send([
        {
            name: 'Ignasi Coll',
            company: 'Hotellinking'
        },
        {
            name: 'Xavier Coll',
            company: 'FDSA Desarrollo'
        }, 
        {
            name: 'Joan Rechach',
            company: 'Trivago'
        },
        {
            name: 'Llorenç Seguí',
            company: 'Hotelbeds'
        }
    ]);
})

export default router;