/**
 * Routes for utility functionality.
 */

const router = require('express').Router();

router.get('/generateuser', (req, res) => {
    require('../functions/generateUser').generateUsername((result) => {
        if(result === null || result === 'ERROR') {
            res.end('ERROR');
        } else {
            require('../functions/statistics').record(
                require('../functions/statistics').TYPE.TOTAL_GENERATED
            );
            res.end(result.toString());
        }
    }).catch((err) => console.log(err));
});

router.post('/createchat', (req, res) => {
    require('../functions/createchat').createChat(req.body, (result, chatId) => {
        if(result === '1') {
            if(chatId !== null) res.end(chatId.toString());
        } else {
            res.end('0');
        };
    });
});

module.exports = router;