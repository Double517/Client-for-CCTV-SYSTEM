import React, { Component } from 'react';
import {   
  StyleSheet,  
  Text,  
  View,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import request from '../action/RequestEmitter';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class CCTVView extends Component {
	constructor(props) {
		super(props);
		//从外部传来摄像头的名字，地址
	}

	CCTVViewer() {
		return(
			<View style={styles.CCTVViewer}></View>
		);
	}

	emitControlMessage(action) {
		let body = new FormData();
		body.append("k",action);
		
		let url = 'http://139.199.14.52:5000';
		let method = 'POST';
		let header ;
		let callback;
		request(url,method,header,body,callback);
	}

	CarController() {
		return(
			<View>
				<View style={styles.ControllerTop}>
					<TouchableOpacity onPress={()=>{this.emitControlMessage('w')}}><Icon name='ios-arrow-dropup-outline' size={100} color='#999999'/></TouchableOpacity>
				</View>
				<View style={styles.ControllerMiddle}>
					<TouchableOpacity onPress={()=>{this.emitControlMessage('a')}}><Icon name='ios-arrow-dropleft-outline' size={100} color='#999999'/></TouchableOpacity>
					<TouchableOpacity onPress={()=>{this.emitControlMessage('d')}}><Icon name='ios-arrow-dropright' size={100} color='#999999'/></TouchableOpacity>
				</View>
				<View style={styles.ControllerBottom}>
					<TouchableOpacity onPress={()=>{this.emitControlMessage('s')}}><Icon name='ios-arrow-dropdown' size={100} color='#999999'/></TouchableOpacity>
				</View>
			</View>
		);
	}

	goBack() {
		this.props.navigator.pop();
	}

	CCTVViewHeader() {
		return(
			<View style={styles.CCTVViewHeader}>
				<TouchableOpacity style={styles.CCTVViewOpacity} onPress={this.goBack.bind(this)}>
					<Text style={styles.CCTVViewText}>&lt; 返回</Text>
				</TouchableOpacity>
				<Text style={styles.CCTVViewText}>我的设备</Text>  
				<Text style={styles.CCTVViewSpace}>    </Text>
			</View>
		);
	}

	render() {
		let header = this.CCTVViewHeader();
		let Video = this.CCTVViewer();
		let ControllerBox = this.CarController();
		return(
			<View>
				{header}
				{Video}
				{ControllerBox}
			</View>
		);
	}
}

const styles = StyleSheet.create({

	ControllerTop: {
		marginTop: 2,
		height: height/7,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},

	ControllerMiddle: {
		height: height/7,
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row',
	},
	
	ControllerBottom: {
		marginTop: 10,
		height: height/7,
		justifyContent: 'center',
		alignItems: 'center',
	},

	CCTVViewer: {
		height: height/2-50,
		backgroundColor: '#000',
		width: width,
	},

	CCTVViewOpacity: {
		position: 'relative',
		left: 11,
	},

	CCTVViewBackText: {
		fontSize: 13,
	},

	CCTVViewHeader: {
		backgroundColor: '#F5FCFF',
		borderBottomWidth: 0.2,
		borderBottomColor: '#999999',
		height: 50,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	CCTVViewText: {
		textAlign: 'center',
		fontSize: 19,
	},
	CCTVViewInsertButton: {
		width: 25,
		height: 25,
		borderWidth: 1,
		borderColor: '#999999',
		borderRadius: 20,
		fontSize: 17,
		textAlign: 'center',
		marginRight: 10,
	},
	CCTVViewSpace: {
		marginRight: 32,
	},
});