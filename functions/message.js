/*
 * Message handling functionality. 
 */

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = require('../config').MONGO_URL;
const dbName = require('../config').db;
const ObjectId = require('mongodb').ObjectId;


module.exports.saveMsg = (data, callback) => {
    MongoClient.connect(MONGO_URL, (err, db) => {
        if(err) {
            console.log('Error occurred ' + err);
        } else {
            let dbo = db.db(dbName);

            let msgRecord = {
                sender: data.sender,
                sendDate: new Date().toGMTString(),
                message: data.msg
            };

            dbo.collection('chats').update(
                { _id: ObjectId(data.chatId) },
                { $push: { messages: msgRecord } },
                (err, result) => {
                    if(err) {
                        console.log('Chat saving error: ' + err);
                        callback(false);
                    } else {
                        callback(true);
                    }
                }
            );
            db.close();
        };
    });
};

// { 
//     chatId: '5ad4ab0674943c2ff8da6be0',
//     sender: 'angry-apple90',
//     msg: 'moro' 
// }