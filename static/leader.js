window.onload=function()
{
	l=document.getElementById("leaders");
	for(var i in window.localStorage)
	{
		player=JSON.parse(localStorage[i]);
		score=player.turns;
		l.appendChild(score);
		

	}

}