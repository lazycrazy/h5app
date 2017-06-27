import mongoose from 'mongoose'
import config from '../config'
import debug from 'debug'

const dbDebug = debug('h5:db')
mongoose.connect(config.url, { server: { reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000 } })
mongoose.Promise = global.Promise
mongoose.set('debug', true)

const db = mongoose.connection

db.once('open', () => {
    dbDebug('db opened')
})

db.on('error', function(error) {
    dbDebug('db connection error : ' + error);
    mongoose.disconnect();
    mongoose.connect(config.url, { server: { reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000 } });
});

db.on('close', function() {
    dbDebug('db closed,retry...');
    mongoose.connect(config.url, { server: { reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000 } });
});

export default db
