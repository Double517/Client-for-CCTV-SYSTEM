import React, { Component } from 'react';
import {   
  StyleSheet,  
  Text,  
  View,
  ListView,    
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class PlanView extends Component {
	planHeader() {
		return(
			<View style={styles.planHeader}>
				<Text style={styles.planText}>任务管理</Text>
			</View>
		);
	}

	render() {
		return(
			<View>
				{this.planHeader()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	planHeader: {
		backgroundColor: '#F5FCFF',
		borderBottomWidth: 0.2,
		borderBottomColor: '#999999',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	planText: {
		textAlign: 'center',
		fontSize: 19,
	},
});