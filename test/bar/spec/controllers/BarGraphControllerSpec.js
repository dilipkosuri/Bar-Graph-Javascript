// ---SPECS-------------------------

describe('bar-graph-dynamic', function () {
    var scope,
        controller;
    beforeEach(function () {
        module('bar-graph-dynamic');
    });

    describe('BarGraphController Functionality Test', function () {
        var location;
        var barGraphData = {"data": [{"buttons":[47,41,-11,-18],"bars":[28,31,46,72],"limit":180}]};

        beforeEach(inject(function ($rootScope, $controller, $location) {
            scope = $rootScope.$new();
            location = $location;
            controller = $controller('BarGraphController', {
                '$scope': scope
            });
        }));

        it('Check if the BarGraphController controller exist', function () {
            expect(controller).toBeDefined();
        });

        it('Check if the navigateToHome contains redirection to homepage delegate', function () {
            spyOn(location, 'path');
            scope.navigateToHomePage();
            expect(location.path).toHaveBeenCalledWith('homepage');
        });
    });

    describe('BarGraphController Service Test', function () {
        var location;
        var $httpBackend,
            expectedUrl = 'http://pb-api.herokuapp.com/bars',
            promise,
            successCallback,
            errorCallback,
            httpController;

        var barGraphData = {"data": [{"buttons":[47,41,-11,-18],"bars":[28,31,46,72],"limit":180}]};
        beforeEach(inject(function ($rootScope, $controller, $location, _$httpBackend_, HttpService) {
            scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            sampleSvcObj = HttpService;
            location = $location;
            controller = $controller('BarGraphController', {
                '$scope': scope
            });

            $httpBackend.whenGET(expectedUrl)
                .respond(200, barGraphData.data);
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('returns http response for bar graph charts and resolves the promise', function () {
            $httpBackend.when('GET','bar/scripts/partials/landing/welcome-page.html').respond({ body: '<html><body>HomePage</body></html>'});
            expect(controller).toBeDefined();
            $httpBackend.whenGET(expectedUrl).respond(200, barGraphData.data);
            promise = sampleSvcObj.load(expectedUrl);
            $httpBackend.flush();

            expect(scope.data).not.toEqual([]);
        });
    });
});