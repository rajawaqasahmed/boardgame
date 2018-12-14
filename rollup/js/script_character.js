fetch('https://anapioficeandfire.com/api/characters?pageSize=50&page=12')
    .then(result => result.json())
  .then((res) => {
	//console.log("reached before res");
    gameCharacter(res);

	
	//console.log("reached after res");
  })
.catch(err => console.log(err))

var AllPlayers = [];
var player = {
    name: "",
    id: ""
}
function gameCharacter(mycards) {
    console.log(mycards);
    var details = document.getElementById('cards');
    var j=0;
    var selectid =0;
    for (var i=16 ; i < 26 ; i++)
    {
        j++;
        if(j>10)
            j=1;
        selectid = "myselect"+j;
        details.innerHTML += "<div class=' [  col-sm-3 ] ' style=' padding: 10px; '><div class=' [ card my-card ] '><div class='card-header'><b> <p id='playerName"+j+"' value='" + mycards[i].name +  "'> " + mycards[i].name +  "</p></b></div><div class='card-body'><div> <img class= ' [ my-card-image ] ' src='../image/characters/character" + j + ".jpg'></div><div class='text-left'><div><b>Gender:</b> " + mycards[i].gender + " </div><div><b>Title:</b> " + mycards[i].titles[0] + "</div></div></div><div class='card-footer '><label class='form-check-label'><input type='checkbox' value='character"+j+"' class=' [ form-check-input ]' id='myselect"+j+"' onclick='checkMinMaxTwo("+selectid+");'><span class=' text-uppercase'>SELECT PLAYER</span></label></div></div></div>";

        AllPlayers.push([mycards[i].name, j]);
     }
    console.log(AllPlayers);
}

function myFunction() {
    
    if(selectedPlayerArray.length === 2){
        
            var p_name = [];
        var x = document.getElementById("divHide");
        var y = document.getElementById("divShow");
 
        for(var i=0;i<selectedPlayerArray.length;i++){
            for(var j=0;j<AllPlayers.length;j++){
                var tempId = selectedPlayerArray[i].id;
                var res = tempId.slice(8);
                if(res == AllPlayers[j][1]){
                    p_name.push(AllPlayers[j][0]);
                }

            }
        }
        
        document.getElementById('p1Name').innerHTML = p_name[0];
        document.getElementById('p2Name').innerHTML = p_name[1];

        x.style.display = "none";
        y.style.display = "block";  
    }
    else {
        alert("Please choose two players to go next page.");
    }
    
    
   if(myselect1.checked){
        console.log("checked");
   }
    else{
        console.log("unchecked");
    }
    
    

    
    //console.log(p_name);
    

    
    //console.log("chosen players",selectedPlayerArray);
    //console.log(" player 1 hard coded",document.getElementById("playerName1").innerHTML);
}
var maxtwo = 1;
var selectedPlayerArray = [];
var selectedPlayerDetails = [];
        
function checkMinMaxTwo(myid){
    console.log(myid);
    console.log(maxtwo);

         if(myid.checked){
             if(maxtwo<=2){
                selectedPlayerArray.push(myid);
                selectedPlayerDetails.push(myid.id);
                
                maxtwo++;
             }
             else {
                 myid.checked = false;
                 for(var i=1;i<=10;i++){
                    var str = "myselect"+i;
                    if(str==selectedPlayerArray[1].id || str==selectedPlayerArray[0].id) {

                    }
                   else {
                        //console.log("str ", str);
                        document.getElementById(str).disabled = true;
                        str.disabled = true;
                    }
                }
             }
         }
         else{
              if(myid.id==selectedPlayerArray[1].id || myid.id==selectedPlayerArray[0].id) {
                  maxtwo--;
                    for(var c=1; c<=10; c++) 
                    {
                        var str1 = "myselect" + c;
                        document.getElementById(str1).disabled = false;
                        str1.disabled = false;

                    }
                    for(var i=0; i<selectedPlayerArray.length;i++){
                        if(myid==selectedPlayerArray[i]){
                            selectedPlayerArray.splice(i,1);

                        }
                    }
              }
         }
    
}


