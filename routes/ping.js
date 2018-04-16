/**
 * Routes responsible for maintaining database information via pings.
 */

const router = require('express').Router();

router.get('/user/:username', (req, res) => {
    require('../functions/pings')
    .userPingValidation(req.params.username, (success) => {
        (success) ? res.end('1') : res.end('0');
    });
});

router.get('/chat/:id/:username', (req, res) => {
    require('../functions/pings')
    .chatPingValidation(req.params.id, req.params.username, (success) => {
        (success) ? res.end('1') : res.end('0');
    });
});

module.exports = router;