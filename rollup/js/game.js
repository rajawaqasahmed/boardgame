//var canvas = document.getElementById("gameCanvas");

var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext('2d');



  // Draw traps
  ctx.drawImage(document.getElementById('imgSnake'), (30*5),0);//no6
  ctx.drawImage(document.getElementById('imgSnake'), (30*1),30);//no19
  ctx.drawImage(document.getElementById('imgSnake'), (30*8),30+30);//no29
  ctx.drawImage(document.getElementById('imgSnake'), (30*3),30+30+30);//no37
  ctx.drawImage(document.getElementById('imgSnake'), (30*7),30+30+30+30);//no48
   


  
if(canvas.getContext){
  
    // traps draw
    
  
    
    
    var xvalue=0;
    var yvalue=0;
    var step=30;
    var dig = 1;

    
    
    
    
    
    
    var squares = canvas.getContext("2d");    
    var digits = canvas.getContext("2d");    
    var traps = canvas.getContext("2d");    
    //var imageContext = canvas.getContext("2d");    
    
    
    
  digits.font = 'bold 18px Arial';
  digits.textAlign = 'center';
  digits.textBaseline = 'middle';
  digits.fillStyle = '#48d12c';
 
  //imageContext.drawImage(imgSnake, 10+(30*5),10);
    

    for(var y=0; y<=4; y++){
        for(var x=0; x<10; x++){ 
          //Traps Hide Text
            if (dig!=7 || dig!=19 || dig!=29 || dig!=37 || dig!=48){
                
            }
            

            
            
            
            // boxes and number background of game
            if(y%2==0)
                {
                    squares.strokeRect(xvalue,yvalue,30,30);
                    //Traps Hide Text
                    if (dig==6 || dig==19 || dig==29 || dig==37 || dig==48){}
                    else
                        digits.fillText(dig, xvalue+15, yvalue+15);
                    
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
                    digits.fillText(dig, xvalue+15, yvalue+15);
                   dig++;
               }
        }
        yvalue = yvalue+30;
    }  
}
else{
	alert('Your browser doesnt support HTML canvas please upgrade it');
}