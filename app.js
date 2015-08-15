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
    var vm = this;
    vm.score = 0;
    vm.numQuestions = 4;
    vm.showform = true;
    vm.showans = false;
    vm.questions = [{
        "id": 16479,
        "answer": "Napoleon",
        "question": "The Bata Shoe Museum in Toronto features a pair of black silk socks worn by this emperor on St. Helena",
        "value": 100,
        "airdate": "1997-05-09T12:00:00.000Z",
        "created_at": "2014-02-11T22:55:45.126Z",
        "updated_at": "2014-02-11T22:55:45.126Z",
        "category_id": 539,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 539,
            "title": "museums",
            "created_at": "2014-02-11T22:49:06.194Z",
            "updated_at": "2014-02-11T22:49:06.194Z",
            "clues_count": 160
        }
    }, {
        "id": 16480,
        "answer": "Hospital",
        "question": "(Big white \"H\" on a blue background)",
        "value": 100,
        "airdate": "1997-05-09T12:00:00.000Z",
        "created_at": "2014-02-11T22:55:45.139Z",
        "updated_at": "2014-02-11T22:55:45.139Z",
        "category_id": 1715,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 1715,
            "title": "international signs \u0026 symbols",
            "created_at": "2014-02-11T22:55:45.051Z",
            "updated_at": "2014-02-11T22:55:45.051Z",
            "clues_count": 5
        }
    }, {
        "id": 16481,
        "answer": "eyebrows",
        "question": "A German woman may pluck these, her augenbrauen",
        "value": 200,
        "airdate": "1997-05-09T12:00:00.000Z",
        "created_at": "2014-02-11T22:55:45.153Z",
        "updated_at": "2014-02-11T22:55:45.153Z",
        "category_id": 1714,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 1714,
            "title": "foreign anatomy",
            "created_at": "2014-02-11T22:55:45.027Z",
            "updated_at": "2014-02-11T22:55:45.027Z",
            "clues_count": 10
        }
    }, {
        "id": 16482,
        "answer": "Honshu",
        "question": "Kanmon Tunnel, the world's first under an ocean, connects the island of Kyushu with this island",
        "value": 200,
        "airdate": "1997-05-09T12:00:00.000Z",
        "created_at": "2014-02-11T22:55:45.167Z",
        "updated_at": "2014-02-11T22:55:45.167Z",
        "category_id": 103,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 103,
            "title": "transportation",
            "created_at": "2014-02-11T22:47:35.305Z",
            "updated_at": "2014-02-11T22:47:35.305Z",
            "clues_count": 245
        }
    }];
    vm.letsplay = function () {
        //API request for 'q.numQuestions' questions
        //        questionFactory.getnRandomQuestions(q.numQuestions)
        //            .success(function (response) {
        //                q.questions = response;
        //            })
        //            .error(function (error) {
        //                q.status = 'Unable to load customer data: ' + error.message;
        //            });


        // show the questions
        vm.showform = !vm.showform
    }


    vm.stopplay = function () {
        vm.showform = !vm.showform;
    }
    vm.submit = function () {
        //score the answers
        for (var i = 0; i < vm.questions.length; i++) {
            if (vm.questions[i].useranswer.toLowerCase() == vm.questions[i].answer.toLowerCase()) {
                vm.score += vm.questions[i].value;
            }

        }

        //hide the submission form
        vm.showform = !vm.showform;
        //show the answers
        vm.showans = true;

    }

});