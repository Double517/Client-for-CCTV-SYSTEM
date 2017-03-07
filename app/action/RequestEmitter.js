"use strict";

function request(url,method,header,body,callback) {

	fetch(url, {
  		method: method,
  		headers: header,
  		mode: "cors",
  		body: body,
	})
	.then(callback)
	.catch((error) => {
        console.error(error);
    });
	
}

module.exports = request;