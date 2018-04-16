/**
 * Routes responsible for chats.
 */

const validateUser = require('../functions/validation').validateUser;
const router = require('express').Router();
const fetchChatData = require('../functions/fetchChatData').fetchChatData;
const fetchAllChats = require('../functions/fetchChatData').fetchAllChats;
const joinUserToChat = require('../functions/joinUserToChat').joinUserToChat;

module.exports = function(io) {
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
        require('../functions/message').saveMsg(data, (success, savedRecord) => {
            if(success) {
                io.emit('new message', savedRecord);
                res.end('1');
            } else {
                console.log('Message saving failed');
                res.end('0');
            };
        });
    });

    router.get('/join/:chatId/:username', (req, res) => {
        let chatId = req.params.chatId;
        let username = req.params.username;
        joinUserToChat(chatId, username, (success) => {
            if(success) {
                //io.emit('new chatter');
                res.end('1');
            } else {
                console.log('Joining user failed');
                res.end('0');
            };
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
    return router;
};
//module.exports = router;