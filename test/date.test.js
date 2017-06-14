import moment from 'moment'
import dtime from 'time-formater'

import db from '../source/common/db'
import User from '../source/common/models/user'

User.search({ createdAt: { $gte: moment().add(-2,'days').format('l') } }).then((users) => console.log(users))



console.log(dtime())
console.log(dtime().format('YYYY-MM-DD HH:mm:ss'))
console.log(moment())
console.log(moment().add(-1,'days').format('YYYY-MM-DD h:mm:ss'))
console.log(moment('2015-08-15T03:26:36.086Z'))
console.log(new Date())
console.log(typeof  moment().add(-2,'days').format('l') )