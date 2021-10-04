// check auth status
auth.onAuthStateChanged(user=>{
	if(user){
		console.log("user logged in: ", user)
	} else {
		console.log("user logged out")
	}
});

//sign up
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener('submit', (e)=>{
	e.preventDefault();
	const email = signupForm['signup-email'].value;
	const pass = signupForm['signup-pass'].value;

	console.log(email, pass);
	auth.createUserWithEmailAndPassword(email, pass)
	  .then((userCredential) => {
	    // Signed in 
	    var user = userCredential.user;
	    console.log("user sign up success");
	    console.log(user);
	    signupForm.reset();
	  })
	  .catch((error) => {
	    const errorCode = error.code;
	    const errorMessage = error.message;
	    console.log(errorMessage);
	  });
})

//sign in
const signinForm = document.querySelector("#signin-form");
signinForm.addEventListener('submit', (e)=>{
	e.preventDefault();
	const signInEmail = signinForm['signin-email'].value;
	const signInPass = signinForm['signin-pass'].value;
	firebase.auth().signInWithEmailAndPassword(signInEmail, signInPass)
	  .then((userCredential) => {
	    // Signed in
	    var user = userCredential.user;
	    console.log("user sign in success");
	    signupForm.reset();
	    // ...
	  })
	  .catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    console.log(errorMessage);
	  });
})

//sign out
const signoutButton = document.querySelector("#log-out");
signoutButton.addEventListener('click', (e)=>{
	e.preventDefault();
	firebase.auth().signOut()
});