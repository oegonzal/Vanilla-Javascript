var ref = new Firebase("https://jjb750uy9yj.firebaseio-demo.com");

function invalidPassword() {
  document.getElementById("signInMessage").innerHTML = "Password cannot be empty";
  var signUpText = document.getElementById("signInMessage");
  signUpText.style.display = "block";
}

function invalidEmail() {
  document.getElementById("signInMessage").innerHTML = "Enter valid Email";
    var signUpText = document.getElementById("signInMessage");
  signUpText.style.display = "block";
}

function invalidForgotEmail() {
  document.getElementById("checkEmail").innerHTML = "Enter valid Email";
    var signUpText = document.getElementById("checkEmail");
  signUpText.style.display = "block";
}

function invalidNewPassword() {
  document.getElementById("checkPassword").innerHTML = "Password cannot be empty!";
  var signUpText = document.getElementById("checkPassword");
  signUpText.style.display = "block";
}

function invalidSignUpEmail() {
  document.getElementById("checkPassword").innerHTML = "Enter valid Email!";
    var signUpText = document.getElementById("checkPassword");
  signUpText.style.display = "block";
}

function onClickForgot() {
  var resendText = document.getElementById("resendMessage");
  resendText.style.display = "block";
}

function onWrongPassword(){
  document.getElementById("checkPassword").innerHTML = "Passwords must match!";
  var checkPassword = document.getElementById("checkPassword");
  checkPassword.style.display = "block";
}

function isPasswordMatch(){
  var password = document.getElementById("newPassword").value;
  var confirmPassword = document.getElementById("retypeNewPassword").value;
  
  if (password != confirmPassword){
   onWrongPassword();
  }
  else{
	document.location.href = 'welcome.html';
  }
  
}

function validateEmail() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var email = document.getElementById("usermail").value;
	if (re.test(email))
		validatePassword();
	else
		invalidEmail();
}

function validatePassword(){
	var pass = document.getElementById("password").value;
	if (pass === "")
	{
		invalidPassword();
	}
	else{
		ref.authWithPassword({
		email    : document.getElementById("usermail").value,
		password : document.getElementById("password").value
		}, function(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			console.log("Authenticated successfully with payload:", authData);
		}
		});
		document.location.href = 'list.html';
	}
}

function validateSignUpEmail() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var email = document.getElementById("signUpUsermail").value;
	if (re.test(email))
		validateSignUpPassword();
	else
		invalidSignUpEmail();
}

function validateSignUpPassword(){
	var pass = document.getElementById("newPassword").value;
	if (pass === "")
	{
		invalidNewPassword();
	}
	else
		isPasswordMatch();
}

function validateForgotEmail() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var email = document.getElementById("forgotUsermail").value;
	if (re.test(email))
		forgotConfirm();
	else
		invalidForgotEmail();
}

function signUpConfirm(){
//  onClickSignUp();
  ref.createUser({
  email: document.getElementById("signUpUsermail").value,
  password: document.getElementById("newPassword").value
}, function(error, userData) {
  if (error) {
    switch (error.code) {
      case "EMAIL_TAKEN":
        console.log("The new user account cannot be created because the email is already in use.");
        break;
      case "INVALID_EMAIL":
        console.log("The specified email is not a valid email.");
        break;
      default:
        console.log("Error creating user:", error);
    }
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
  }
});
  signUpOverlay();
  document.location.href = 'welcome.html';
}

function forgotConfirm(){
  onClickForgot();
  forgotOverlay();
}

function signUpOverlay() {
	var el = document.getElementById("signUpOverlay");
  var la = document.getElementById("overlay");
	la.style.visibility = (la.style.visibility == "visible") ? "hidden" : "visible";
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

function forgotOverlay(){
  var el = document.getElementById("forgotOverlay");
	var la = document.getElementById("overlay");
	la.style.visibility = (la.style.visibility == "visible") ? "hidden" : "visible";
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}