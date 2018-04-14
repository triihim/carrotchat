/**
 * Root / main routes.
 */

const router = require('express').Router();

router.get(['/', '/entrance'], (req, res) => {
    res.render('entrance', {
        title: 'Entrance'
    });
});

router.get('/lobby', (req, res) => {
    res.end('LOBBY')
});

router.get('/about', (req, res) => {
    res.end('ABOUT');
});

router.get('/statistics', (req, res) => {
    res.end('STATISTICS');
});


module.exports = router;