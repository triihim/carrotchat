/**
 * Routes responsible for maintaining database information via pings.
 */

const router = require('express').Router();

router.get('/user/:username', (req, res) => {
    console.log('Ping from: ' + req.params.username);
    // Check that username exists in db.
    res.end('1');
});

router.get('/chat/:id', (req, res) => {

});

module.exports = router;