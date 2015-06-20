var app = angular.module("Ironthrone", []);

function seeid($scope){
    $scope.gamedescription = "This game is based on the Paper-Rock-Scissors game but using the GoT series.   At every stage, you need to side with one of the three Houses. Your opponent will do likewise and depending on who has the most powerful House, you win, you die or you get 'weakened'.";
    $scope.play = true;
    $scope.yourpic = "http://awoiaf.westeros.org/images/thumb/e/e6/MagaliVilleneuve_JoffIronThrone.jpg/300px-MagaliVilleneuve_JoffIronThrone.jpg";
    $scope.pcpic = "http://pre14.deviantart.net/9489/th/pre/i/2013/257/6/3/white_walkers_got_by_escudero-d6m88mi.png";
    $scope.revenge = false;
    $scope.yourchoice = "";
    $scope.yourscore = 5;
    $scope.enemyscore = 5;
    $scope.list = [{label: "House Targaryen", house: "the Targaryens", url: "http://lossietereinos.com/wp-content/uploads/2013/01/la-danza-de-los-dragones-guerra.jpg"},{label: "House Baratheon", house: "the Baratheons", url: "http://awoiaf.westeros.org/images/thumb/3/3b/Battle_of_Summerhall_Robert_Baratheon.jpg/350px-Battle_of_Summerhall_Robert_Baratheon.jpg"},{label: "House Lannister", house: "the Lannisters", url: "http://www.wall321.com/thumbnails/detail/20120227/war%20black%20army%20battle%20knights%20army%20of%20darkness%20horses%20red%20flag%201400x773%20wallpaper_www.wall321.com_35.jpg"}];
    
    $scope.checkhouse = function(value, url){
    $scope.yourchoice = value;
    $scope.yourpic = url;
    pcchoose($scope);
    showoutcome($scope);
    }
}

//pc choice
function pcchoose($scope){
    $scope.rnumber = Math.floor((Math.random() * 3) + 1);    
        if($scope.rnumber == 1){
            $scope.pcchoice = "House Targaryen";
            $scope.pcpic = $scope.list[0].url;
        }
        else if($scope.rnumber == 2){
            $scope.pcchoice = "House Baratheon"; 
            $scope.pcpic = $scope.list[1].url;
        }
        else if($scope.rnumber == 3){
            $scope.pcchoice = "House Lannister.";
            $scope.pcpic = $scope.list[2].url;
        }

};

//Results
function showoutcome($scope){
        $scope.result4 = "";    
    
        //Absolute defeat
        if($scope.enemyscore == 10){
            $scope.revenge = true;
            $scope.play = false;
            $scope.yourpic = "http://awoiaf.westeros.org/images/thumb/e/e6/MagaliVilleneuve_JoffIronThrone.jpg/300px-MagaliVilleneuve_JoffIronThrone.jpg";
            $scope.pcpic = "http://pre14.deviantart.net/9489/th/pre/i/2013/257/6/3/white_walkers_got_by_escudero-d6m88mi.png";
            $scope.yourchoice = "";
            $scope.pcchoice = "";
            $scope.reset = function(){
                $scope.yourscore = 5;
                $scope.enemyscore = 5;
                $scope.revenge = false;
                $scope.play = true;
                $scope.result1 = "";
                $scope.result2 = "";
                $scope.result3 = "";
                $scope.outcomepic = "";
            };
            $scope.result1 = "DEFEAT";
            $scope.result3 = "Where is the King's Justice?";
            $scope.result2 = "There is no justice in this world unless we make it.";
    }
    
        //Absolute victory
        else if($scope.yourscore == 10){
            $scope.betrayal = true;
            $scope.play = false;
            $scope.yourpic = "http://awoiaf.westeros.org/images/thumb/e/e6/MagaliVilleneuve_JoffIronThrone.jpg/300px-MagaliVilleneuve_JoffIronThrone.jpg";
            $scope.pcpic = "http://pre14.deviantart.net/9489/th/pre/i/2013/257/6/3/white_walkers_got_by_escudero-d6m88mi.png";
            $scope.yourchoice = "";
            $scope.pcchoice = "";
            $scope.reset = function(){
                $scope.yourscore = 5;
                $scope.enemyscore = 5;
                $scope.betrayal = false;
                $scope.play = true;
                $scope.result1 = "";
                $scope.result2 = "";
                $scope.result3 = "";
                $scope.outcomepic = "";
            };
            $scope.result1 = "VICTORY";
            $scope.result3 = "The battle is over. You have won!";
            $scope.result2 = "You are grown so very great now, yet the higher a man climbs the farther he has to fall.";
    } 
    
        else if($scope.yourscore > 0 && $scope.enemyscore > 0){
            //Defeat

            if($scope.yourchoice == "the Targaryens" && $scope.rnumber == 2){
                $scope.result1 = "DEFEAT";
                $scope.result2 = "'This Baratheon is fearless. He fights the way a king should fight.'"
                $scope.result3 = "Ours is the Fury!";
                $scope.outcomepic = $scope.list[1].url;
                $scope.yourscore -=1;
                $scope.enemyscore +=1;
            }
        
            else if($scope.yourchoice == "the Baratheons" && $scope.rnumber == 3){
                $scope.result1 = "DEFEAT";
                $scope.result2 = "'Bring me his head!'";
                $scope.result3 = "Hear me roar!";
                $scope.outcomepic = $scope.list[2].url;
                $scope.yourscore -=1;
                $scope.enemyscore +=1;
            }
        
            else if($scope.yourchoice == "the Lannisters" && $scope.rnumber == 1){
                $scope.result1 = "DEFEAT";
                $scope.result2 = "When my dragons are grown, we will lay waste to your armies and burn your cities to the ground.'";
                $scope.result3 = "Fire and Blood!";
                $scope.outcomepic = $scope.list[0].url;
                $scope.yourscore -=1;
                $scope.enemyscore +=1;
            }
    

        //Victory
    
            else if($scope.yourchoice == "the Baratheons" && $scope.rnumber == 1){
                $scope.result1 = "VICTORY";
                $scope.result2 = "'This Baratheon is fearless. He fights the way a king should fight.'"
                $scope.result3 = "Ours is the Fury";
                $scope.outcomepic = $scope.list[1].url;
                $scope.yourscore +=1;
                $scope.enemyscore -=1;
            }
    
            else if($scope.yourchoice == "the Lannisters" && $scope.rnumber == 2){
                $scope.result1 = "VICTORY";
                $scope.result2 = "'Bring me his head!'";
                $scope.result3 = "Hear me roar";
                $scope.outcomepic = $scope.list[2].url;
                $scope.yourscore +=1;
                $scope.enemyscore -=1;
            }
    
            else if($scope.yourchoice == "the Targaryens" && $scope.rnumber == 3){
                $scope.result1 = "VICTORY";
                $scope.result2 = "'When my dragons are grown, we will lay waste to your armies and burn your cities to the ground.'";
                $scope.result3 = "Fire and Blood";
                $scope.outcomepic = $scope.list[0].url;
                $scope.yourscore +=1;
                $scope.enemyscore -=1;
            }
            else{
                $scope.result1 = "DRAW";
                $scope.result2 = "'Winter is coming and we know what's coming with it.'";
                $scope.result3 = "";
                $scope.result4 = "Every battle that you don't win is a battle that weakens you. You cannot afford to be weak. The threat beyond the Wall grows stronger every day.";
                $scope.outcomepic = "http://img00.deviantart.net/6215/i/2013/125/a/0/game_of_the_thrones___white_walkers_by_redan23-d5pshz4.jpg";
            }
        }
    };
