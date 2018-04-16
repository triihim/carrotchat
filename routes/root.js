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
    res.render('lobby', {
        title: 'Lobby'
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});

router.get('/statistics', (req, res) => {
    require('../functions/statistics').fetchStatistics((result) => {
        res.render('statistics', {
            title: 'Statistics',
            usersGenerated: result.usernamesGenerated
        });
    });
});


module.exports = router;