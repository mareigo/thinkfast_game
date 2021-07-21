var bilderSets = [
	["images/Farbe/blau.jpg", "images/Farbe/schrift/blau.jpg", "images/Farbe/schrift/weiss.jpg", "images/Farbe/schrift/rot.jpg"],
	["images/Farbe/braun.jpg", "images/Farbe/schrift/braun.jpg", "images/Farbe/schrift/gruen.jpg", "images/Farbe/schrift/gelb.jpg"],
	["images/Farbe/gelb.jpg", "images/Farbe/schrift/gelb.jpg", "images/Farbe/schrift/lila.jpg", "images/Farbe/schrift/schwarz.jpg"],
	["images/Farbe/gruen.jpg", "images/Farbe/schrift/gruen.jpg", "images/Farbe/schrift/rosa.jpg", "images/Farbe/schrift/weiss.jpg"],
	["images/Farbe/lila.jpg", "images/Farbe/schrift/lila.jpg", "images/Farbe/schrift/orange.jpg", "images/Farbe/schrift/schwarz.jpg"],
	["images/Farbe/orange.jpg", "images/Farbe/schrift/orange.jpg", "images/Farbe/schrift/blau.jpg", "images/Farbe/schrift/rosa.jpg"],
	["images/Farbe/rosa.jpg", "images/Farbe/schrift/rosa.jpg", "images/Farbe/schrift/weiss.jpg", "images/Farbe/schrift/rot.jpg"],
	["images/Farbe/rot.jpg", "images/Farbe/schrift/rot.jpg", "images/Farbe/schrift/gruen.jpg", "images/Farbe/schrift/braun.jpg"],
	["images/Farbe/schwarz.jpg", "images/Farbe/schrift/schwarz.jpg", "images/Farbe/schrift/lila.jpg", "images/Farbe/schrift/orange.jpg"],
	["images/Farbe/weiss.jpg", "images/Farbe/schrift/weiss.jpg", "images/Farbe/schrift/braun.jpg", "images/Farbe/schrift/schwarz.jpg"],
   ];
   

var richtigesBild = 0;
var geschafft= null;
var ziel = 10;
var gesamtzeit = 0;
var startzeit;


window.onload=musikAbspielen;
function musikAbspielen() {
	var bgsound = document.getElementById("soundTheme"); 
	    bgsound.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);	    
bgsound.play();
}

function musikAbspielenGame() {
	var bgsound = document.getElementById("soundGame"); 
	    bgsound.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);	    
bgsound.play();
}

function musikAnAus(){
	muteSound("soundTheme");
	muteSound("soundGame");
	muteSound("soundHighscore");
	muteSound("soundWrong");
	muteSound("soundButton");
	muteSound("soundGameover");
}

function muteSound(soundName){
 var sound = document.getElementById(soundName);
 sound.muted = !sound.muted;
}

function neuesSpiel() {
	startzeit = performance.now();
	gesamtzeit = 0;
	geschafft = 0;
	bilderSets = shuffleArray(bilderSets);
	bilderLaden();
	starteTimer();
	musikAbspielenGame();
	document.getElementById("soundTheme").pause();
	document.getElementById("startbildschirm").style.display="none";
	document.getElementById("spielbildschirm").style.display="block";
	document.getElementById("timer").style.display="block";
	document.getElementById("spielendebildschirm").style.display="none";
	document.getElementById("gameover").style.display="none";
}


function bildKlick(nummer) {
	if (nummer != richtigesBild) {
  		document.getElementById('soundWrong').play();
  		return;
 		}
	geschafft++;
		if (geschafft == ziel) {
			spielende();
			return;
			}
	bilderLaden();	
	count = 5;
}


function bilderLaden() {
	richtigesBild = zufall(1, 3);
	var falsch1 = (richtigesBild == 1 ? 2 : 1);
 	var falsch2 = (richtigesBild == 3 ? 2 : 3);
 	document.getElementById("bild0").src = bilderSets[geschafft][0]; // großes bild
 	document.getElementById("bild"+richtigesBild).src = bilderSets[geschafft][1]; // richtiges bild
	document.getElementById("bild"+falsch1).src = bilderSets[geschafft][2]; // falsches bild
 	document.getElementById("bild"+falsch2).src = bilderSets[geschafft][3]; // falsches bild
}


