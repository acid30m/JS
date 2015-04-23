function crbtn(){
	var button = document.createElement('input');
	button.value = '\u2716';
	button.type = 'button';
	button.style.borderRadius = '50%';
	button.className = "remove";
	button.style.width = '10%';
	button.style.height = '5%';				
	button.style.position="relative";
	button.style.right = 0;
	return button;
	}

function opt(){
	var optButtons = document.getElementsByClassName('opt')
	for(var i = 0;i < optButtons.length;i++){
		optButtons[i].state = false;
	}
}

function handleFileSelection(event){
	var nFiles = event.target.files.length;
	if(!document.getElementById('playlist'))
	{
	var list = document.createElement( "ol" );
	list.id = "playlist";
	list.style.overflow = "auto";
	list.style.position = "absolute";
	list.style.display = "none";	
	list.style.top = "110px";
	list.style.left = "15px";
	list.style.height = "300px";
	list.style.width = "250px";
	list.files = new Array;
	for( var i = 0 ; i < nFiles ; i++ ){
		
		var li = document.createElement('li');
		var curFile = event.target.files[i];
		list.files[i] = curFile;
		li.innerHTML = curFile.name;
		li.appendChild(crbtn());
		list.appendChild( li ); 
	}
	document.getElementsByTagName("AUDIO")[0].curFileName = list.files[0].name;
	}
	else{
	var list = document.getElementById('playlist');
	document.getElementsByTagName("AUDIO")[0].curFileName = event.target.files[0].name;
	for( var i = 0 ; i < nFiles ; i++ ){
		
		var li = document.createElement('li');
		var curFile = event.target.files[i];
		list.files[list.files.length + i] = curFile;
		li.innerHTML = curFile.name;
		li.appendChild(crbtn());
		list.appendChild( li ); 
	}
	}
	document.getElementById('player').appendChild(list);
	
	var fr = new FileReader();
	
	
	fr.onload = ( function( eAudio ){ 
		return function ( e ) {
			eAudio.src = e.target.result;
			eAudio.play();
			curSong();
			var time = 	document.getElementById('Time');
			time.max = eAudio.duration;
		}
	})(document.getElementsByTagName("AUDIO")[0]);
	
	
	fr.readAsDataURL( event.target.files[0] );	
	
}


function changeVolume( event ){
	 event.target.nextElementSibling.innerHTML = event.target.value;
	 var audio = document.getElementsByTagName("audio")[0];
	 audio.volume = event.target.value / 100;
}

function changeTime( event ){
	 event.target.nextElementSibling.innerHTML = event.target.value;
	 var audio = document.getElementsByTagName("audio")[0];
	 audio.currentTime = event.target.value;
}

setInterval(
	function(){
		var audio = document.getElementsByTagName("audio")[0];
		var time = 	document.getElementById('Time');
		time.value = audio.currentTime;
	}
,100);

function playPause(){
	var audio = document.getElementsByTagName("audio")[0];
	var butt = document.getElementById('playPause');
	if(!audio.paused){
		audio.pause();
		butt.value = "\u25BA"
	}
	else{
		audio.play();
		butt.value = " \u25E7 "
	}
}

function next(){
	if(document.getElementById('rand').state==true){
		playRand();
		return;
	}
	var files = document.getElementById("playlist").files;
	var audio = document.getElementsByTagName("audio")[0];
	for(var i = 0;i < files.length;i++)
	{
		if(audio.curFileName === files[i].name)
		{
			if(files[i+1]){
				audio.curFileName = files[i+1].name;
				chFile(files[i+1]);
				return;
			}
		}
	}
	
}

function prev(){
	if(document.getElementById('rand').state==true){
		playRand();
		return;
	}
	var files = document.getElementById("playlist").files;
	var audio = document.getElementsByTagName("audio")[0];
	for(var i = 0;i < files.length;i++)
	{
		if(audio.curFileName === files[i].name)
		{
			if(files[i-1]){
				audio.curFileName = files[i-1].name;
				chFile(files[i-1]);
				return;
			}
		}
	}
}


function autoSelect(){
	var files = document.getElementById("playlist").files;
	var audio = document.getElementsByTagName("audio")[0];
	if(document.getElementById('rand').state==true){
		playRand();
		return;
	}
		for(var i = 0;i < files.length;i++)
		{
			if(audio.curFileName === files[i].name)
			{
			if(files[i+1]){
				audio.curFileName = files[i+1].name;
				chFile(files[i+1]);
				return;
			}
			}
		}
		if(audio.curFileName == files[files.length - 1].name && document.getElementById('repeat').state==true)
		{
			audio.curFileName = files[0].name;
				chFile(files[0]);
				return;
		}
	
}


function checkClick(event){
	if(event.target.className == 'opt'){
		var playlist = document.getElementById("playlist");
		if(event.target.state == false){
			event.target.style.backgroundColor = 'black';
			event.target.style.color = 'orange';
			event.target.state = true;
			if(playlist && event.target.id == "open"){
				playlist.style.display = "block";
				document.getElementById("player").style.height = "430px";
			}
		}
		else{
			event.target.style.backgroundColor = 'rgb( 0 , 40 , 75)';
			event.target.style.color = 'white';
			event.target.state = false;
			if(playlist && event.target.id == "open"){
				playlist.style.display = "none";
				document.getElementById("player").style.height = "120px";
			}
		}
	}
	if(event.target.className == 'remove'){
		var files = document.getElementById("playlist").files;
		var li = event.target.parentNode;
		event.target.remove();
		var fileName = li.innerHTML;
		var cntr;
		li.remove();
		for(var i = 0;i < files.length;i++){
			if(files[i].name == fileName ){
				cntr = i;
			}
		}
		if(document.getElementsByTagName("AUDIO")[0].curFileName == fileName){
			if(files[cntr + 1]){
				document.getElementsByTagName("AUDIO")[0].curFileName = files[cntr + 1].name;
				chFile(files[cntr + 1]);
			}
			else if(files[cntr - 1]){
				document.getElementsByTagName("AUDIO")[0].curFileName = files[cntr - 1].name;
				chFile(files[cntr - 1]);
			}
			else{
				document.getElementsByTagName("AUDIO")[0].curFileName = " ";
			}
		}
		files = files.splice( cntr, 1);	
	}
}


function curSong(){
	var p = document.getElementById('curSong');
	var src = document.getElementsByTagName('audio')[0];
	p.innerHTML = src.curFileName;
}


function chFile(file){
	var fr = new FileReader();				
	
	fr.onload = ( function( eAudio ){ 
		return function ( e ) {
			eAudio.src = e.target.result;
			eAudio.play();
			curSong();
			var time = 	document.getElementById('Time');
			time.max = eAudio.duration;
		}
	})(document.getElementsByTagName("AUDIO")[0]);
	
	
	fr.readAsDataURL( file );	

}


function playRand(){
	var files = document.getElementById("playlist").files;
	var cntr = Math.floor(Math.random() * (files.length - 1) + 1);
	chFile(files[cntr]);
	document.getElementsByTagName('audio')[0].curFileName = files[cntr].name;
}

function showlist(){
	
	if(playlist){
		
	}
}










