
var m;
var value = 255;
var width;
var height;
function setup() {
  width = 400;
  height = 400;
  var canvas = createCanvas(width, height);
  canvas.parent("m1");
  m = new Movent();
  m.stopAgentMovement();
}
function draw(){
  background(value);
  m.move();
  m.displayit();
}
function mouseReleased(){ //used to stop the agent
	if((mouseY < 0 || mouseY > height) || (mouseX < 0 || mouseX > width)) return false; //this canvas lies within 0 and 400 in the y axis
    if(value == 0){
        value = 255
        m.stopAgentMovement();
    }
    else if (value == 255){
        value = 0
        m.startAgentMovement();
    }
    return false;
}


//contains the main objects PVector and Movent
function PVector(xp, yp){
    this.x = xp; //member variables
    this.y = yp;
    
    //methods
    this.checkwalls = function(){
        if(this.x > width){ //wraps around the screen
            this.x = 0;
        }

        else if(this.x < 0){
            this.x = width;
        }

        else if(this.y > height){ //wraps around the screen
            this.y = 0;
        }

        else if(this.y < 0){
            this.y = height;
        }

    };

    this.add = function(vector){
        this.x = this.x + vector.x;
        this.y = this.y + vector.y;
    };

    this.substract = function(vector){
        this.x = this.x - vector.x;
        this.y = this.y - vector.y;
    };

    this.multiply = function(numberx){
        this.x = this.x * numberx;
        this.y = this.y * numberx;
    };

}

function Movent(){
    var mMaxSpeed = 10;
    var mMagnitude;
    var mLocation = new PVector(random(10,100),random(10,100));
    var mSpeed = new PVector(0, 0);
    var mAcceleration = new PVector(0.001,0.004);

    this.stopAgentMovement = function(){
        mAcceleration.x = 0;
        mAcceleration.y = 0;
        mSpeed.x = 0;
        mSpeed.y = 0;
    };
    this.startAgentMovement = function(){
        mAcceleration = new PVector(0.001,0.004);
        mSpeed = new PVector(0, 0);
    };
    function checkSpeed(){
        mMagnitude = Math.sqrt((mSpeed.x * mSpeed.x) + (mSpeed.y * mSpeed.y));
        if(mMagnitude > 10){
            mAcceleration.x = 0;
            mAcceleration.y = 0;
        }
        return mMagnitude;
    };
    this.move = function(){
        mLocation.checkwalls();
        mLocation.add(mSpeed);
        mSpeed.add(mAcceleration);
        checkSpeed();
    };
    this.displayit = function(){
        ellipse(mLocation.x,mLocation.y,50,50);
    };
}
