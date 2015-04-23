var keys = {
	w:false,
	s:false,
	up:false,
	down:false
}


function create(posX,posY,sizeX,sizeY){
		var check = document.getElementById('Field');
		if(check){
			return;
		}
		var field = document.createElement('div');
		field.id = 'Field';
		field.style.width = sizeX + "px";
		field.style.height = sizeY + "px";
		field.style.position = 'absolute';
		field.style.top = (posY) + "px";
		field.style.left = (posX) + "px";
		field.style.border = "1px solid black";
		var racket1 = document.createElement('div');
		racket1.id = "racket1";
		racket1.style.position = 'absolute';
		racket1.style.left = '10px';
		racket1.style.top = '190px';
		racket1.style.width = '10px';
		racket1.style.height = '70px';
		racket1.style.transition = 'all 0.1s linear 0s';
		racket1.style.backgroundColor = 'black';		
		var racket2 = document.createElement('div');
		racket2.id = "racket2";
		racket2.style.position = 'absolute';
		racket2.style.width = '10px';
		racket2.style.height = '70px';
		racket2.style.right = '10px';
		racket2.style.top = '190px';
		racket2.style.transition = 'all 0.1s linear 0s';
		racket2.style.backgroundColor = 'black';
		var count = document.createElement('div');
		count.style.width = "15%";
		count.style.height = "5%";
		count.style.position = 'absolute';
		var ul = document.createElement('ul');
		ul.style.position = 'absolute';
		ul.style.width = '20%';
		ul.style.left = '35%';
		ul.style.display = 'block';
		ul.style.textAlign = 'center';
		var li1 = document.createElement('li');
		li1.id = 'count1';
		li1.innerHTML = '0';
		li1.style.display = 'inline';
		li1.style.border = '1px solid black';
		var li2 = document.createElement('li');
		li2.innerHTML = '0';
		li2.id = 'count2';
		li2.style.display = 'inline';
		li2.style.border = '1px solid black';
		var ball = document.createElement('div');
		ball.id = 'Ball';
		ball.style.width = '20px';
		ball.style.height = '20px';
		ball.style.borderRadius = '50%';
		ball.style.background = 'black';
		ball.style.position = 'absolute';
		ball.style.top = '205px';
		ball.style.left = '390px';
		ball.style.transition = 'all 0.1s linear 0s';
		ball.isRunning = 'false';
		ul.appendChild(li1);		
		ul.appendChild(li2);	
		field.appendChild(ul);
		field.appendChild(ball);
		field.appendChild(racket1);
		field.appendChild(racket2);
		var body = document.getElementById("parent");
		body.appendChild(field);		
};

function start(event){
	var eBall = document.getElementById("Ball");
		if(event.which === 32 && eBall.isRunning === 'false'){
				eBall.style.top = '205px';
				eBall.style.left = '390px';
				eBall.isRunning = 'true';
				eBall.xStep = Math.round( Math.random() * 10 + 10 );
				eBall.yStep = Math.round( Math.random() * 10 + 10 );
				
				eBall.xStep *= ( Math.round( Math.random() * 10 ) % 2 ) ? 1 : -1;
				eBall.yStep *= ( Math.round( Math.random() * 10 ) % 2 ) ? 1 : -1;
				eBall.intID = setInterval( moveBall , 100 );
		}
		if(event.which !== 32){
		var racket1 = document.getElementById("racket1");
		var racket2 = document.getElementById("racket2");
		var eField = racket1.parentElement;
		var yFieldBttm	= eField.offsetHeight;
		switch(event.which)
		 {
			 
			 case 83:
			 {
				keys.w = true;				
			 }
			 break;
			 case 87:
			 {
				keys.s = true;				
			 }
			 break;
			  case 40:
			 {
				keys.up = true;
			 }
			 break;
			 case 38:
			 {
				keys.down = true;				
			 }
			 break;
		 }
		
	 }
}

function keysUp(event){
	switch(event.which)
		 {
			 
			 case 83:
			 {
				keys.w = false;				
			 }
			 break;
			 case 87:
			 {
				keys.s = false;				
			 }
			 break;
			  case 40:
			 {
				keys.up = false;
			 }
			 break;
			 case 38:
			 {
				keys.down = false;				
			 }
			 break;
		 }
}

