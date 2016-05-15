//agent tracks the mouse
var m;
var value = 255; ////used to change the background color and to check whether the agent is moving
var width;
var height;

function setup() {
	width = 400;
  	height = 400;
  	createCanvas(width, height);
  	m = new Movent();
  	m.stopAgentMovement();
}

function draw(){
  background(value);
  m.checkwalls();
  m.move();
  m.displayit();
  fill(255);
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

//Movent and Vector classes
function Movent(){
    var mLocation;
    var mSpeed;
    var mAcceleration;
    var mMaxSpeed = 7;
    var mMagnitude; //for the speed limit
    var mDirection; //sort of compass aiming to the mouse location
    var mouselocation;
    var animateState = true;

    mLocation = new PVector(width/2, height/2);
    mSpeed = new PVector(0, 0);
    mAcceleration = new PVector(0.05,0.05);

    var xDirectionSwitch = true; //switches that are true if the mouse is in the respective axis
    var yDirectionSwitch = true;
    
    function checkSpeed(){
    	mMagnitude = Math.sqrt((mSpeed.x * mSpeed.x) + (mSpeed.y * mSpeed.y));
    	if(mMagnitude > mMaxSpeed){
    		mSpeed.x = 0;
    		mSpeed.y = 0;
    	}
    	return mMagnitude;
    };
	this.getMag = function(){
        return parseFloat(mMagnitude);
    };
	this.checkwalls = function(){ //prevents the movent from going off screen
		if(mLocation.x > height){ 
			xDirectionSwitch = false;
		}

		else if(mLocation.x < 0){
			mSpeed.x = 0;
			xDirectionSwitch = false;
		}
		if(mLocation.y > height){
			mSpeed.y = 0;
			yDirectionSwitch = false;
		}

		else if(mLocation.y < 0){
			mSpeed.y = 0;
			yDirectionSwitch = false;
		}
		if(mouseX > 0 && mouseX < width){
			xDirectionSwitch = true;
		}
		if(mouseY > 0 && mouseY < height){
			yDirectionSwitch = true;
		}
	};

    function subVectors(mouseVector, vector2){
    	var vector3 = new PVector(mouseVector.x - vector2.x, mouseVector.y - vector2.y);
    	return vector3;
    };

    function checkDirectionSwitches(){ //makes a mouse location vector which depends on whether the mouse is outside of none/one/both axes
    	//the 4 conditionals below deal with the possibilities of the mouse being inside or outside the screen limits
		if (xDirectionSwitch && yDirectionSwitch){ //- i.e. the movent follows the mouse x and y location
			mouselocation = new PVector(mouseX, mouseY);
		}
		else if (xDirectionSwitch){
			//we get the x coordinates of the mouse - i.e. the movent follows the mouse x location
			mouselocation = new PVector(mouseX, 0);
		}
		else if(yDirectionSwitch){
			//we get the y coordinates of the mouse - i.e. the movent follows the mouse y location
			mouselocation = new PVector(0, mouseY);
		}
		else if (xDirectionSwitch == false && yDirectionSwitch == false){ //if the mouse is offscreen in both axes, the movent waits in the center of the screen
			mouselocation = new PVector(width/2, height/2);
		}
    }
    
	this.move = function(){
		if(animateState == false){
			return false;
		}
		checkDirectionSwitches();
        mDirection = subVectors(mouselocation, mLocation);  //we calculate the direction of the mouselocation
		mDirection.normalizeit(); //this means that at any given point, the mDirection vector points to the mouse location
		mDirection.multiply(0.5); //we scale the vector
		mAcceleration = mDirection; //as we get closer to the mouse, the acceleration diminishes accordingly
		mSpeed.add(mAcceleration);
        checkSpeed(); //sets a limit to the speed of the movent
		mLocation.add(mSpeed);
	};
	this.displayit = function(){
		ellipse(mLocation.x,mLocation.y,50,50);
	};
	this.stopAgentMovement = function(){
        mAcceleration.x = 0;
        mAcceleration.y = 0;
        mSpeed.x = 0;
        mSpeed.y = 0;
        animateState = false;
    };
    this.startAgentMovement = function(){
    	animateState = true;
    };
}

function PVector(xp, yp){
    this.x = xp; //member variables
    this.y = yp;
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
    this.divide = function(numberx){
    	this.x = this.x / numberx;
    	this.y = this.y / numberx;
    };
    //to normalise we divide the x and y components of the vector by its magnitude
    this.normalizeit = function(){
       var magnitude = 0;
    	magnitude = Math.sqrt((this.x * this.x) + (this.y * this.y));
    	if(magnitude != 0){
    		this.divide(magnitude);
        }
    };
}