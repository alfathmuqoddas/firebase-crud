const guideLists = document.querySelector("#guides-accordion");

const setupGuides = (data) => {
	let html = '';
	data.forEach(doc => {
		const guide = doc.data();
		console.log(guide);

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
	})

	guideLists.innerHTML = html;
}