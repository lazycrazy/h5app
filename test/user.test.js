
 import db from '../source/common/db'
 import User from '../source/common/models/user'
 import { expect } from 'chai'



 describe('User', function() {
     this.timeout(6000)
     describe('#add()', function() {
         it('should add new user to db', async function() {
             let [err, user] = await User.add({ email: 'abcde@123.com', username: 'abcd', password: '123',mobile:'abcde' })
                 // expect(user).to.be.undefined              
             expect(err).to.have.a.property('code').that.equal(11000)

         })
     })
 })
