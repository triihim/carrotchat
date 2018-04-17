const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = require('../config').MONGO_URL;
const dbName = require('../config').db;
const ObjectId = require('mongodb').ObjectId;

module.exports.joinUserToChat = (chatId, username, callback) => {
    MongoClient.connect(MONGO_URL, (err, db) => {
        if(err) {
            console.error('DB connection failed ' + err);
        } else {
            let dbo = db.db(dbName);
            let chatterRecord = { username: username, lastPing: new Date().getTime() }; 
            
            // Delete record of user if already exists. Prevents duplicates on page refresh.
            dbo.collection('chats').update(
                { _id: ObjectId(chatId)},
                { $pull: { chatters: { username: username } } }
            );

            // Add user to chatters.
            dbo.collection('chats').update(
                { _id: ObjectId(chatId) },
                { 
                    $addToSet: { chatters: chatterRecord },
                },
                (err, result) => {
                    if(err === null) callback(true);
                }
            );
                
            db.close();
        }
    });
};