/*
 * Utilities for generating random and unique username.
 */

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = require('../config').MONGO_URL;

const randomUsername = () => {
    let number = Math.floor(Math.random()*101);
    let adjectives = ["sexy","clumsy","grumpy","helpful","famous","fancy","handsome","clean","angry","adorable"];
    let vegetables = ["satsuma","carrot","ginger","fig","fennel","lemon","melon","cherry","apple","avocado", "hillosipuli"];

    let randAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    vegetables = vegetables.filter(word => word[0] === randAdjective[0]);
    
    let randVegetables = vegetables[Math.floor(Math.random() * vegetables.length)];

    return randAdjective + "-" + randVegetables + number;
};

const isUniqueUsername = (username) => {
    return new Promise(resolve => {
        MongoClient.connect(MONGO_URL, (err, db) => {
            if(err) {
                console.log('Error occurred ' + err);
            } else {
                let dbo = db.db('carrot');
                dbo.collection('users').find({ username: username }).limit(1).toArray((err, result)=>{
                    if(err) {
                        console.log('Error occurred ' + err);
                        resolve(null);
                    } else if(result.length === 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
                db.close();
            };
        });
    });
};

module.exports.generateUsername = async (callback) => {
    let username = randomUsername();
    let unique = await isUniqueUsername(username).catch((err) => console.log(err));
    if(unique === false) {
        this.generateUsername(callback);
    } else {
        callback(username);
    }
};






    