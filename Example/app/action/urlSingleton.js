import ToastAndroid from 'react-native';

var urlSet = null;

function urlSingleton() {
	
	fetch("http://rapapi.org/mockjsdata/13075/api/getURL")
	.then((response)=>response.json())
	.then((jsonObject)=>{
		set = {
			loginURL: "http://"+jsonObject.loginURL,
			addURL: "http://"+jsonObject.addURL,
			deleteURL: "http://"+jsonObject.deleteURL,
			signupURL: "http://"+jsonObject.signupURL,
		}
		urlSet = Object.create(set);
	})
	.catch((error)=>{
     	ToastAndroid.show(error.message,ToastAndroid.SHORT);
	});

	this.getUrlSet = function() {
		return urlSet;
	};

	return this;
}

module.exports = urlSingleton;