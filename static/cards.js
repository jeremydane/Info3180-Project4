window.onload=function()
{
	$('#player').hide();
	var MOVES=24;

	var createDeck = function() 
	{
	// based on code from http://www.brainjar.com/js/cards/default2.asp
	  var ranks = ["J", "D", "F"];
	  var suits = ["P", "I", "R", "A","T","E"];
	  var j, k, index=0;
	  var pack_size;

	  // Set array of cards.
	  // total number of cards
	  pack_size = 2*(ranks.length * suits.length);
	  var cards = [];
	  

	  // Fill the array with 'n' packs of cards.
	  while (index < pack_size)
	  {
	    for (j = 0; j < suits.length; j++)
	    {
	       for (k = 0; k < ranks.length; k++)
	       {
		  		//console.log("k:",k,"index:",index);
		  		cards[index] = {rank:ranks[k], suite:suits[j]};
		  		index++;
		}
	     }
	   }
	  //console.log(cards.length);
	  return cards;
	}


//shuffle cards
	var shuffle= function(n) 
	{
	  var i, j, k;
	  var temp;

	  // Shuffle the stack 'n' times.
	  this.cards=createDeck();
	  for (i = 0; i < n; i++)
	  {
	    for (j = 0; j < this.cards.length; j++) 
	     {
	      k = Math.floor(Math.random() * this.cards.length);
	      temp = this.cards[j];
	      this.cards[j] = this.cards[k];
	      this.cards[k] = temp;
	    }
	  }
	  return this.cards	
	}

	var showCards = function(cardJSON) 
	{	
		var sym
		if (cardJSON.suite=="P")
		{
			sym="\u2694";
		
		}
		if (cardJSON.suite=="I")
		{
			sym="\u265E";
		}
		if (cardJSON.suite=="R")
		{
			sym="\u2654";  
		}
		if (cardJSON.suite=="A")
		{
			sym="\uE023";
		}
		if (cardJSON.suite=="T")
		{
			sym="\u2693";
		}
		if (cardJSON.suite=="E")
		{
			sym="\u2388";
		}
		flip = document.createElement("div");
		flip.className='flip';
		document.querySelector(".sideBox").appendChild(flip);

		txt = cardJSON.rank + sym;    
		card = document.createElement("div");
		card.textContent = txt;
		card.className = "card";
		
		document.querySelector(".flip").appendChild(card);

		console.log(card);			
	}

	var showDeck = function(deck)
	{
	    var idx;
	    for (idx = 0; idx < deck.length; ++idx)
	   {
		    console.log("Creating your deck....",deck[idx]);
		    showCards(deck[idx]);		    
	    }
	}

	var prelim = function()
	{
		
   		mode=0;
				
		if ( document.getElementById('myRadioId1').checked ) 
		{
			mode = 1;
			//solo();		
		}
		if ( document.getElementById('myRadioId2').checked ) 
		{
			mode = 2;
			//duo(4);
		}
		if ( document.getElementById('myRadioId3').checked ) 
		{
			mode = 3;
			//duo(5);
		}

		
		if (mode==1)
		{
		 	players=solo(1);
		}
		else
		{
			//alert("2 players");

		 	if (mode==2)
			{
		 		players=duo(4);
		 	}
			if (mode==3)
		 	{
		 		players=duo(5);
		 	}
		
		}
		return mode;	
		//$('#start').hide();
		
		//$('#deck').show();
		//document.getElementById('sign').innerHTML =player;
		//$('#start').show();
		//startGame();
	}

	

	var gameScreen = function()
	{
		//var go= document.getElementById('go');		
		//go.parentNode.removeChild(go);
		$('#go').hide();
		$('#heading').hide();

		//var head= document.getElementById('heading');
		//head.parentNode.removeChild(heading);
		
		var start= document.getElementById('start');
		start.style.cssFloat="right";
		start.style.fontSize='5px';

		var JDF= document.getElementById('JDF');
		JDF.parentNode.removeChild(JDF);
		
	}
	
	var arrangeCards = function()
	{
		var deck = document.getElementById('deck');
		size=deck.children.length;

		for (i=0; i<size; i++)
		{
			document.getElementsByClassName("card")[i].id="card"+i;
		}

		for (x=0; x<size; x++)
		{
			var c= document.getElementById("card"+x);	
			document.getElementsByClassName("flip")[x].appendChild(c);
		}
		
		for (j=0; j<size; j++)
		{
			var back= document.createElement("div");
			back.className = "face back";			
			var front= document.createElement("div");
			front.className = "face front";	


			document.getElementById("card"+j).appendChild(back);
			document.getElementById("card"+j).appendChild(front);
			
		}
	}
	
	var duo=function(type)
	{
		MOVES=100000;
		p1 = window.prompt('Player1:'); 
		//localStorage["player1"]= p1.toString();
		localStorage["player1"]= p1;
		
		p2 = window.prompt('Player2:');
		localStorage["player2"]= p2;

		players=[p1,p2].toString();

		console.log(players);
		//return 	players	
		$('#start').hide();
		
		$('#deck').show();
		document.getElementById('sign').innerHTML =p1+" vs "+p2;
		//for (i=0; i<2; i++)

		startGame(2,type);
		
		$('#start').show();
		//return type;
	}
	var solo=function()
	{
		p1 = window.prompt('Player1:'); 
		localStorage["player1"]= p1;
		
		player=[p1];
		//return player;
		$('#start').hide();
		
		$('#deck').show();
		document.getElementById('sign').innerHTML =player;
		
		startGame(1, 0);

		$('#start').show();	
		//return 0;	
	}
	
	function gameMode()
	{
		var radio1 = document.createElement('input');
		radio1.id = 'myRadioId1';
		radio1.type = 'radio';
		radio1.name = 'radioGroup';
		radio1.value = 'someValue1';

		var radio2 = document.createElement('input');
		radio2.id = 'myRadioId2';
		radio2.type = 'radio';
		radio2.name = 'radioGroup';
		radio2.value = 'someValue2';

		var radio3 = document.createElement('input');
		radio3.id = 'myRadioId3';
		radio3.type = 'radio';
		radio3.name = 'radioGroup';
		radio3.value = 'someValue3';

		var label1 = document.createElement('label');
		label1.htmlFor = radio1.id;
		label1.innerHTML = 'single player';

		var label2 = document.createElement('label');
		label2.htmlFor = radio2.id;
		label2.innerHTML = 'two player';

		var label3 = document.createElement('label');
		label3.htmlFor = radio3.id;
		label3.innerHTML = 'two player network play';

		var container = document.getElementById('mode');
		container.appendChild(radio1);
		container.appendChild(label1);
		container.appendChild(radio2);
		container.appendChild(label2);
		container.appendChild(radio3);
		container.appendChild(label3);
	}
	
	var startGame = function(num, type)
	{	
		$('#mode').hide();
		resume();
		
		if (num=1)
		{	
			gameScreen(num);
			
			arrangeCards();
			$('#save').show();
			$('#cardsPic').hide();
			
			var play=true;
			var clk=0;
			var stk=[];

			$('#start').hide();
					
			cardClick(clk, stk);
		}
		if (num=2)
		{	
			gameScreen(num);
			
			arrangeCards();
			$('#save').show();
			$('#cardsPic').hide();
			
			var play=true;
			var clk=0;
			var stk2=[1][0];			

			$('#start').hide();
					
			cardClick2(clk, stk2);
		}
	
		
	}


	var resume = function()
	{
		for(var i in window.localStorage)
		{
   			val = localStorage.getItem(i); 
   			value = val.split(","); //splitting string inside array to get name
   			//name[i] = value[1]; // getting name from split string

   			/// need to find name and return the card positions
   			console.log(i);
		}
	}
        
	var cardClick = function(clk, stk)
	{	
		$('.card').click(function()
		{
			
			
			var flip=document.getElementById('flipsound');
			flip.play();
		
			clk++;			
			card=$(this);
			
			turns= Math.floor(clk/2);
			console.log(turns);
			if (turns<=MOVES)
			{
				localStorage["turns"]= turns.toString() ;
			
				document.getElementById('turnValue').innerHTML =turns;
			
	    		card.addClass('flipped');
				playing(card, stk);	
			}
			else
			{
				turns=0;
				alert("GAMEOVER");
				$('#start').hide();
				prelim();
			}
			
			
			
			  		     
			
		});
		
		
		
	}
	var cardClick2 = function(clk, stk2)
	{	
		$('.card').click(function()
		{
			p1=localStorage["player1"]
			p2=localStorage["player2"]
			for (i=1; i<=2;i++)
			{
			
				var flip=document.getElementById('flipsound');
				flip.play();
			
				clk++;			
				card=$(this);
				
				turns[i]= Math.floor(clk/(2*i));

				console.log(turns[i]);

				localStorage["turns"+i]= turns[i] ;
				
				document.getElementById('turnValue').innerHTML =[p1,turns[1]];
				document.getElementById('turnValue2').innerHTML =[p2,turns[2]];
				
		    	card.addClass('flipped');
				playing(card, stk2);	
			}

		});	
		
	}

	

	var  playing = function(card, stk)
	{

		type=card[0].textContent;
		//id=card[0].id;
		e=card;
		stk.push({element:e,type:type});
		
		faces=[];
		if (stk.length>1)
		{
			x=stk[0].type;
			y=stk[1].type;
			faces.push(x);
			faces.push(y);
			

			//a=stk[0].id;
			//b=stk[1].id;
			
			if (paired(faces))
			{					
									
				//document.getElementById(a).addClass("matched");
				//document.getElementById(b).addClass("matched");

				stk[1].element.addClass("matched");
				stk[0].element.addClass("matched");

				var same=document.getElementById('match');
				same.play();
				
				faces.pop();
				faces.pop();	

			}
			else
			{	
				//document.getElementById("card1").addClass("flip");
				//document.getElementById("card2").addClass("flip");
				for (i=0;i<2;i++)
				{	
					stk[i].element.removeClass("flipped");
					
				}
				stk.pop();
				stk.pop();
			}

		}		
	}

	

	var paired = function(stk)
	{
		if (stk[0]==stk[1])
		{
			
			return true;	
		}
		else
		{
			return false;			
		}
	}

	var saveGame = function()
	{
		alert("Saving Game");
		//var deck = $("deck").childNodes;
		user1=localStorage["player1"];
		user2=localStorage["player2"];
		turns= localStorage["turns"];
		game= $('#deck').html();
		console.log(game);
		//console.log($('#deck'));
		//console.log($('#deck')[0].html());
		//localStorage["game"]= JSON.stringify(html());
		//localStorage.setItem('game', game);

		//console.log($("#deck").html()));
		//console.log(JSON.parse(game));

		//console.log($('#deck').getElementsByClassName("card"));
		//console.log($('#deck').getElementsByClassName("cards"));


		localStorage[user1+""]= JSON.stringify({name: [user1,user2], turns: turns, game: game});
	}

	var deck = shuffle(40);
	var num=0;			//number of players
	$('#deck').hide();
	showDeck(deck);
	$('#start').hide();
	$('#save').hide();	
	
	//document.getElementById('multi').onclick=prelim;
	//document.getElementById('start').onclick=prelim;
	
	$('#start').click(function()
	{
		$('#mode').hide();
		gameMode();
		//document.getElementById('myRadioId1').checked 
		mode= prelim();
		$('#multi').hide()
		if (mode=0)
		{
			$('#mode').hide();
			solo(0);
		}
	});
	$('#multi').click(function()
	{
		
		//$('#start').hide();
		gameMode();
		mode= prelim();
		
		//mode= prelim();
		$('#multi').hide();
		$('#start').show();
		$('#start').click(function()
		{
			$('#mode').hide();
			duo(mode);
		});
		
		
	});
	//event.preventDefault();
	document.getElementById('save').onclick=saveGame;
	
	 
}


