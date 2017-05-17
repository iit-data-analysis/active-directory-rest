import * as express from 'express';
import User from '../models/user';
const logger: any = require('../services/logger');
const  router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        const users = await User.getUsers();
        res.send(users);
    } catch(err) {
        const msg = 'An error happened';
        logger.crit(err.message)
        res.send(msg);
    }
});

module.exports = router;
