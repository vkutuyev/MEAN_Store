var customers = require('./../controllers/customers.js');
var orders = require('./../controllers/orders.js');

module.exports = function(app) {
    app.get('/customers', function(req, res){
        customers.getCust(req, res);
    })
    app.post('/addCust', function(req, res){
        customers.addCust(req, res);
    })
    app.post('/remCust', function(req, res){
        customers.remCust(req, res);
    })

    app.get('/orders', function(req, res){
        orders.getOrders(req, res);
    })
    app.post('/addOrder', function(req, res){
        orders.addOrder(req, res);
    })
    app.post('/remOrder', function(req, res){
        orders.remOrder(req, res);
    })

    app.get('/products', function(req, res){
        orders.getProds(req, res);
    })
    app.post('/addProd', function(req, res){
        orders.addProd(req, res);
    })
    app.post('/remProd', function(req, res){
        orders.remProd(req, res);
    })
}
