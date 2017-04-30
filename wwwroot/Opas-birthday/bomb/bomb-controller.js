angular.module("bombApp", []);

angular.module("bombApp").controller("bombController", ["$scope", "$interval", "$timeout", function (scope, interval, timeout) {
    var tickCounter = 0;

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

    scope.masters = [];
    scope.countdown = 10;
    scope.bombExploded = false;
    scope.masterDeadCount = null;
    scope.mastersDeadMessage = '';

    var countdownTimerId = undefined;
    var numMasters = 5;    

    console.log('started controller');

    var bombExplodedAftermath = function () {
        console.log('bombExplodedAftermath function is running');
        var dangerZone = $("#dangerZone");
        var offset = dangerZone.offset();

        var dangerZoneRect = {
            top: offset.top,
            left: offset.left,
            height: 250,
            width: 400
        };

        console.log(offset.top);
        console.log(offset.left);

        scope.masterDeadCount = 0;

        scope.masters.forEach(function (master) {
            //evaluates to true if master is inside the danger zone
            if (master.isInsideRect(dangerZoneRect)) {
                
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
        } else if(scope.masterDeadCount > 1) {
            scope.mastersDeadMessage = 'You failed! ' + scope.masterDeadCount + ' masters were caught in the explosion!';
        }
        
    };

    scope.startCountdown = function () {
        console.log('countdown started');
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
        var x = Math.floor(Math.random() * 750);

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
        var x = Math.floor((Math.random() * 750) + 0);

        var xVelo = Math.floor((Math.random() * 10) - 5);
        var yVelo = Math.floor((Math.random() * -5) + -2);

        return {
            x: x,
            y: 380,
            velocity: {
                x: xVelo,
                y: yVelo
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
                height: 380,
                width: 780
            }
        };

        var top = 0;
        var left = 0;
        var visible = false;

        var _move = function (start) {
            console.log(JSON.stringify(start));

            top = start.y;
            left = start.x;
            visible = true;
            height = 196;
            width = 96;

            state.activity = 'moving';
            state.velocity = start.velocity;
        }

        var _tick = function (tickCounter) {
            if(state.activity == 'sleeping') {
                visible = false;                                   
                var dream = function (food) {
                    var catFoodTins = 0;
                    catFoodTins++;
                };

                //Now go to sleep and dream a pointless dream
                dream("catfood");
            } else if(state.activity == 'moving') {
                console.log("State = " + JSON.stringify(state));
                if (_isInsideRect(state.bounds)) {

                    //inside boundaries so move forward
                    left += state.velocity.x;
                    top += state.velocity.y;
                }  else {
                    state.activity = 'sleeping';
                    visible = false;
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


        var _getTop = function () {
            return top;
        };
        var _getLeft = function () {
            return left;
        };
        var _getVisible = function () {
            return visible;
        };

        var _isInsideRect = function (bounds) {
            return left         <= bounds.left + bounds.width &&
                   left + width >= bounds.left && 
                   top          <= bounds.top + bounds.height && 
                   top + height >= bounds.top;
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

    makeMasters();

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
    }, 5000);

    scope.schoolBoyStyle = {};

    var schoolBoyPlaceBomb = function () {
        var bomb = $("#bomb");
        var offset = bomb.offset();

        var x = -50;
        var y = offset.top - 100;
        console.log(offset.top);
        
        
        var intervalId = interval(function () {
            if(x < offset.left - 100) {                
                x+=15;
                scope.schoolBoyStyle = {
                    'top': y,
                    'left': x,
                    'display': 'block',
                    'position': 'absolute',
                    'height': '175px'
                };
            } else {
                interval.cancel(intervalId);
            }
        }, 100);
        
    };
    schoolBoyPlaceBomb();

    var schoolBoyRunAway = function () {
        var oldBoy = $("#schoolBoyBomb");
        var offset = oldBoy.offset();

        var x = offset.left;
        var y = offset.top;
        
        var intervalId2 = interval(function () {
            if(x < 780) {                
                x += 15;
                scope.schoolBoyStyle = {
                    'top': y,
                    'left': x,
                    'display': 'block',
                    'position': 'absolute',
                    'height': '175px'
                };
            } else {
                interval.cancel(intervalId2);
                scope.schoolBoyStyle.display = 'none';
            }
        }, 100);
    };
}]);