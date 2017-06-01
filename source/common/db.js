import mongoose from 'mongoose'
import config from '../config'
import debug from 'debug'

const dbDebug = debug('h5:db')
mongoose.connect(config.url, { server: { reconnectTries: Number.MAX_VALUE } })
mongoose.Promise = global.Promise


const db = mongoose.connection

db.once('open', () => {
    dbDebug('db opened')
})

db.on('error', function(error) {
    dbDebug('db connection error : ' + error);
    mongoose.disconnect();
});

db.on('close', function() {
    dbDebug('db closed,retry...');
    mongoose.connect(config.url, { server: { reconnectTries: Number.MAX_VALUE } });
});

export default db
