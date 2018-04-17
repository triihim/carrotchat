/**
 * Routes for utility functionality.
 */
const record = require('../functions/statistics').record;
const TYPE = require('../functions/statistics').TYPE;

const router = require('express').Router();

router.get('/generateuser', (req, res) => {
    require('../functions/generateUser').generateUsername((result) => {
        if(result === null || result === 'ERROR') {
            res.end('ERROR');
        } else {
            record(TYPE.TOTAL_USERS_GENERATED);
            res.end(result.toString());
        }
    }).catch((err) => console.log(err));
});

router.post('/createchat', (req, res) => {
    require('../functions/createchat').createChat(req.body, (result, chatId) => {
        if(result === '1') {
            if(chatId !== null) {
                record(TYPE.TOTAL_CHATS_GENERATED);
                res.end(chatId.toString())
            };

        } else {
            res.end('0');
        };
    });
});

module.exports = router;