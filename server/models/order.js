var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    custName: {type: String, required: true},
    product: {type: String, required: true},
    orderQty: {type: Number, required: true},
    orderDate: String
});

var ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    qty: {type: Number, required: true}
});

mongoose.model('Order', OrderSchema);
mongoose.model('Product', ProductSchema);
