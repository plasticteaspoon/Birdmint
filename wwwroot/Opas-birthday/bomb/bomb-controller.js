'use strict';

angular.module("bombApp", []);

angular.module("bombApp").controller("bombController", ["$scope", "$interval", "$timeout", function (scope, interval, timeout) {
    scope.masters = [];
    scope.countdown = undefined;
    scope.countdownStarted = undefined;
    scope.bombExploded = undefined;
    scope.masterDeadCount = undefined;
    scope.mastersDeadMessage = undefined;
    scope.schoolBoyStyle = undefined;
    scope.ambulanceStyle = undefined;

    var tickCounter = null;
    var countdownTimerId = undefined;
    var numMasters = null;

    scope.gameZoneRect = {
        top: 0,
        left: 0,
        height: 380,
        width: 780
    };

    scope.dangerZoneRect = {
        height: 250,
        width: 400,
        innit: function () {
            this.top = (scope.gameZoneRect.height - this.height)/2;
            this.left = (scope.gameZoneRect.width - this.width)/2;

            return this;
        }
    }.innit();

    var schoolBoyHeight = 175;
    var schoolBoyWidth = 190;

    
    scope.startGame = function () {
        tickCounter = 0;
        countdownTimerId = undefined;
        numMasters = 5;

        scope.masters = [];
        scope.countdown = 10;
        scope.countdownStarted = false;
        scope.bombExploded = false;
        scope.masterDeadCount = null;
        scope.mastersDeadMessage = '';
        scope.schoolBoyStyle = {
            'top': 50,
            'left': -300,
            'display': 'none'
        };
        scope.ambulanceStyle = {
            'top': 190,
            'left': 780,
            'display': 'none',
            'position': 'absolute'
        };
        scope.masterBoyStyle = {
            'top': 100,
            'left': 780,
            'display': 'none',
            'position': 'absolute'
        };

        makeMasters();
        schoolBoyPlaceBomb();
    };

    interval(function () {
        tickCounter++;

        scope.masters.forEach(function (master) {
            master.tick(tickCounter);
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

    console.log('started controller');

    var bombExplodedAftermath = function () {
        scope.masterDeadCount = 0;

        scope.masters.forEach(function (master) {
            //evaluates to true if master is inside the danger zone
            if (master.isInsideRect(scope.dangerZoneRect)) {
                
                master.die();
                scope.masterDeadCount++;
            } else {
                master.sleep();
            }
        });

        if(scope.masterDeadCount == 0) {
            scope.mastersDeadMessage = 'Success! No masters were caught in the explosion';
        } else if(scope.masterDeadCount == 1) {
            scope.mastersDeadMessage = 'You failed! ' + scope.masterDeadCount + ' master was caught in the explosion!';
            callAmbulance();
        } else if(scope.masterDeadCount > 1) {
            scope.mastersDeadMessage = 'You failed! ' + scope.masterDeadCount + ' masters were caught in the explosion!';
            callAmbulance();
        }
        
    };

    scope.startCountdown = function () {
        scope.countdownStarted = true;
        schoolBoyRunAway();
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
        var x = Math.floor(Math.random() * scope.gameZoneRect.width);

        var xVelo = Math.floor((Math.random() * 10) - 5);
        var yVelo = Math.floor((Math.random() * 5) + 2);

        return {
            x: x,
            y: 0,
            velocity: {
                x: xVelo,
                y: yVelo
            }
        };
    };

    var randomBottomPosition = function () {
        var x = Math.floor(Math.random() * scope.gameZoneRect.width);

        var xVelo = Math.floor((Math.random() * 10) - 5);
        var yVelo = Math.floor((Math.random() * -5) + -2);

        return {
            x: x,
            y: scope.gameZoneRect.height,
            velocity: {
                x: xVelo,
                y: yVelo
            }
        };
    };

    var randomLeftPosition = function () {
        var y = Math.floor(Math.random() * scope.gameZoneRect.height);

        var xVelo = Math.floor((Math.random() * 5) + 2);
        var yVelo = Math.floor((Math.random() * 10) - 5);

        return {
            x: 0,
            y: y,
            velocity: {
                x: xVelo,
                y: yVelo
            }
        };
    };

    var randomRightPosition = function () {
       var y = Math.floor(Math.random() * scope.gameZoneRect.height);

        var xVelo = Math.floor((Math.random() * -5) - 2);
        var yVelo = Math.floor((Math.random() * 10) + -5);

        return {
            x: scope.gameZoneRect.width,
            y: y,
            velocity: {
                x: xVelo,
                y: yVelo
            }
        };
    };

    var starterFunctions = [randomTopPosition, randomBottomPosition, randomLeftPosition, randomRightPosition];

    var Master = function () {
        var state = {
            activity: 'sleeping',
            velocity: undefined,
            bounds: {
                top: 0,
                left: 0,
                height: scope.gameZoneRect.height,
                width: scope.gameZoneRect.width
            }
        };

        var rect = {
            top: 0,
            left: 0,
            height: 196,
            width: 96,
            visible: false
        };

        var _move = function (start) {

            rect.top = start.y;
            rect.left = start.x;
            rect.visible = true;

            state.activity = 'moving';
            state.velocity = start.velocity;
        }

        var _tick = function (tickCounter) {
            if(state.activity == 'sleeping') {
                rect.visible = false;                                   
                var dream = function (food) {
                    var catFoodTins = 0;
                    catFoodTins++;
                };

                //Now go to sleep and dream a pointless dream
                dream("catfood");
            } else if(state.activity == 'moving') {
                if (_isInsideRect(state.bounds)) {

                    //inside boundaries so move forward
                    rect.left += state.velocity.x;
                    rect.top += state.velocity.y;
                }  else {
                    state.activity = 'sleeping';
                    rect.visible = false;
                }
            } else if(state.activity == 'dead') {
                //I'm dead. It is so sad. I'm now only little pieces floating around the atmostphere
                timeout(function () {
                    rect.visible = false;
                }, 2000);
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


        var _getTop = function () {
            return rect.top;
        };
        var _getLeft = function () {
            return rect.left;
        };
        var _getVisible = function () {
            return rect.visible;
        };

        var _isInsideRect = function (bounds) {
            return rect.left              <= bounds.left + bounds.width &&
                   rect.left + rect.width >= bounds.left && 
                   rect.top               <= bounds.top + bounds.height && 
                   rect.top + rect.height >= bounds.top;
        };

        return {
            getTop: _getTop,
            getLeft: _getLeft,
            getVisible: _getVisible,
            move: _move,
            tick: _tick,
            isSleeping: _isSleeping,
            isInsideRect: _isInsideRect,
            die: _die,
            sleep: _sleep
        };
    };

    var makeMasters = function () {
        for(var i = 0; i < numMasters; i++) {
            var master = Master();

            scope.masters.push(master);
        }
    };

    var chooseStarterSide = function () {
        var arrayNum = Math.floor(Math.random() * 4);
        var starterFunc = starterFunctions[arrayNum];

        return starterFunc();
    };


    interval(function () {
        if(scope.bombExploded == false) {
            var freeMaster = null;

            scope.masters.forEach(function (master) {
                if(master.isSleeping()) {
                    freeMaster = master;
                }
            });
            if(freeMaster != null) {
                freeMaster.move(chooseStarterSide());
            }
        }
    }, 3000);

    var schoolBoyPlaceBomb = function () {
        scope.schoolBoyStyle.display = 'block';
        var intervalId = interval(function () {
            if(scope.schoolBoyStyle.left < 100) {
                scope.schoolBoyStyle.left += 15;
            } else {
                interval.cancel(intervalId);
            }
        }, 100);
        
    };

    var schoolBoyRunAway = function () {
        var intervalId2 = interval(function () {
            if(scope.schoolBoyStyle.left < scope.gameZoneRect.width) {         
                scope.schoolBoyStyle.left += 15;
            } else {
                interval.cancel(intervalId2);
                scope.schoolBoyStyle.display = 'none';
            }
        }, 100);
    };

    var callAmbulance = function () {
        timeout(function () {
            scope.ambulanceStyle.display = 'block';
            var intervalId3 = interval(function () {
                if(scope.ambulanceStyle.left > -300) {
                    scope.ambulanceStyle.left -= 10;
                } else {
                    interval.cancel(intervalId3);
                    dragBoy();
                }
            }, 50);
        }, 2000);
    };

    var dragBoy = function () {
        timeout(function () {
            scope.masterBoyStyle.display = 'block';
            var intervalId4 = interval(function () {
                if(scope.masterBoyStyle.left > -500) {
                    scope.masterBoyStyle.left -= 10;
                } else {
                    interval.cancel(intervalId4);
                }
            }, 50);
        }, 500);
    };

    scope.startGame();
}]);