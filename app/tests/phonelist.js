// JavaScript source code

describe('phoneListCrtl', function() {
    beforeEach(module('phoneList'));
    it('it should display current phone number', inject(function($controller) {
        var scope = {},
            crtl = $controller('phoneListCrtl', { $scope: scope });
        expect(scope.CurrentPhoneNumber).toBe('77-88-8889');
    }));
})