//       //Hide Div Function
//function myFunction2(){
//    var x = document.getElementById("divHide");
//    var y = document.getElementById("divShow");
//    x.style.display = "none";
//    y.style.display = "block";
//    
//}







//Game play

//Initial locations of Player1 and Player2 
 p1_x_currentLocation = 3;   
 p1_y_currentLocation = 3;   
 p2_x_currentLocation = 3;   
 p2_y_currentLocation = 23;
 stepToken = 30;
 xDist = 3;

     
   
// game states 
p1Playing=true;
p2Playing=false;
var p1Score = 1;
var p2Score = 1;
var playing = true;
var p1row = 1;
var p2row = 1;


    
    
  // Background Canvas Drawings 
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext('2d');
ctx.scale(5,5);
    var p1_token = canvas.getContext("2d");    
    var p2_token = canvas.getContext("2d"); 
    var p3_token = canvas.getContext("2d"); 
var squares = canvas.getContext("2d");    
    var digits = canvas.getContext("2d");    
    var traps = canvas.getContext("2d"); 





//  game token dynamically draw and clear
function drawTokenP1(x,y){
    p1_token = canvas.getContext("2d");  
    p1_token.beginPath;
    p1_token.fillRect(x,y,5,5);
    p1_token.fillStyle = '#edff00';
    p1_token.fill();
    p1_token.closePath();
}
function drawTokenP2(x,y){
    p2_token = canvas.getContext("2d"); 
     p2_token.beginPath;
    p2_token.fillRect(x,y,5,5);
    p2_token.fillStyle = '#30b1f2';
    p2_token.fill();
    p2_token.closePath();
}
  function clearTokenP2(x,y){
      p2_token = canvas.getContext("2d");  
        p2_token.clearRect(x,y,5,5);

}
  function clearTokenP1(x,y){
      p1_token = canvas.getContext("2d");  
        p1_token.clearRect(x,y,5,5);
}

function drawDigit(dig, xvalue, yvalue){
         
  digits.font = 20  + "px Arial";
  digits.textAlign = 'center';
  digits.textBaseline = 'middle';
  digits.fillStyle = '#d8212f';
  digits.fillText(dig, xvalue+15, yvalue+15);
}
function drawBackgroundCanvas(){
       
    var xvalue=0;
    var yvalue=0;
    var step=30;
    var dig = 1;
    

 
    for(var y=0; y<=4; y++){
        for(var x=0; x<10; x++){ 
          //Traps Hide Text
//            if (dig!=6 || dig!=19 || dig!=29 || dig!=37 || dig!=48){
//                
//            }
//            
            // boxes and number background of game
            if(y%2==0)
                {
                    squares.strokeRect(xvalue,yvalue,30,30);
                    //Traps Hide Text
                    if (dig==6 || dig==19 || dig==29 || dig==37 || dig==48){}
                    else
                       drawDigit(dig, xvalue, yvalue);
                    
                    xvalue = xvalue +step;
                    dig++;
                    
                }
            else
               {
                   xvalue = xvalue-step;
                   squares.strokeRect(xvalue,yvalue,30,30);
                   //Traps Hide Text
                if (dig==6 || dig==19 || dig==29 || dig==37 || dig==48){}
                else
                    drawDigit(dig, xvalue, yvalue);
                   dig++;
               }
        }
        yvalue = yvalue+30;
    }  
   
 // Draw traps
  ctx.drawImage(document.getElementById('imgSnake'), (30*5),0);//no6
  ctx.drawImage(document.getElementById('imgSnake'), (30*1),30);//no19
  ctx.drawImage(document.getElementById('imgSnake'), (30*8),30+30);//no29
  ctx.drawImage(document.getElementById('imgSnake'), (30*3),30+30+30);//no37
  ctx.drawImage(document.getElementById('imgSnake'), (30*7),30+30+30+30);//no48
 
    
}

// draw canvaa, initialize game board
document.getElementById("startGameButton").addEventListener("click", function() {
     drawTokenP1(p1_x_currentLocation,p1_y_currentLocation);
     drawBackgroundCanvas();
     drawTokenP2(p2_x_currentLocation,p2_y_currentLocation);
    
    
    var showMeNow = document.getElementById("scoreboardData");
    var setInitialTurn1 = document.getElementById("arrowShowHideP1");
    var setInitialTurn2 = document.getElementById("arrowShowHideP2");
    //   x.style.display = "none";
    showMeNow.style.display = "block";  
    setInitialTurn1.style.display = "block";  
    setInitialTurn2.style.display = "none";  

    
});

