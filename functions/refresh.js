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
};

const refreshUsers = () => {
    MongoClient.connect(MONGO_URL, (err, db) => {
        if(err) {
            console.log('Error occurred ' + err);
        } else {
            let dbo = db.db(dbName);
            dbo.collection('users').deleteMany(
                { lastPing: { $lt: new Date().getTime() - threshold } },
            (err, res) => console.log('Removed ' + res.result.n + ' usernames') );
            db.close();
        };
    });
};

const refreshChats = () => {

};