function spielende() {
	gesamtzeit = ((performance.now() - startzeit)|0) / 1000;
	document.getElementById("erreichteZeit").innerHTML=gesamtzeit;
	clearInterval(counter);
	document.getElementById('soundGame').pause();

	var platz = highscorePlatz(gesamtzeit);
		if (platz > 0) {
			document.getElementById("neuerhighscore").style.display="block";
			document.getElementById("erreichterPlatz").innerHTML=platz;
			document.getElementById('soundHighscore').play();						
		}
		else {
			document.getElementById("neuerhighscore").style.display="none";			
		}
	document.getElementById("spielendebildschirm").style.display="block";
	document.getElementById("spielbildschirm").style.display="none";
	document.getElementById("timer").style.display="none";
	document.getElementById('soundHighscore').play();
		}

function zeigeHighscores() {
	for (i = 1; i <= 10; i++) { 
		var zeit = localStorage.getItem("highscoreZeit" + i);
  		var name = localStorage.getItem("highscoreName" + i);
  		if (name === null || zeit === null || zeit == "null") name = "---";
  		if (zeit === null || zeit == "null") zeit = "---";
  		document.getElementById("highscoreZeit" + i).innerHTML = zeit;
  		document.getElementById("highscoreName" + i).innerHTML = name;
	}
	document.getElementById("highscoreliste").style.display="block";
	document.getElementById("spielendebildschirm").style.display="none";
	document.getElementById("spielbildschirm").style.display="none";
	document.getElementById("startbildschirm").style.display="none";
}		


function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
	var j = Math.floor(Math.random() * (i + 1));
	var temp = array[i];
	array[i] = array[j];
	array[j] = temp;
 }
	return array;
}


function zufall(min,max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


var counter;
function starteTimer() {
 	counter=setInterval(timer, 1000);
 	count=5;
 	timer();
 }


var count=5; 
function timer() {
  count=count-1;

  if (count <= 0) {
    clearInterval(counter);
    gameover();
   	return;
 }
  document.getElementById("timer").innerHTML=count;
};


function gameover() {	
	document.getElementById("soundGame").pause();
	document.getElementById("soundTheme").pause();	
	document.getElementById('soundGameover').play()	    
    document.getElementById("gameover").style.display="block"; 
    document.getElementById("startbildschirm").style.display="none";
	document.getElementById("spielbildschirm").style.display="none";
	document.getElementById("timer").style.display="none";  
}

function startseite(){
	musikAbspielen();
	document.getElementById("soundGame").pause();
	clearInterval(counter);
	document.getElementById("timer").style.display="none";	
    document.getElementById("gameover").style.display="none"; 
    document.getElementById("startbildschirm").style.display="block";
	document.getElementById("spielbildschirm").style.display="none"; 
	document.getElementById("highscoreliste").style.display="none";
	document.getElementById("anleitung").style.display="none";
	document.getElementById("spielendebildschirm").style.display="none";

}

function anleitung(){
    document.getElementById("gameover").style.display="none"; 
    document.getElementById("startbildschirm").style.display="none";
	document.getElementById("spielbildschirm").style.display="none"; 
	document.getElementById("highscoreliste").style.display="none";
	document.getElementById("anleitung").style.display="block";	
}


function highscorePlatz(zeit) {
	for (i = 1; i <= 10; i++) {
  		var highscore = localStorage.getItem("highscoreZeit" + i);
  		if (!highscore || zeit < highscore) return i;
 	}
 	return 0;
}


function neuerHighscore(zeit, name) {
 	var platz = highscorePlatz(zeit);
 	if (platz <= 0) return;
 	for (i = 10; i > platz; i--) {
  		localStorage.setItem("highscoreZeit" + i, localStorage.getItem("highscoreZeit" + (i - 1)));
  		localStorage.setItem("highscoreName" + i, localStorage.getItem("highscoreName" + (i - 1)));
 	}
 	localStorage.setItem("highscoreZeit" + platz, zeit);
 	localStorage.setItem("highscoreName" + platz, name);
}


function namenseingabeFertig_click() {
	var name = document.getElementById("namenseingabe").value
	neuerHighscore(gesamtzeit, name);
	zeigeHighscores();
}










