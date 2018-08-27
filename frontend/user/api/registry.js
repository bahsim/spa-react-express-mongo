
export function getRegistry(resolve, reject) {
	fetch('/registry')
		.then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response;
		})
		.then((response) 	=> response.json())
		.then((value) 		=> resolve(value))
		.catch((error) 		=> reject(error))
}

export function getRecord(id, resolve, reject) {
	fetch('/registry/' + id)
		.then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response;
		})
		.then((response) 	=> response.json())
		.then((value) 		=> resolve(value))
		.catch((error) 		=> reject(error))
}

export function createRecord(record, resolve, reject) {
	fetch('/registry', { 
		method: 'POST', 
		body: JSON.stringify(record),
	}).then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response;
	}).then((response) 	=> response.json())
		.then((value) 		=> resolve(value))
		.catch((error) 		=> reject(error))
}

export function refreshRecord(record, resolve, reject) {
	fetch('/registry/' + record._id, { 
		method: 'PUT', 
		body: 	JSON.stringify(record) 
	}).then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response;
	}).then((response) 	=> response.json())
		.then((value) 		=> resolve(value))
		.catch((error) 		=> reject(error))
}

export function deleteRecord(id, resolve, reject) {
	fetch('/registry/' + id, {
			method: 'DELETE'
	}).then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response;
	}).then((response) 	=> response.json())
		.then((value) 		=> resolve(value))
		.catch((error) 		=> reject(error))
}
