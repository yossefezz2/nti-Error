const mongoose = require('mongoose');
mongoose.connect(process.env.dbUrl)

module.exports =mongoose