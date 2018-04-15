/*
 * Chat creation and validation functionality.
 */

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = require('../config').MONGO_URL;
const dbName = require('../config').db;

module.exports.createChat = (data, callback) => {
    let topic = data.topic;
    let creator = data.creator;

    MongoClient.connect(MONGO_URL, (err, db) => {
        if(err) {
            console.log('Error occurred ' + err);
            callback('0');
        } else {
            let dbo = db.db(dbName);
            dbo.collection('chats').insert(
                {
                    topic: topic,
                    creationDate: new Date().toGMTString(),
                    chatters: [],
                    messages: []
                },
                (err, result) => {
                    if(err) {
                        callback('0');
                    } else {
                        callback('1', result['ops'][0]['_id']);
                    };
                }
            );
        }
        db.close();
    })
};