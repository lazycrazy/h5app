  import db from '../source/common/db'
  import Abc from '../source/common/models/abc'



Abc.add({id:1234,password:'1234'}).then((err,abc)=>console.log(err,abc))