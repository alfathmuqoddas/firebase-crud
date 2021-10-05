// check auth status
auth.onAuthStateChanged(user=>{
	if(user){
		db.collection('guides').onSnapshot(snapshot=>{
			setupGuides(snapshot.docs);
			setupUI(user);
		}, err => {
			console.log(error.message);
		});
	} else {
		setupUI();
		setupGuides([]);
	}
});

//sign up
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener('submit', (e)=>{
	e.preventDefault();
	const email = signupForm['signup-email'].value;
	const pass = signupForm['signup-pass'].value;

	auth.createUserWithEmailAndPassword(email, pass)
	  .then(cred => {
	    return db.collection('users').doc(cred.user.uid).set({
			bio: signupForm['signup-bio'].value
		})
	  }).then(()=>{
	  	signupForm.reset();
	    var signupModal = document.querySelector("#modal-signup");
	    bootstrap.Modal.getInstance(signupModal).hide();
	  })
});

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
	    signinForm.reset();

	    var signinModal = document.querySelector("#modal-login");
	    bootstrap.Modal.getInstance(signinModal).hide();
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
	firebase.auth().signOut();
});

