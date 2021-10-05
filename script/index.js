
// array
const guideLists = document.querySelector("#guides-accordion");
const setupGuides = (data) => {
	if(data.length) {
		let html = '';
		data.forEach(doc => {
			const guide = doc.data();
			
			const lists = `
			<div class="accordion-item">
	            <h2 class="accordion-header" id="flush-heading${guide.id}">
	                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${guide.id}" aria-expanded="false" aria-controls="flush-collapse${guide.id}">
	            ${guide.title}
	          </button>
	            </h2>
	            <div id="flush-collapse${guide.id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${guide.id}" data-bs-parent="#guides-accordion">
	                <div class="accordion-body">${guide.content}</div>
	            </div>
	        </div>
			`;
			html += lists
		});

		guideLists.innerHTML = html;
	
	} else {
		guideLists.innerHTML =`<h4 class="text-center">Login to view the Contents</h4>`
	}
};

//navbar log in
const logOutLinks = document.querySelectorAll('.logged-out');
const logInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
	if(user) {
		//account info
		db.collection('users').doc(user.uid).get().then(doc=>{
			const accountDetailsHtml = `
			<div>Logged In as ${user.email}</div>
			<div>${doc.data().bio}</div>
			`;
			accountDetails.innerHTML = accountDetailsHtml;
		});

		//toggle ui
		logOutLinks.forEach(item => item.style.display = "none");
		logInLinks.forEach(item => item.style.display = "block");
	} else {
		//hide account info
		accountDetails.innerHTML = '';

		logOutLinks.forEach(item => item.style.display = "block");
		logInLinks.forEach(item => item.style.display = "none");
	}
};

//create form
const createForm = document.querySelector('#create-guide');
createForm.addEventListener('submit', (e)=>{
	e.preventDefault();
	const uniqueId = Date.now().toString(36);
	db.collection('guides').add({
		title: createForm['guide-title'].value,
		content: createForm['guide-content'].value,
		id: uniqueId
	}).then(()=>{
		//close the modal and form
		createForm.reset();
	    var createModal = document.querySelector("#modal-create");
	    bootstrap.Modal.getInstance(createModal).hide();
	}).catch(err =>{
		console.log(error.message);
	})
});