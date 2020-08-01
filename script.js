//define variable
var history_result=[];
function getHistory(){
    return document.getElementById("history-value").innerText;
}
function printHistory(num){
  
    document.getElementById("history-value").innerText=num;
    
}
function getOutput(){
    return document.getElementById("output-value").innerText;
}
function printOutput(num){
    if(num == ""){
        document.getElementById("output-value").innerText = " ";
    }
    else{ 
    document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}
function printHistoryMemory(history_result){
   // var getHistory_result = sessionStorage.getElementById("history");  
    var id = history_result.length - 1;
        createOutputTag(id);
        document.getElementById("output-history" + id ).innerText= history_result[id][0];
        document.getElementById("output-result" + id).innerText=history_result[id] [1];

    



}

function getFormattedNumber(num){
    //get the number formatted with comma 
    var n=Number(num);
    var value=n.toLocaleString("en");
    return value;
}
function reverseNumberFormatter(num){
    return Number(num.replace(/,/g,''));
}
var operator = document.getElementsByClassName("operator");
for(var i=0; i<operator.length; i++){
    operator[i].addEventListener("click",function(){
        if(this.id == "clear"){       
            printOutput("");
            printHistory("");
           
        }
         if(this.id == "backspace"){
         var output =reverseNumberFormatter(getOutput()).toString();
         if(output){
             output = output.substr(0,output.length-1);//extracts character from string
             printOutput(output);
         }
        }
        else{
            var output = getOutput();
            var history = getHistory();
            
            if(output!=""){
                output=reverseNumberFormatter(output);
                history =history + output ;
                if (this.id == "="){
                var result = eval(history);
                history = history + "=";
                printOutput(result);
                printHistory(history);
                saveCalculation(history,result);
                }
            
            else{
                
                history = history + this.id;
                printHistory(history);
                printOutput("");
            }
        }
        }
        
    })
}
var numbers = document.getElementsByClassName("number");
for(var i=0; i< numbers.length ; i++){
    numbers[i].addEventListener("click",function(){ 
        var output=reverseNumberFormatter(getOutput());
       if(output != NaN ){
            //if output is a number
            var history = getHistory();
            if (history.slice(-1) == "="){
                printHistory("");
                printOutput("");
                output ="";
            }
           output = output + this.id;
            printOutput(output);
        }
    })
}


function saveCalculation(history,result){
    history_result.push([history,result]);
   // sessionStorage.setItem("history",history_result);
   printHistoryMemory(history_result);
    

}

function createOutputTag(id){

    
    var div1=document.createElement('div');
   
    var p1 = document.createElement('p');
    var p2 = document.createElement('p');


   div1.id = "output" + id
   p1.id = "output-history" +  id ;  
   p2.id = "output-result" +  id ;

   div1.className ="divhover";
   
   p1.className = "outputhistory";
   p2.className = "outputresult";




  document.getElementById("history-previous").prepend(div1);
   document.getElementById("output" + id).prepend(p2);
   document.getElementById("output" + id).prepend(p1);


   div1.onclick = function(){ 
       printHistory("");
       printOutput("");
       printHistory(div1.firstChild.innerHTML);
      printOutput(div1.lastChild.innerHTML);
   }

}
function deleteHistory(){
    history_result = [];
    document.getElementById("history-previous").innerHTML = "";
}

// var selectedDiv = document.getElementsByClassName("divhover");
// alert("selectedDiv" + selectedDiv.length);
// for(var i = 0;i < selectedDiv.length - 1; i++){
//     selectedDiv[i].addEventListener("click",function(){
//         alert("hi");
//         printHistory("");
//         printOutput("");
//         printHistory(document.getElementById("output-history" + i));
//         printOutput(document.getElementById("output-result"+ i));
//     })
// }