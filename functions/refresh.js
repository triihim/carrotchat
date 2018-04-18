/*
 * Functionality to maintain db and backend state.
 */

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = require('../config').MONGO_URL;
const dbName = require('../config').db;
const threshold = require('../config').threshold;

// Removes inactive usernames and chats from db.
module.exports.refresh = () => {
    refreshUsers();
    refreshChats();
};

const refreshUsers = () => {
    MongoClient.connect(MONGO_URL, (err, db) => {
        if(err) {
            console.log('Error occurred ' + err);
        } else {
            let dbo = db.db(dbName);
            dbo.collection('users').deleteMany(
                { lastPing: { $lt: new Date().getTime() - threshold } }
            );
            db.close();
        };
    });
};

const refreshChats = () => {

    MongoClient.connect(MONGO_URL, (err, db) => {
        if(err) {
            console.error('DB connection failed: ' + err);
        } else {
            let dbo = db.db(dbName);

            // Remove empty chats.
            dbo.collection('chats').remove(
                { chatters: { $size: 0 }, toBeDeleted: 1 }
            );

            // Flag chat to be removed next time around.
            dbo.collection('chats').updateMany(
                { chatters: { $size: 1 } },
                { $set: { toBeDeleted: 1 } },
            );

            // Remove remove flag if chatters exist.
            dbo.collection('chats').updateMany(
                { 'chatters.0': { $exists: 1 } },
                { $set: { toBeDeleted: 0 } }
            );

            // Remove inactive users from chat.
            const threshold = require('../config').threshold;
            dbo.collection('chats').deleteMany(
                { 'chatters.lastPing': { $lt: (new Date().getTime() - threshold) }}
            );

            
        }
    });
};