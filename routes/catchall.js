/**
 * Catch all stuff.
 */

const router = require('express').Router();

router.get('/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        message: 'Page not found'
    })
});

module.exports = router;