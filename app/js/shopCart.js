var shopCart = angular.module('shopCart', ['productsService', 'cartService']);

shopCart.controller('shopController', ['$scope', 'products', 'cartService', function ($scope, products, cartService) {
    $scope.allProducts = products.products;

    $scope.addToCart = function () {
        cartService.updateCart($scope.productItem, $scope.quantity);
        $scope.quantity = 1;
        alert($scope.productItem.name + " added to cart.");
    };
}]);

shopCart.controller('displayCartController', ['$scope', 'cartService', function ($scope, cartService) {
    $scope.displayCart = function() {
        $scope.cart = cartService.getCart();
    };

    $scope.removeFromCart = function(id) {
        cartService.removeFromCart(id);
        $scope.displayCart();
    };
}]);