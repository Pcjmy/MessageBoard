// 连接mongodb数据库服务

const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017'
const dbName = 'comment'

// 开始连接
mongoose.connect(`${url}/${dbName}`)
  .then(() => console.log('Connected!'))

module.exports = mongoose
