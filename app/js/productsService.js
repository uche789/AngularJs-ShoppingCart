// JavaScript source code
angular.module('productsService', [])
    .factory('products', ['$http', function ($http) {
        //CORS issue. Will need a web server or http server
        //var allProducts = $http.get('products.json').success(function (data) {
        //    return data;
        //}).error(function (data, status, headers, config) {
        //    return "failed";
        //});
    var products = [
        {
            "id": 1,
            "name": "Folder",
            "price": 9.99,
            "image" : ""
        },
        {
            "id": 2,
            "name": "Mug",
            "price": 19.99,
            "image" : ""
        },
        {
            "id": 3,
            "name": "Mousepad",
            "price": 8.99,
            "image": ""
        },
        {
            "id": 4,
            "name": "Notepad",
            "price": 1.99,
            "image": ""
        },
        {
            "id": 5,
            "name": "Business card holder",
            "price": 11.89,
            "image": ""
        }
    ];

    return {
        products: products
    };
}]);