var opaApp = angular.module("opaApp", []);

opaApp.controller("opaController", ["$scope", "$interval", function (scope, interval) {
    var tickCounter = 0;

    interval(function () {
        tickCounter++;

        scope.kittens.forEach(function (kitten) {
            kitten.tick(tickCounter);
        });
    }, 50);
    
    scope.messages = {
        warning:'',
        success:'',
        error:'',
        clear: function () {
            this.warning = '';
            this.success = '';
            this.error = '';
        }
    };

    scope.kittens = [];
    scope.countdown = 10;
    scope.bombExploded = false;
    scope.kittenDeadCount = null;
    scope.kittensDeadMessage = '';

    var countdownTimerId = undefined;

    console.log('started controller');

    var bombExplodedAftermath = function () {
        console.log('bombExplodedAftermath function is running');
        var dangerZone = $("#dangerZone");
        var offset = dangerZone.offset();

        var zoneTop = offset.top;
        var zoneLeft = offset.left;
        var zoneBottom = offset.top + 250;
        var zoneRight = offset.left + 400;

        console.log(offset.top);
        console.log(offset.left);

        scope.kittenDeadCount = 0;

        scope.kittens.forEach(function (kitten) {
            if (kitten.style.top > zoneTop &&
                kitten.style.left > zoneLeft &&
                kitten.style.top < zoneBottom &&
                kitten.style.left < zoneRight) {
                
                kitten.die();
                scope.kittenDeadCount++;
            } else {
                kitten.sleep();
            }
        });

        if(scope.kittenDeadCount == 0) {
            scope.kittensDeadMessage = 'Success! No kittens were caught in the explosion';
        } else if(scope.kittenDeadCount == 1) {
            scope.kittensDeadMessage = 'You failed! ' + scope.kittenDeadCount + ' kitten were caught in the explosion!';
        } else if(scope.kittenDeadCount > 1) {
            scope.kittensDeadMessage = 'You failed! ' + scope.kittenDeadCount + ' kittens were caught in the explosion!';
        }
        
    };

    scope.startCountdown = function () {
    console.log('countdown started');
    if (countdownTimerId == undefined) {
        countdownTimerId = interval(function () {
            scope.countdown--;
            if(scope.countdown == 0) {
                interval.cancel(countdownTimerId);
                scope.bombExploded = true;

                bombExplodedAftermath();
            }
        }, 1000);
    }
};

    scope.countdownClass = function () {
        if(scope.countdown == 10) {
            return false;
        } else {
            return true;
        }
    };


    var randomTopPosition = function () {
        var x = Math.floor((Math.random() * 750) + 0);

        var xVelo = Math.floor((Math.random() * 10) - 5);
        var yVelo = Math.floor((Math.random() * 5) + 2);

        return {
            x: x,
            y: 0,
            velocity: {
                x: xVelo,
                y: yVelo
            },
            bounds: {
                top: 0,
                left: 0,
                bottom: 380,
                right: 780
            }
        };
    };

    var randomBottomPosition = function () {
        var x = Math.floor((Math.random() * 750) + 0);

        var xVelo = Math.floor((Math.random() * 10) - 5);
        var yVelo = Math.floor((Math.random() * -5) + -2);

        return {
            x: x,
            y: 380,
            velocity: {
                x: xVelo,
                y: yVelo
            },
            bounds: {
                top: 0,
                left: 0,
                bottom: 380,
                right: 780
            }
        };
    };

    var randomLeftPosition = function () {
        var y = Math.floor((Math.random() * 380) + 0);

        var xVelo = Math.floor((Math.random() * 5) + 2);
        var yVelo = Math.floor((Math.random() * 10) - 5);

        return {
            x: 0,
            y: y,
            velocity: {
                x: xVelo,
                y: yVelo
            },
            bounds: {
                top: 0,
                left: 0,
                bottom: 380,
                right: 780
            }
        };
    };

    var randomRightPosition = function () {
       var y = Math.floor((Math.random() * 380) + 0);

        var xVelo = Math.floor((Math.random() * -5) - 2);
        var yVelo = Math.floor((Math.random() * 10) + -5);

        return {
            x: 750,
            y: y,
            velocity: {
                x: xVelo,
                y: yVelo
            },
            bounds: {
                top: 0,
                left: 0,
                bottom: 380,
                right: 780
            }
        };
    };

    var starterFunctions = [randomTopPosition, randomBottomPosition, randomLeftPosition, randomRightPosition];

    var Kitten = function () {
        var state = {
            activity: 'sleeping',
            velocity: undefined,
            bounds: undefined
        };

        var _style = {
            'height': '50px',
            'top': 0,
            'left': 0,
            'position': 'absolute',
            'display': 'none',
            'z-index': '-1',
        };
        var _move = function (start) {
            console.log(JSON.stringify(start));

            _style.top = start.y;
            _style.left = start.x;
            _style.display = 'block';

            state.activity = 'moving';
            state.velocity = start.velocity;
            state.bounds = start.bounds;
        }

        var _tick = function (tickCounter) {
            if(state.activity == 'sleeping') {
                _style.display = 'none';                                   
                var dream = function (food) {
                    var catFoodTins = 0;
                    catFoodTins++;
                };

                //Now go to sleep and dream a pointless dream
                dream("catfood");
            } else if(state.activity == 'moving') {
                if (_style.left <= state.bounds.right && 
                    _style.top <= state.bounds.bottom &&
                    _style.left >= state.bounds.left && 
                    _style.top >= state.bounds.top ) {

                    //inside boundaries so move forward
                    _style.left+=state.velocity.x;
                    _style.top+=state.velocity.y;
                }  else {
                    state.activity = 'sleeping';
                    _style.display = 'none';
                }
            } else if(state.activity == 'dead') {
                //I'm dead. It is so sad. I'm now only little pieces floating around the atmostphere
            }
        };

        var _isSleeping = function () {
            if(state.activity == 'sleeping') {
                return true;
            }
            return false;
        };

        var _die = function () {
            state.activity = 'dead';
        };

        var _sleep = function () {
            state.activity = 'sleeping';
        };

        return {
            style: _style,
            move: _move,
            tick: _tick,
            isSleeping: _isSleeping,
            die: _die,
            sleep: _sleep
        };
    };

    var makeKittens = function () {
        var numKittens = 10;
        for(var i = 0; i < numKittens; i++) {
            var kitten = Kitten();

            scope.kittens.push(kitten);
        }
    };

    makeKittens();

    var chooseStarterSide = function () {
        var arrayNum = Math.floor(Math.random() * 4);
        var starterFunc = starterFunctions[arrayNum];

        return starterFunc();
    };

    for(var i = 0; i < 10; i++) {
        scope.kittens[i].move(chooseStarterSide());
    }

    interval(function () {
        if(scope.bombExploded == false) {
            var freeKitten = null;

            scope.kittens.forEach(function (kitten) {
                if(kitten.isSleeping()) {
                    freeKitten = kitten;
                }
            });
            if(freeKitten != null) {
                freeKitten.move(chooseStarterSide());
            }
        }
    }, 2000);
}]);