/**
 * Routes responsible for chats.
 */

const validateUser = require('../functions/validation').validateUser;
const router = require('express').Router();
const fetchChatData = require('../functions/fetchChatData').fetchChatData;
const fetchAllChats = require('../functions/fetchChatData').fetchAllChats;
const joinUserToChat = require('../functions/joinUserToChat').joinUserToChat;

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

router.post('/msg', (req, res) => {
    let data = req.body;
    require('../functions/message').saveMsg(data, (success) => {
        (success) ? res.end('Message saved') : res.end('Message saving failed');
    })
});

router.get('/join/:chatId/:username', (req, res) => {
    let chatId = req.params.chatId;
    let username = req.params.username;
    joinUserToChat(chatId, username, (success) => {
        (success) ? res.end('1') : res.end('0');
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