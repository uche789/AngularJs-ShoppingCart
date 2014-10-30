// JavaScript source code
angular.module('cartService', ['cart'])
    .factory('cartService', ['$http', 'cart', function ($http, cart) {
        var getCart = function () {
            return cart;
        };
        var updateCart = function (productItem, quantity) {
            var data = {
            product: productItem,
            quantity: quantity
            };
            var pos = findProduct(productItem);
            if (pos != -1) {
                var prevPrice = cart.products[pos].quantity * cart.products[pos].product.price;
                cart.total -= prevPrice;
                cart.products[pos].quantity += quantity;
                var newPrice = cart.products[pos].quantity * cart.products[pos].product.price;
                cart.total += newPrice;
            } else {
                var price = productItem.price * quantity;
                cart.total += price;
                cart.products.push(data);
            }
        };
        
        var removeFromCart = function (id) {
            var product = {
                "id": id
            };
            var pos = findProduct(product);
            if (pos != -1) {
                var prevPrice = cart.products[pos].quantity * cart.products[pos].product.price;
                cart.total -= prevPrice;
                cart.products.splice(pos, 1);
            }
        };

        var findProduct = function (product) {
            var i, pos = -1;
            for (i = 0; i < cart.products.length; i++) {
                if (product.id == cart.products[i].product.id) {
                    pos = i;
                    break;
                }
            }
            return pos;
        };

        return {
            updateCart: updateCart,
            getCart: getCart,
            removeFromCart: removeFromCart
        };
    }]);