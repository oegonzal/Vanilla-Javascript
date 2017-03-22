function logout_called(){
	var el = document.getElementById("log");
	el.style.display = 'block';
}

function logout_yes(){
	var el = document.getElementById("log");
	el.style.display = 'none';
	window.location = '../src/login.html';
}

function logout_no(){
	var el = document.getElementById("log");
	el.style.display = 'none';
}