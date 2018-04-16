const dbuser = process.env.DBUSER
const dbpw = process.env.DBPW
const db = process.env.DB
module.exports.MONGO_URL = `mongodb://${dbuser}:${dbpw}@ds143388.mlab.com:43388/${db}`;
module.exports.db = db;

// Interval of db checking for outdated chats or usernames.
module.exports.refreshInterval = 5000; // ms

/* Threshold for outdated db record. 
 * Usernames and chats with last pings older
 * than this are removed. */
module.exports.threshold = 10000; // ms