 
  import db from '../source/common/db'
  import User from '../source/common/models/user'



  describe('Test', function() {
      describe('#logerror()', function() {
          it('should print error', function() {
              abcd()

          })
      })
  })

  async function abc() {

      let [err, user] = await User.add({ email: 'abcd@123.com', username: 'abcd', password: '123' })
      if (!err)
          console.log(err)
      else
          console.log(user)
  }

  function abcd() {
      try {
          throw new Error('test error')
      } catch (e) {
          // console.log(e)
      }
  }

