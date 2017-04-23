"use strict";

import {AsyncStorage} from 'react-native';

var Localstorage = {
	setObject: function(key,object,callback) {
		AsyncStorage.setItem(key, JSON.stringify(object), callback());
		
	},

	setItem: function(key,item,callback) {
		AsyncStorage.setItem(key, item, (error) => callback)
	},

	getObject: function(key){
    	AsyncStorage.getItem(key, (error, object) => {
	        if (error) {
	            console.log('Error:' + error.message);
	        } else {
	            return JSON.parse(object);
	        }
    })},

    getItem: function(key){
    	AsyncStorage.getItem(key, (error, item) => {
	        if (error) {
	            console.log('Error:' + error.message);
	        } else {
	            return item;
	        }
    })},

    removeItem: function(key) {
    	AsyncStorage.removeItem(key, (error) => {
    		console.log(error);
    	})
    },

    getAllKeys: function(callback) {
    	return AsyncStorage.getAllKeys(callback);
    },
}

module.exports = Localstorage;