angular.module('starter.services', [])

    .service('APIInterceptor', function ($rootScope, $q) {
        var service = this;

        service.responseError = function (response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return $q.reject(response);
        };
    })


    .service('PreSurveysModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'presurvey/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };
    })

    .service('LoginService', function (Backand) {
        var service = this;
        service.signin = function (email, password, appName) {
            Backand.setAppName(appName);
            return Backand.signin(email, password);
        };

        service.signout = function () {
            return Backand.signout();
        };
    });
    
/*    
    .service('ReferenceService', function() {
        return {
            form: {},
            getForm: function() {
                return this.form;
            },
            updateForm: function(form) {
                this.form = form;
            }
        }
    })
    
*/