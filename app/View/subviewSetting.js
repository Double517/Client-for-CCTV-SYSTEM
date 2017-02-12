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

export default class SettingView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: this.props.pageName,
			selectedResourceMode: this.props.resourceMode,
		}

	}

	settingHeader() {
		return(
			<View style={styles.settingHeader}>
				<TouchableOpacity style={styles.settingOpacity}><Icon name='md-qr-scanner' size={19} color='#999999' /></TouchableOpacity>
				<TouchableOpacity style={styles.settingOpacity}><Icon name='md-settings' size={19} color='#999999' /></TouchableOpacity>
			</View>
		);
	}

	render() {
		return(
			<View>
				<View style={styles.avatarBox}>
					{this.settingHeader()}
					<View style={styles.avatar}>
						<Image></Image>
					</View>
					<Text style={styles.userName}>Nabulus</Text>
				</View>
				<View style={styles.barBox}>
					<TouchableOpacity style={styles.bar}>
						<Icon name='ios-paper-outline' size={19} color='#999999' />
						<Text style={styles.barText}>FQA</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.bar}>
						<Icon name='ios-paper-outline' size={19} color='#999999' />
						<Text style={styles.barText}>FQA</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.bar}>
						<Icon name='ios-paper-outline' size={19} color='#999999' />
						<Text style={styles.barText}>FQA</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.bar}>
						<Icon name='ios-paper-outline' size={19} color='#999999' />
						<Text style={styles.barText}>FQA</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	avatarBox: {
		width: width,
		height: height/3,
		backgroundColor: '#00cc99',
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatar: {
		width: 70,
		height: 70,

		borderWidth: 1,
		borderColor: '#fff',
		borderRadius: 70,
	},
	userName: {
		marginTop: 5,
		color: '#fff',
		fontSize: 20,
	},

	barBox: {
		width: width,
		height: height*2 /3,
		marginTop: 10,
	},
	bar: {
		width: width,
		height: 44,
		borderWidth: 0.3,
		borderColor: '#000',
		paddingLeft: 20,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 10,
	},
	barText: {
		fontSize: 19,
		color: '#000',
		marginLeft: 10,
	},


	settingHeader: {
		position: 'absolute',
		top: 0,
		right: 0,

		backgroundColor: 'transparent',
		height: 50,
		justifyContent: 'flex-end',
		alignItems: 'center',
		flexDirection: 'row',
	},
	settingOpacity: {
		backgroundColor: 'transparent',
		width: 30,
		height: 30,
		borderWidth: 1,
		borderColor: '#999999',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
});
