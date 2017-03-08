import React, { Component } from 'react';
import {   
  StyleSheet,  
  Text,  
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


export default class AddInstrumentsView extends Component {
	constructor(props) {
		super(props);
		//从外部传来摄像头的名字，地址
		this.state = {
			ID: null,
			Discription: null,
			Photo: null,
		};
	}

	goBack() {
		this.props.navigator.pop();
	}

	AddInstrumentsViewHeader() {
		return(
			<View style={styles.AddInstrumentsViewHeader}>
				<TouchableOpacity style={styles.AddInstrumentsViewOpacity} onPress={this.goBack.bind(this)}>
					<Text style={styles.AddInstrumentsViewText}>&lt; 返回</Text>
				</TouchableOpacity>
				<Text style={styles.AddInstrumentsViewText}>添加设备</Text>  
				<Text style={styles.AddInstrumentsViewSpace}>    </Text>
			</View>
		);
	}

	_onButtonPress() {
		
	}

	instrumentsInfoBox() {
		return(
			<View style={styles.infoBoxView}>
				<Text style={styles.inputTitle}>用户名</Text>
				<TextInput
					multiline={false}
					style={styles.inputBox}
					onChangeText={(text) => this.setState({ID:this.text})}
				/>
				<Text style={styles.inputTitle}>密码</Text>
				<TextInput
					multiline={true}
					style={styles.inputBox}
					onChangeText={(text) => this.setState({Discription:this.text})}
				/>
				<Text style={styles.inputTitle}>确认密码</Text>
				<TextInput
					multiline={true}
					style={styles.inputBox}
					onChangeText={(text) => this.setState({Discription:this.text})}
				/>

				<Button
				  onPress={this._onButtonPress}
				  title="注册"
				  color="#00cc99"
				  style={styles.inputButton}
				/>
			</View>
		);
	}

	render() {
		let header = this.AddInstrumentsViewHeader();
		let box = this.instrumentsInfoBox();
		return(
			<View>
				{header}
				{box}
			</View>
		);
	}


}

const styles = StyleSheet.create({

	addPhoto: {
		marginBottom: 20,
	},

	infoBoxView: {
		padding: 10,
		marginTop: 7,
	},

	inputBox: {
		borderColor: '#000',
		marginBottom: 20,
	},

	inputTitle: {
		fontSize: 20,
	},

	inputButton: {
		marginTop: 30,
	},



	AddInstrumentsViewOpacity: {
		position: 'relative',
		left: 11,
	},

	AddInstrumentsViewBackText: {
		fontSize: 13,
	},

	AddInstrumentsViewHeader: {
		backgroundColor: '#F5FCFF',
		borderBottomWidth: 0.2,
		borderBottomColor: '#999999',
		height: 50,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	AddInstrumentsViewText: {
		textAlign: 'center',
		fontSize: 19,
	},
	AddInstrumentsViewInsertButton: {
		width: 25,
		height: 25,
		borderWidth: 1,
		borderColor: '#999999',
		borderRadius: 20,
		fontSize: 17,
		textAlign: 'center',
		marginRight: 10,
	},
	AddInstrumentsViewSpace: {
		marginRight: 32,
	},
});