/*
 * Ping maintenance funtionality. 
 */

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = require('../config').MONGO_URL;
const dbName = require('../config').db;

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
    // Check that user still exists.
        // TRUE update ping value
        // FALSE pass false to callback
};

const chatPingValidation = (username, chat, callback) => {
    // Check that chat still exists.
        // TRUE update users ping values in chat
        // FALSE remove left users from the chat.
};
