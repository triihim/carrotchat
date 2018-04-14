/*
 * Routes for utility functionality.
 */

const router = require('express').Router();

router.get('/generateuser', (req, res) => {
    require('../functions/generateUser').generateUsername((result) => {
        if(result === null || result === 'ERROR') {
            res.end('ERROR');
        } else {
            console.log(result);
            res.end(result.toString());
        }
    }).catch((err) => console.log(err));
});

router.post('/createchat', (req, res) => {

});

module.exports = router;