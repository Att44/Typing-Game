  
 var time = document.querySelector('.timer');
 var button = document.querySelector("button");
 var words = document.querySelector(".words");
 var timerDiv = document.querySelector(".timer");
 var scoreDiv = document.querySelector(".score");
 var points = 0;
 var spans;
 var typed;
 var seconds = 20;
 var ding = new Audio("Ding.mp3");
 var soundtrack = new Audio("Soundtrack.mp3")

 	function countdown() {
 		points = 0;
 		var timer = setInterval(function(){
 			button.disabled = true;
    		seconds--;
    		time.innerHTML = seconds;
    		if (seconds === 0) {
          soundtrack.pause();
    			alert("Game over! Your score is " + points);
    			scoreDiv.innerHTML = "0";
    			words.innerHTML = "";
    			button.disabled = false;
    			clearInterval(timer);
    			seconds = 20;
    			timerDiv.innerHTML = "20";
    			button.disabled = false;	
    		}
 		}, 1000);
  	}

  	function random() {
  		words.innerHTML = "";
  		var random = Math.floor(Math.random() * (50 - 0 + 1)) + 0;
  		var wordArray = list[random].split("");
  		for (var i = 0; i < wordArray.length; i++) { 
  			var span = document.createElement("span");
  			span.classList.add("span");
  			span.innerHTML = wordArray[i];
  			words.appendChild(span);
  		}
  		spans = document.querySelectorAll(".span");
  	}


  	const list = ['ADVENTURE','ADVICE','AFFECT','AFRAID','AFTER','AFTERNOON','AGAIN','AGAINST','AGE',
  'WIRE','WISE','WISH','WITHIN','WITHOUT','WOLF','WOMEN',
  'WON','WONDER','WONDERFUL','WOOD','WOODEN','WOOL','WORD','WORE',
  'WORK','WORKER','WORLD','WORRIED','WORRY','WORSE','WORTH','WOULD',
  'WRAPPED','WRITE','WRITER','WRITING','WRITTEN','WRONG','WROTE','YARD',
  'YEAR','YELLOW','YES','YESTERDAY','YET','YOU','YOUNG','YOUNGER',
  'YOUR','YOURSELF','YOUTH','ZERO','ZOO'];
      
  	button.addEventListener("click", function(e){
  		countdown();
  		random();
  		button.disabled = true;
      soundtrack.play();

  	});


  	function typing(e) {
  			typed = String.fromCharCode(e.which);
  			for (var i = 0; i < spans.length; i++) {
  				if (spans[i].innerHTML === typed) { 
  					if (spans[i].classList.contains("hightlight")) { 
  						continue;
  					} else if (spans[i].classList.contains("hightlight") === false && spans[i-1] === undefined || spans[i-1].classList.contains("hightlight") !== false ) { // if it dont have class, if it is not first letter or if the letter before it dont have class (this is done to avoid marking the letters who are not in order for being checked, for example if you have two "A"s so to avoid marking both of them if the first one is at the index 0 and second at index 5 for example)
  						spans[i].classList.add("hightlight");
  						break;
  					}
  				}
  			}
  			var checker = 0;
  			for (var j = 0; j < spans.length; j++) { 
  				if (spans[j].className === "span hightlight") {
  					checker++;
  				}
  				if (checker === spans.length) { 
            				ding.pause();
					ding.currentTime = 0;
          				ding.play();
  					points++; 
  					scoreDiv.innerHTML = points;
  					document.removeEventListener("keydown", typing, false);
  					setTimeout(function(){
  						words.className = "words"; 
  						random(); 
  						document.addEventListener("keydown", typing, false);
  					}, 400);
  				}

  			}
  	}

  	document.addEventListener("keydown", typing, false);
