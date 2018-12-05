fetch('https://anapioficeandfire.com/api/characters?pageSize=50&page=12')
    .then(result => result.json())
  .then((res) => {
	console.log("reached before res");
    gameCharacter(res);

	
	console.log("reached after res");
  })
.catch(err => console.log(err))


function gameCharacter(mycards) {
    var details = document.getElementById('cards');
    var j=0;
    var selectid =0;
    for (var i=16 ; i < 26 ; i++)
    {
        j++;
        if(j>10)
            j=1;
        selectid = "myselect"+j;
        details.innerHTML += "<div class=' [  col-sm-3 ] ' style=' padding: 10px; '><div class=' [ card my-card ] '><div class='card-header'><b> " + mycards[i].name +  "</b></div><div class='card-body'><div> <img class= ' [ my-card-image ] ' src='../image/characters/character" + j + ".jpg'></div><div class='text-left'><div><b>Gender:</b> " + mycards[i].gender + " </div><div><b>Title:</b> " + mycards[i].titles[0] + "</div></div></div><div class='card-footer '><label class='form-check-label'><input type='checkbox' value='character"+j+"' class=' [ form-check-input ]' id='myselect"+j+"' onclick='checkMinMaxTwo("+selectid+");'><span class=' text-uppercase'>SELECT PLAYER</span></label></div></div></div>";
     }   
}

function myFunction(){
    
    if(selectedPlayerArray.length === 2){
        selectedPlayerArray
        
        var str = "canvas_game.html?id=";
    }
    else{
        alert("Please choose two players to go next page.");
    }
    
    
   if(myselect1.checked){
        console.log("checked");
   }
    else{
        console.log("unchecked");
    }
    
    
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


       //Hide Div Function
function myFunction2(){
    var x = document.getElementById("divHide");
    var y = document.getElementById("divShow");
    x.style.display = "none";
    y.style.display = "block";
    
}
