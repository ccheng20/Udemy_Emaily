const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    name: String
});

//create a model class
mongoose.model('users', userSchema);