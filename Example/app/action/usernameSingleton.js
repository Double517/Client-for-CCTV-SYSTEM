import {AsyncStorage} from 'react-native';

var username = null;

function usernameSingleton() {
	
	AsyncStorage.getItem("username")
    .then((un)=>{
      if(un)
      	username = un;
      else
      	username = "unknown";
    });

	this.getUsername = function() {
		return username;
	};

	this.resetUsername = function() {
		username = null;
	}


	return this;
}

module.exports = usernameSingleton;