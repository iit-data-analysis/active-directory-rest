import * as express from 'express';
import User from '../models/user';
const logger: any = require('../services/logger');
const  router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        const filters = Object.entries(req.query).map(([k, v]) => ({k: k, v: v}));
        const users = await User.getUsers(filters);
        res.send(users);
    } catch(err) {
        logger.crit(err.message)
        res.send({
            error: true,
            msg: err.message,
            stack: err.stack
        });
    }
});

module.exports = router;
