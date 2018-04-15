/**
 * Routes responsible for chats.
 */

const validateUser = require('../functions/validation').validateUser;
const router = require('express').Router();
const fetchChatData = require('../functions/fetchChatData').fetchChatData;
const fetchAllChats = require('../functions/fetchChatData').fetchAllChats;

router.get('/:chatId/:username', (req, res) => {
    let chatId = req.params.chatId;
    let username = req.params.username;
    validateUser(username, (success) => {
        if(success) {
            res.render('chat', {
                title: 'Chat',
                id: chatId
            });
        } else {
            res.redirect('/');
        }
    });
});

router.get('/fetch', (req, res) => {
    fetchAllChats((chats) => {
        res.end(JSON.stringify(chats));
    });
});

router.get('/fetch/:chatId/:username', (req, res) => {
    let chatId = req.params.chatId;
    let username = req.params.username;
    validateUser(username, (success) => {
        if(success) {
            fetchChatData(chatId, (chatData) => {
                res.end(JSON.stringify(chatData));
            });
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;