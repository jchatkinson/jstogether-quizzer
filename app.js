var quizzer = angular.module('quizzerApp', []);

quizzer.factory('questionFactory', ['$http', function ($http) {
    var urlBase = 'https://jsonp.afeld.me/?url=http://jservice.io/api/random';
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
    vm.useranswer = "";
    vm.showtitle = true;
    vm.showquestions = false;
    vm.showans = false;
    vm.index = 0;
    vm.startplay = function () {
        //API request for 'q.numQuestions' questions
        questionFactory.getnRandomQuestions(vm.numQuestions)
            .success(function (response) {
                vm.questions = response;
            })
            .error(function (error) {
                vm.status = 'Unable to load data: ' + error.message;
                //would be nice to send a little toast msg to user if there is an issue
                vm.numQuestions = 2
            });

        // hide the title
        vm.showtitle = false;
        // show the question card
        vm.showquestions = true;
        //hide the answers
        vm.showans = false;
    }

    //function to show elements of title view
    vm.stopplay = function () {
        //show the title elements
        vm.showtitle = true;
        //hide the question elements
        vm.showquestions = false;
        //hide the answer elements
        vm.showans = false;
    }

    //function to show elements that review ans and score
    vm.submit = function () {
        console.log('clicked submit');
        //score the answers
        for (var i = 0; i < vm.questions.length; i++) {
            if (vm.questions[i].useranswer.toLowerCase() == vm.questions[i].answer.toLowerCase()) {
                vm.score += vm.questions[i].value;
            }

        }
        vm.showtitle = false;
        vm.showquestions = false;
        vm.showans = true;
    }
    vm.nextquestion = function () {
        if (vm.index < vm.questions.length - 1) {
            vm.index++;
        }
    }
    vm.prevquestion = function () {
            if (vm.index > 0) {
                vm.index--;
            }
        }
        //initialize some questions incase of api failure
    vm.questions = [{
        "answer": "Napoleon",
        "question": "The Bata Shoe Museum in Toronto features a pair of black silk socks worn by this emperor on St. Helena",
        "value": 100,
        "category": {
            "title": "museums"
        }
                }, {
        "answer": "Hospital",
        "question": "(Big white \"H\" on a blue background)",
        "value": 100,
        "category": {
            "title": "international signs \u0026 symbols"
        }
                }];

});