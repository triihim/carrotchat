const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = require('../config').MONGO_URL;
const dbName = require('../config').db;
const ObjectId = require('mongodb').ObjectId;

module.exports.fetchChatData = (chatId, callback) => {
    MongoClient.connect(MONGO_URL, (err, db) => {
        if(err) {
            console.log('Error occurred ' + error);
        } else {
            let dbo = db.db(dbName);

            dbo.collection('chats').find({ _id: ObjectId(chatId) }, {})
            .toArray((err, result) => {
                if(err) {
                    console.log('Error fetching chat data');
                } else {
                    callback(result[0])
                }
            });

            db.close();
        };
    })
};