var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    createdAt: String
});

mongoose.model('Customer', CustomerSchema);
