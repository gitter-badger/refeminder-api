var mongoose = require('../database/mongoose')
,   UserSchema = new mongoose.Schema(require('../schemas/user'))
,   UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;