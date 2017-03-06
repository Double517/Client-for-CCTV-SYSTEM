import React, { Component } from 'react';
import {   
  StyleSheet,  
  Text,  
  View,
  TouchableOpacity,
  ListView,    
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

export default class CCTVView extends Component {
	CCTVViewHeader() {
		return(
			<View style={styles.CCTVViewHeader}>
				<Text style={styles.CCTVViewBackText}> 返回</Text>
				<Text style={styles.CCTVViewText}>我的设备</Text>  
				<Text style={styles.CCTVViewSpace}> </Text>
			</View>
		);
	}

	render() {
		return(
			<View style={styles.CCTVViewHeader}>
				<TouchableOpacity style={styles.CCTVViewOpacity}><Text style={styles.CCTVViewText}>返回</Text></TouchableOpacity>
				<Text style={styles.CCTVViewText}>我的设备</Text>  
				<Text style={styles.CCTVViewSpace}> </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	CCTVViewOpacity: {
		position: 'relative',
		left: 5,
	},

	CCTVViewBackText: {
		fontSize: 15,
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