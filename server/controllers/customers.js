var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports = (function() {
    return {

        getCust: function(req, res) {
            Customer.find({}, function(err, customers){
                if(err){
                    console.log('error in server controller: customers.js getCust');
                }
                else{
                    res.json(customers);
                }
            })
        },

        addCust: function(req, res) {
            var customer = new Customer(req.body);
            customer.save(function(err){
                if(err){
                    console.log('error in server controller: customers.js addCust');
                    res.send('Error');
                }
                else {
                    res.redirect('/');
                }
            })
        },

        remCust: function(req, res) {
            Customer.remove({_id: req.body._id}, function(err){
                if(err){
                    console.log('error in server controller: customers.js remCust');
                }
                else {
                    res.redirect('/');
                }
            })
        }

    }
})
();
