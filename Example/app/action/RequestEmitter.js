"use strict";

import ToastAndroid from 'react-native';

function request(url,method,header,body) {

	return fetch(url, {
  		method: method,
  		headers: header,
  		body: body,
	});
	
}

module.exports = request;