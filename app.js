var quizzer = angular.module('quizzerApp', []);

quizzer.factory('questionFactory', ['$http', function ($http) {
    var urlBase = 'http://jservice.io/api/random';
    var dataFactory = {};
    dataFactory.getRandomQuestion = function () {
        return $http.get(urlBase);
    };
    dataFactory.getnRandomQuestions = function (numQuestions) {
        return $http.get(urlBase + '?count=' + numQuestions);
    };
    return dataFactory;
}]);

quizzer.controller('quizCtrl', function (questionFactory) {
    q = this;
    q.score = 0;
    q.numQuestions = 4;
    q.showform = true;
    q.letsplay = function () {
        //API request for 'q.numQuestions' questions
        questionFactory.getnRandomQuestions(q.numQuestions)
            .success(function (questions) {
                q.questions = questions;
            })
            .error(function (error) {
                q.status = 'Unable to load customer data: ' + error.message;
            });


        // show the questions
        q.showform = !q.showform
    }


    q.stopplay = function () {
        q.showform = !q.showform
    }
});