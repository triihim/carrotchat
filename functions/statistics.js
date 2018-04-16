/*
 * Funcitonality for maintaining site statistics. 
 */

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = require('../config').MONGO_URL;
const dbName = require('../config').db;

const addToTotalGenerated = () => {
    MongoClient.connect(MONGO_URL, (err, db) => {
        if(err) {
            console.log('Error on statistics connection ' + err);
        } else {
            let dbo = db.db(dbName);
            dbo.collection('statistics').update({},
                { $inc: { usernamesGenerated: 1 } }
            );
            db.close();
        };
    });
};

module.exports.fetchStatistics = (callback) => {
    MongoClient.connect(MONGO_URL, (err, db) => {
        if(err) {
            console.log('Error on statistics connection ' + err);
        } else {
            let dbo = db.db(dbName);
            dbo.collection('statistics')
            .find()
            .toArray((err, result) => callback(result[0]));
            db.close();
        };
    });
};

const TYPE = {
    TOTAL_GENERATED: 'TOTAL_GENERATED'
};

module.exports.TYPE = TYPE;

module.exports.record = function(type) {

    switch(type) {

        case TYPE.TOTAL_GENERATED:
            addToTotalGenerated();
            break;

    };

};