var turns = 0; // alternative turns for players
//Dice Roll P1
document.getElementById("myP1RollButton").addEventListener("click", function() {
    if (turns == 0){
        var setInitialTurn1 = document.getElementById("arrowShowHideP1");
        var setInitialTurn2 = document.getElementById("arrowShowHideP2");
        var divP1DetailsText = document.getElementById("playersDetailsDiv1");

        setInitialTurn2.style.display = "block";  
        setInitialTurn1.style.display = "none";  
        divP1DetailsText.style.color = '#9fa09f';  
        var divP2DetailsText = document.getElementById("playersDetailsDiv2");
        divP2DetailsText.style.color = '#fff';  
     turns = 1;
    // use builtin random function
    var rand = Math.floor(Math.random() * 6) + 1;
    document.getElementById("p1RandNum").innerHTML = rand;
        clearTokenP1(p1_x_currentLocation,p1_y_currentLocation);
        old_p1_score = p1Score;
        p1Score = p1Score + rand;
        new_p1_score = p1Score;
         
        
        //Traps punishment - 3 steps backward
        if (p1Score==6){
            p1Score = p1Score - 3;
            p1_x_currentLocation = (2*stepToken) + xDist;
            drawTokenP1(p1_x_currentLocation,p1_y_currentLocation);
            document.getElementById("p1Score").innerHTML = p1Score;           
        }
        else if (p1Score==19 || p1Score==29 || p1Score==37 || p1Score==48){
            p1Score = p1Score - 3;
           
            // trap check even odd row for backward or forward location of token
           if(p1row%2==0){
                p1_x_currentLocation = p1_x_currentLocation - (rand*stepToken) + (3*stepToken);
                drawTokenP1(p1_x_currentLocation,p1_y_currentLocation);
                document.getElementById("p1Score").innerHTML = p1Score; 
            }
            else{
                p1_x_currentLocation = p1_x_currentLocation  + (rand*stepToken) - (3*stepToken);
                drawTokenP1(p1_x_currentLocation,p1_y_currentLocation);
                document.getElementById("p1Score").innerHTML = p1Score; 
            }
            
           
        }
        else{
            
            if(old_p1_score <= p1row*10 && new_p1_score > p1row*10){
                if(p1row%2==0){
                    forwardSteps_p1 = p1row*10-old_p1_score;
                    backwardSteps_p1 = new_p1_score - p1row*10 - 1;
                    p1_x_currentLocation = p1_x_currentLocation - (forwardSteps_p1*stepToken) + (backwardSteps_p1*stepToken);               
                }
                else{
                    forwardSteps_p1 = p1row*10-old_p1_score;
                    backwardSteps_p1 = new_p1_score - p1row*10 - 1;
                    p1_x_currentLocation = p1_x_currentLocation + (forwardSteps_p1*stepToken) - (backwardSteps_p1*stepToken);
                }



                p1_y_currentLocation = p1_y_currentLocation + stepToken;
                drawTokenP1(p1_x_currentLocation,p1_y_currentLocation);
                p1row++;
                document.getElementById("p1Score").innerHTML = p1Score; 
            }
            else{
                if(p1row%2!=0){
                    p1_x_currentLocation = p1_x_currentLocation + (rand*stepToken);
                }
                else{
                    p1_x_currentLocation = p1_x_currentLocation - (rand*stepToken);
                }

                drawTokenP1(p1_x_currentLocation,p1_y_currentLocation);
                document.getElementById("p1Score").innerHTML = p1Score; 
            }
        }
      
       
        
        
        if(p1Score>=50){
            playing=false;
            alert("Player 1 Wins");
            window.location.href = "index.html";

        }
        
    }
   console.log(
    "p1row: " +p1row+ ", p1score: " + p1Score + ", p1x: " + p1_x_currentLocation + ", p1y: " + p1_y_currentLocation + ", rand: " + rand
   );

}, false);
    

