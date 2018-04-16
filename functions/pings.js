/*
 * Ping maintenance funtionality. 
 */

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = require('../config').MONGO_URL;
const dbName = require('../config').db;
const ObjectId = require('mongodb').ObjectId;

module.exports.userPingValidation = (username, callback) => {
    MongoClient.connect(MONGO_URL, (err, db) => {
        if(err) {
            console.log('Error occurred ' + err);
        } else {
            let dbo = db.db(dbName);
            dbo.collection('users').update(
                { username: username },
                { $set: { lastPing: new Date().getTime() } },
                (err, res) => {
                    if(res.result.nModified > 0) {
                        callback(true)
                    } else {
                        callback(false)
                    };
                }
            );
        };
        db.close();
    });
};

module.exports.chatPingValidation = (chatId, username, callback) => {
    let data = { username: username, lastPing: new Date().getTime() };
    MongoClient.connect(MONGO_URL, (err, db) => {
        if(err) {
            console.log('Error occurred: ' + err);
        } else {
            console.log('Chat ping by: ' + username);
            let dbo = db.db(dbName);
            
            dbo.collection('chats').update(
                { 
                    _id: ObjectId(chatId),
                    'chatters.username': username
                },
                { 
                    $set: { 'chatters.$.lastPing': new Date().getTime() } 
                },
                (err, result) => {
                    if(err) {
                        console.log('Ping error occurred: ' + err);
                        callback(false);
                    } else {
                        if(result.result.nModified > 0) {
                            callback(true);
                        } else {
                            callback(false);
                        }
                    };
                }
            );
            db.close();
        };
    });
};
