var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');

module.exports = (function() {
    return {

        getOrders: function(req, res) {
            Order.find({}, function(err, orders){
                if(err){
                    console.log('error in server controller: orders.js getOrders');
                }
                else {
                    res.json(orders);
                }
            })
        },

        addOrder: function(req, res) {
            var order = new Order(req.body);
            order.save(function(err){
                if(err){
                    console.log('error in server controller: orders.js addOrder');
                }
                else {
                    Product.findOne({name: req.body.product}, function(fErr, product){
                        if(fErr){
                            console.log('error in server controller: orders.js addOrder Product.findOne');
                        }
                        else {
                            product.qty -= req.body.orderQty;
                            product.save();
                            res.redirect('/')
                        }
                    })
                }
            })
        },

        remOrder: function(req, res) {
            Order.remove({_id: req.body._id}, function(err){
                if(err){
                    console.log('error in server controllers: orders.js remOrder');
                }
                else {
                    Product.findOne({name: req.body.product}, function(fErr, product){
                        if(fErr){
                            console.log('error in server controller: orders.js remOrder Product.findOne');
                        }
                        else {
                            product.qty += req.body.orderQty;
                            product.save();
                            res.redirect('/')
                        }
                    })
                }
            })
        },


        getProds: function(req, res) {
            Product.find({}, function(err, products){
                if(err){
                    console.log('error in server controllers: orders.js getProds');
                }
                else {
                    res.json(products);
                }
            })
        },

        addProd: function(req, res) {
            var prod = new Product({ name: req.body.name, qty: req.body.qty });
            prod.save(function(err){
                if(err){
                    console.log('error in server controllers: orders.js addProd');
                }
                else {
                    res.redirect('/');
                }
            })
        },

        remProd: function(req, res) {
            Product.remove({_id: req.body._id}, function(err){
                if(err){
                    console.log('error in server controllers: orders.js remProd');
                }
                else {
                    res.redirect('/');
                }
            })
        }

    }
})
();