//Dice Roll P2
document.getElementById("myP2RollButton").addEventListener("click", function() {
    if (turns == 1){
        var setInitialTurn1 = document.getElementById("arrowShowHideP1");
        var setInitialTurn2 = document.getElementById("arrowShowHideP2");
        var divP2DetailsText = document.getElementById("playersDetailsDiv2");
        divP2DetailsText.style.color = '#9fa09f';  
        var divP1DetailsText = document.getElementById("playersDetailsDiv1");
        divP1DetailsText.style.color = '#fff';  
        setInitialTurn2.style.display = "none";  
        setInitialTurn1.style.display = "block";  
     turns = 0;
    // use builtin random function
    var rand2 = Math.floor(Math.random() * 6) + 1;
    document.getElementById("p2RandNum").innerHTML =  rand2;
        old_p2_score = p2Score;
        //clearTokenP2(p2_x_currentLocation,p2_y_currentLocation);
        clearTokenP2(p2_x_currentLocation,p2_y_currentLocation);
        
    p2Score = p2Score + rand2;
        new_p2_score = p2Score;
        
        
        if (p2Score==6){
            p2Score = p2Score - 3;
            p2_x_currentLocation = (2*stepToken) + xDist;
            //drawTokenP2(p2_x_currentLocation,p2_y_currentLocation);
            drawTokenP2(p2_x_currentLocation,p2_y_currentLocation);
            document.getElementById("p2Score").innerHTML = p2Score;           
        }
        else if ( p2Score==19 || p2Score==29 || p2Score==37 || p2Score==48){
            p2Score = p2Score - 3;
            clearTokenP2(p2_x_currentLocation,p2_y_currentLocation);
            
            // trap check even odd row for backward or forward location of token
           if(p2row%2==0){
                p2_x_currentLocation = p2_x_currentLocation  - (rand2*stepToken) + (3*stepToken);
                drawTokenP2(p2_x_currentLocation,p2_y_currentLocation);
                document.getElementById("p2Score").innerHTML = p2Score; 
            }
            else{
                p2_x_currentLocation = p2_x_currentLocation  + (rand2*stepToken) - (3*stepToken);
                drawTokenP2(p2_x_currentLocation,p2_y_currentLocation);
                document.getElementById("p2Score").innerHTML = p2Score; 
            }
            
        }
        else{
           
           if(old_p2_score <= p2row*10 && new_p2_score > p2row*10){
                if(p2row%2==0){
                    forwardSteps_p2 = p2row*10-old_p2_score;
                    backwardSteps_p2 = new_p2_score - p2row*10 - 1;
                    p2_x_currentLocation = p2_x_currentLocation - (forwardSteps_p2*stepToken) + (backwardSteps_p2*stepToken);               
                }
                else{
                    forwardSteps_p2 = p2row*10-old_p2_score;
                    backwardSteps_p2 = new_p2_score - p2row*10 - 1;
                    p2_x_currentLocation = p2_x_currentLocation + (forwardSteps_p2*stepToken) - (backwardSteps_p2*stepToken);
                }



                p2_y_currentLocation = p2_y_currentLocation + stepToken;
                //drawTokenP2(p2_x_currentLocation,p2_y_currentLocation);
                drawTokenP2(p2_x_currentLocation,p2_y_currentLocation);
                p2row++;
                document.getElementById("p2Score").innerHTML = p2Score;
            }
            else{
                if(p2row%2!=0){
                    p2_x_currentLocation = p2_x_currentLocation + (rand2*stepToken);
                }
                else{
                    p2_x_currentLocation = p2_x_currentLocation - (rand2*stepToken);
                }

                //drawTokenP2(p2_x_currentLocation,p2_y_currentLocation);
                drawTokenP2(p2_x_currentLocation,p2_y_currentLocation);
                 document.getElementById("p2Score").innerHTML = p2Score;
            }

        }
        
         
    
    if (p2Score>=50){
        playing=false;
        alert("Player 2 Wins");
        window.location.href = "index.html";
    }
    }
   console.log(
    "p2row: " +p2row+ ", p2score: " + p2Score + ", p2x: " + p2_x_currentLocation + ", p2y: " + p2_y_currentLocation +  ", rand2: " + rand2
   );
}, false);  
