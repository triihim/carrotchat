/**
 * Catch all stuff.
 */

const router = require('express').Router();

router.get('/*', (req, res) => {
    res.end('Page not found. Check the URL.');
});

module.exports = router;