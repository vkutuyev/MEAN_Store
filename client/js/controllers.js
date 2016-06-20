var store_app = angular.module('store_app', ['ngRoute', 'ngAnimate']);

store_app.config(function ($routeProvider) {
    $routeProvider
        .when('/',{
            templateUrl: 'partials/dash.html'
        })
        .when('/customers',{
            templateUrl: 'partials/customers.html'
        })
        .when('/orders',{
            templateUrl: 'partials/orders.html'
        })
        .when('/products',{
            templateUrl: 'partials/products.html'
        })
        .when('/dashboard',{
            templateUrl: 'partials/dash.html'
        })
});


store_app.controller('CustomersController', function($scope, $routeParams, CustomerFactory) {

    CustomerFactory.getCust(function(data){
        $scope.customers = data;
    })

    $scope.addCust = function() {
        if($scope.newCustomer){
            var now = moment().format('MMMM Do, YYYY');
            $scope.newCustomer.createdAt = now;
        }
        CustomerFactory.addCust($scope.newCustomer, function(data){
            $scope.error = data;
        })

        CustomerFactory.getCust(function(data){
            $scope.customers = data;
        })
        $scope.newCustomer = '';
    }
    $scope.remCust = function(customer) {
        CustomerFactory.remCust(customer);

        CustomerFactory.getCust(function(data){
            $scope.customers = data;
        })
    }

})

store_app.controller('OrdersController', function($scope, CustomerFactory, OrderFactory) {

    CustomerFactory.getCust(function(data){
        $scope.customers = data;
    })
    OrderFactory.getProds(function(data){
        $scope.products = data;
    })
    OrderFactory.getOrders(function(data){
        $scope.orders = data;
    })

    $scope.addOrder = function() {
        if($scope.newOrder.orderQty){
            var now = moment().format('MMMM Do, YYYY');
            $scope.newOrder.orderDate = now;
            $scope.newOrder.custName = $scope.newOrder.custName.name;
            $scope.newOrder.product = $scope.newOrder.product.name;
            OrderFactory.addOrder($scope.newOrder, function(prods){
                $scope.products = prods;
            });
            OrderFactory.getOrders(function(data){
                $scope.orders = data;
            });
            $scope.error = '';
        }
        else {
            $scope.error = 'Error: Ordered too many products.'
        }
        $scope.newOrder = {};
    }
    $scope.remOrder = function(order) {
        OrderFactory.remOrder(order, function(prods){
            $scope.products = prods;
        });
        OrderFactory.getOrders(function(data){
            $scope.orders = data;
        })
        $scope.newOrder = {};
    }

    $scope.addProd = function() {
        OrderFactory.addProd($scope.newProduct);
        OrderFactory.getProds(function(data){
            $scope.products = data;
        })
        $scope.newProduct = {};
    }
    $scope.remProd = function(product) {
        OrderFactory.remProd(product);
        OrderFactory.getProds(function(data){
            $scope.products = data;
        })
    }

})
