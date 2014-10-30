// JavaScript source code
//http://angular-tips.com/blog/2014/06/introduction-to-unit-test-controllers/
describe('Test all controllers in shopcart', function () {
    var cartService; var products; var scope;

    // mock the cart service & productService
    beforeEach(function () {
        //mock for cartservice
        var mockCartService = {};
        module('shopCart', function ($provide) {
            $provide.value('cartService', mockCartService);
        });


        inject(function () {

            /*
                CART SERVICE
            */

            mockCartService.cart = {
                products: [],
                total: 37.97,
            };

            var data = {
                product: {
                    "id": 2,
                    "name": "Mugs",
                    "price": 19.99,
                    "image": "",
                },
                quantity: 1
            };
            var data1 = {
                product: {
                    "id": 3,
                    "name": "Mousepad",
                    "price": 8.99,
                    "image": "",
                },
                quantity: 2
            };

            mockCartService.cart.products.push(data);
            mockCartService.cart.products.push(data1);

            mockCartService.getCart = function () {
                return this.cart;
            };

            mockCartService.updateCart = function (product, quantity) {
                var pos = this.findProduct(product);
                if (pos != -1) {
                    var prevPrice = this.cart.products[pos].quantity * this.cart.products[pos].product.price;
                    this.cart.total -= prevPrice;
                    this.cart.products[pos].quantity += quantity;
                    var newPrice = this.cart.products[pos].quantity * this.cart.products[pos].product.price;
                    this.cart.total += prevPrice;
                } else {
                    var price = product.price * quantity;
                    this.cart.total += price;
                    this.cart.products.push(product);
                }
            };

            mockCartService.removeFromCart = function (id) {
                var product = {
                    "id": id
                };
                var pos = this.findProduct(product);
                if (pos != -1) {
                    var prevPrice = this.cart.products[pos].quantity * this.cart.products[pos].product.price;
                    this.cart.total -= prevPrice;
                    this.cart.products.splice(pos, 1);
                }
            };

            mockCartService.findProduct = function (product) {
                var i, pos = -1;
                for (i = 0; i < this.cart.products.length; i++) {
                    if (product.id == this.cart.products[i].product.id) {
                        pos = i;
                        break;
                    }
                }
                return pos;
            };
        });
    });

    //load and set up dependencies
    beforeEach(inject(function ($controller, $rootScope, _cartService_, _products_) {
        scope = $rootScope.$new();
        cartService = _cartService_;
        products = _products_;
        $controller('displayCartController', { $scope: scope, cartService: cartService });
        scope.$digest();
    }));

    it('it should display the two item in cart', function () {
        scope.displayCart();
        expect(scope.cart).toEqual({
            products: [
            {
                product: {
                    "id": 2,
                    "name": "Mugs",
                    "price": 19.99,
                    "image": "",
                },
                quantity: 1,
            },
            {
                product: {
                    "id": 3,
                    "name": "Mousepad",
                    "price": 8.99,
                    "image": "",
                },
                quantity: 2
            }],
            total: 37.97,
        });
    });

    it('should remove item from cart', function () {
        var length = cartService.getCart().products.length;
        scope.removeFromCart(2);
        expect(length).toNotEqual(cartService.getCart().products.length);
    });
    
});