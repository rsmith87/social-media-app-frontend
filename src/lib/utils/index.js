/**
 * Handles the POST API calls for the app.
 * @param {String} endpoint
 * @param {String} api
 * @param {Object} parms
 * @returns Json
 */
const postApi = async function(endpoint, data, token, xsrfToken) {
	const url = "http://0.0.0.0/api/v1/" + endpoint;
	const response = await fetch( url, {
		method: "POST",
		mode:   "cors", // no-cors, *cors, same-origin
		cache:  "no-cache", 
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'X-XSRF-TOKEN': xsrfToken,
			'Authorization': 'Bearer ' + token ?? ''
		},
		redirect: "error", 
		referrerPolicy: "no-referrer", 
		body: JSON.stringify(data), 
	});
	
	return await response.json(); // parses JSON response into native JavaScript objects
}

/**
 * Handles the GET API calls for the app.
 * @param {String} endpoint
 * @param {String} apiKey
 * @returns {JSON}
 */
const getApi = async function(endpoint, apiKey) {
	let url = 'http://0.0.0.0/api/v1/' + endpoint;
	const response = await fetch( url, {
		method: "GET",
		mode: 'cors',
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + apiKey ?? ''
		}
	});

	return await response.json();
}

/**
 * Handles the DELETE API calls for the app.
 * @param {String} endpoint
 * @param {Object} data
 * @param {String} apiKey
 * @param {String} xsrfToen
 * @returns {JSON}
 */
const deleteApi = async function(endpoint, data, apiKey, xsrfToken) {
	let url = 'http://0.0.0.0/api/v1/' + endpoint;
	const response = await fetch( url, {
		method: 'DELETE',
		mode: 'cors',
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
			'Authorization': 'Bearer ' + apiKey ?? ''
		},
		redirect: "error", 
		referrerPolicy: "no-referrer",
		body: JSON.stringify(data),
	})
}

/**
 * Parses out the form data via a more front-end method.
 * @param {Object} form  The form object from event.target.
 * @returns {Array} data The form values input
 */
const handleFrontEndFormData = async function(form) {
	let data = [];
	const formData = new FormData(form);
	for (let field of formData) {
		const [key, value] = field;
		data[key] = value;
	}
	return data;
}

/**
 * Handles truncating content
 * @param {String} str 
 * @param {*} num 
 * @returns String
 */
const truncateString = async function(str, num) {
	if (str.length <= num) {
	  return str
	}
	return str.slice(0, num) + '...'
}

const formatDate = async function(date) {
	let formattedDate = new Date(date)
}

const formatAmPm = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, '0');
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}


const handleOverlayOpen = (event) => {
	let target = event.target;
	let post = target.parentElement.parentElement.parentElement
	post.querySelector('.deletePostOverlay').classList.remove('hidden');
	post.querySelector('.deletePostOverlay').classList.add('flex');
}

const closePostOverlay = (event) => {
	let target = event.target;
	let post = target.parentElement.parentElement;
	post.querySelector('.deletePostOverlay').classList.remove('flex');
	post.querySelector('.deletePostOverlay').classList.add('hidden');
}

const colorSvgIcon = (event) => {
	let target = event.target;
	let icon = target.querySelector('i');
	if (!icon) {return;}
	icon.classList.remove('fa-regular')
	icon.classList.add('fa-solid');
}

const returnSvgIconColor = (event) => {
	let target = event.target;
	let icon = target.querySelector('i');
	if (!icon) {return;}
	icon.classList.remove('fa-solid');
	icon.classList.add('fa-regular')
}

const truncate = (str, no_words) => {
	return str.split(" ").splice(0, no_words).join(" ");
}

export { 
	postApi,
	getApi,
	deleteApi,
	handleFrontEndFormData,
	truncateString,
	formatDate,
	formatAmPm,
	handleOverlayOpen,
	closePostOverlay,
	colorSvgIcon,
	returnSvgIconColor
}