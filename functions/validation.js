const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = require('../config').MONGO_URL;
const dbName = require('../config').db;

module.exports.validateUser = (username, callback) => {
    MongoClient.connect(MONGO_URL, (err, db) => {
        if(err) {
            console.log('Error occurred ' + err);
        } else {
            let dbo = db.db(dbName);
            dbo.collection('users').find(
                { username: username }
            ).limit(1).toArray((err, result) => {
                if(result.length > 0) {
                    callback(true);
                } else {
                    callback(false);
                }
            });
        };
    });
};