function moveBall(){
	
	var eBall = document.getElementById("Ball");
	var racket1 = document.getElementById("racket1");
	var racket2 = document.getElementById("racket2");
	
				var xBall_cur		= eBall.offsetLeft;
				var yBall_cur		= eBall.offsetTop;
				var cxBall_width	= eBall.offsetWidth;
				var cyBall_height	= eBall.offsetHeight;
				
				var eField = eBall.parentElement;
				var xFieldLeft		= 0;
				var xFieldRight	= xFieldLeft + eField.offsetWidth;
				var yFieldTop		= 0;
				var yFieldBttm	= yFieldTop + eField.offsetHeight;
				
				
				
				var xBall_new = xBall_cur + eBall.xStep;
				var yBall_new = yBall_cur + eBall.yStep;
								
				
				var rightR = parseInt(racket1.style.left) + parseInt(racket1.style.width);
				var bottomR = parseInt(racket1.style.top) + parseInt(racket1.style.height);
				if(xBall_new <= rightR && yBall_new > parseInt(racket1.style.top) && yBall_new < (bottomR - cxBall_width))
				{
					xBall_new = rightR;			
					eBall.xStep *= -1;	
				}
				
				
				if( xBall_new <= xFieldLeft ){	
					xBall_new = xFieldLeft;			
					eBall.xStep *= -1;		
					eBall.isRunning = 'false';	
					document.getElementById('count2').innerHTML = (+document.getElementById('count2').innerHTML + 1)
					clearInterval(eBall.intID);
					check();
				}
				var leftL = xFieldRight - parseInt(racket2.style.right) - parseInt(racket2.style.width);
				var bottomL = parseInt(racket2.style.top) + parseInt(racket2.style.height);
				if(( xBall_new + cxBall_width ) >= leftL && yBall_new > parseInt(racket2.style.top) && yBall_new < (bottomL - cxBall_width))
				{
					xBall_new = leftL - cxBall_width;			
					eBall.xStep *= -1;
				}
				if( ( xBall_new + cxBall_width ) >= xFieldRight ){
					xBall_new = xFieldRight - cxBall_width;		
					eBall.xStep *= -1;							
					eBall.isRunning = 'false';	
					document.getElementById('count1').innerHTML = (+document.getElementById('count1').innerHTML + 1)
					clearInterval(eBall.intID);
					check();
				}
					
				
				if( yBall_new <= yFieldTop ){	
					yBall_new = yFieldTop;			
					eBall.yStep *= -1;				
				}
				
				if( ( yBall_new + cyBall_height ) >= yFieldBttm ){	
					yBall_new = yFieldBttm - cyBall_height;			
					eBall.yStep *= -1;								
					
				}
				
				eBall.style.left = xBall_new +"px";
				eBall.style.top  = yBall_new +"px";
				
	
	if(keys.w == true && keys.s == false){
		var bottom = parseInt(racket1.style.top) + parseInt(racket1.style.height);
				if(bottom + 10 < yFieldBttm){
					racket1.style.top = (parseInt(racket1.style.top) + 10) + "px";
				}
				else if(bottom + 10 > yFieldBttm)
				{
					racket1.style.top = (yFieldBttm - racket1.style.height) + "px";
				}
	}
	
	if(keys.w == false && keys.s == true){
		var top = parseInt(racket1.style.top);
				if(top - 10 > 0){
					racket1.style.top = (parseInt(racket1.style.top) - 10) + "px";					
				}
				else if(top - 10 < 0)
				{
					racket1.style.top = "0px";
				}
	}
	
	if(keys.up == true && keys.down == false){
		var bottom = parseInt(racket2.style.top) + parseInt(racket1.style.height);
				if(bottom + 10 < yFieldBttm){
					racket2.style.top = (parseInt(racket2.style.top) + 10) + "px";
				}
				else if(bottom + 10 > yFieldBttm)
				{
					racket2.style.top = (yFieldBttm - racket2.style.height) + "px";
				}
	}
	
	if(keys.up == false && keys.down == true){
		var top = parseInt(racket2.style.top);
				if(top - 10 > 0){
					racket2.style.top = (parseInt(racket2.style.top) - 10) + "px";					
				}
				else if(top - 10 < 0)
				{
					racket2.style.top = "0px";
				}
	}
	
}

function check(){
	var c1 = document.getElementById('count1');
	var c2 = document.getElementById('count2');
	if(c1.innerHTML == 3 || c2.innerHTML == 3)
	{
	if(c1.innerHTML == 3)
	{
		c1.innerHTML = 'player1 ';
		c2.innerHTML = ' wins!';
	}
	if(c2.innerHTML == 3)
	{
		c1.innerHTML = 'player2 ';
		c2.innerHTML = ' wins!';
	}
	var button1 = document.createElement('input');
	var button2 = document.createElement('input');
	button1.type = 'button';
	button1.value = 'Play again';
	button2.type = 'button';
	button2.value = 'Quit';
	button2.onclick = function(){
		document.getElementById("Field").remove();
	};
	button1.onclick = function(){
		document.getElementById('Field').remove();
		create(100,100,800,400);
	};
	var field = document.getElementById("Field");
	field.appendChild(button1);
	field.appendChild(button2);
	}
}



