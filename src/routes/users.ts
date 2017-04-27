import * as express from 'express';
import User from '../models/user';
const  router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        const users = await User.getUsers();
        res.send(users);
    } catch(err) {
        res.send(err.message);
    }
});

module.exports = router;
