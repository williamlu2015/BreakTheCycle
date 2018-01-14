var player = document.getElementById("player--image");
player.style.top = '0%'
player.style.left = '10%'


document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        console.log("up")
        newT = parseInt(document.getElementById("player--image").style.top.slice(0, -1)) - 1;
        console.log(newT);
        document.getElementById("player--image").style.top = newT + '%';
    }
    else if (e.keyCode == '40') {
        // down arrow
        console.log('down')
        newT = parseInt(document.getElementById("player--image").style.top.slice(0, -1)) + 1;
        console.log(newT);
        document.getElementById("player--image").style.top = newT + '%';
    }
    else if (e.keyCode == '37') {
       // left arrow
       console.log('left')
       newT = parseInt(document.getElementById("player--image").style.left.slice(0, -1)) - 1;
        console.log(newT);
        document.getElementById("player--image").style.left = newT + '%';
    }
    else if (e.keyCode == '39') {
       // right arrow
       console.log('right')
              console.log('left')
       newT = parseInt(document.getElementById("player--image").style.left.slice(0, -1)) + 1;
        console.log(newT);
        document.getElementById("player--image").style.left = newT + '%';
    }
    checkHeartCollision()

}

function checkHeartCollision() {
	var rect1 = document.getElementById("player--image").getBoundingClientRect();
	var rect2 = document.getElementById("heart--image").getBoundingClientRect();
	var overlap = !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom)
	console.log(overlap);
	if (overlap) {
		alert("A kind student offered you a care package with warm socks, snacks and a gift card. You feel much better now! ")
		Game.status = 0;
		Game.stress = true;
		Game.health = true;
		document.getElementById("heart--image").style.display = 'none'
	}
}