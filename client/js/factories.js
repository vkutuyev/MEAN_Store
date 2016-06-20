store_app.factory('CustomerFactory', function($http){
    var factory = {};
    var customers = [];

    factory.getCust = function(callback){
        $http.get('/customers').success(function(output) {
            customers = output;
            callback(output);
        })
    }
    factory.addCust = function(customer, callback){
        $http.post('/addCust', customer).success(function(response){
            if(response.substring(0,5) == 'Error'){
                callback('Error: Must enter customer name.');
            }
            else {
                callback('');
                console.log('customer added');
            }
        })
    }
    factory.remCust = function(customer){
        $http.post('/remCust', customer).success(function(){
            console.log('customer removed');
        })
    }

    return factory;
})

store_app.factory('OrderFactory', function($http){
    var factory = {};
    var products = [];
    var orders = [];

    factory.getOrders = function(callback){
        $http.get('/orders').success(function(output){
            orders = output;
            callback(orders);
        })
    }
    factory.addOrder = function(order, callback){
        $http.post('/addOrder', order).success(function(){
            for(var prod of products){
                if(prod.name == order.product){
                    prod.qty -= order.orderQty;
                }
            }
            callback(products);
            console.log('order added');
        })
    }
    factory.remOrder = function(order, callback){
        $http.post('/remOrder', order).success(function(){
            for(var prod of products){
                if(prod.name == order.product){
                    prod.qty += order.orderQty;
                }
            }
            callback(products);
            console.log('order removed');
        })
    }

    factory.getProds = function(callback){
        $http.get('/products').success(function(output){
            products = output;
            callback(products);
        })
    }
    factory.addProd = function(product){
        $http.post('/addProd', product).success(function(){
            console.log('product added');
        })
    }
    factory.remProd = function(product){
        $http.post('/remProd', product).success(function(){
            console.log('product removed');
        })
    }

    return factory;
})
