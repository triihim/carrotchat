/*
 * Routes responsible for maintaining database information via pings.
 */

const router = require('express').Router();

router.get('/user:id', (req, res) => {
    res.send('pinged');
});

router.get('/chat:id', (req, res) => {

});

module.exports = router;