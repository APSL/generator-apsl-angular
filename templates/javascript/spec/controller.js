'use strict';

describe('Controller: <%= classedName %>Ctrl', function () {

  // load the controller's module
  beforeEach(module('<%= scriptAppName %>'));

  var <%= classedName %>Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    <%= classedName %>Ctrl = $controller('<%= classedName %>Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a title to the scope', function () {
    expect(scope.title.length).toBe(25);
  });
});
