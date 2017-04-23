import React, { Component } from 'react';
import {   
  StyleSheet,  
  Text,  
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Button,
  ToastAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import urlSingleton from '../action/urlSingleton';

/*
输入用户名后要请求服务器用户名是否可用

*/

var width = Dimensions.width;

export default class SignUpPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			Password: '',
			rePassword: '',
			signupURL: '',
		};
	}

	componentWillMount() {
		this.setState({signupURL: urlSingleton().getUrlSet().signupURL});
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
				<Text style={styles.AddInstrumentsViewText}>注册</Text>  
				<Text style={styles.AddInstrumentsViewSpace}>    </Text>
			</View>
		);
	}

	_onButtonPress() {
		var self = this;
		if(this.state.rePassword!=this.state.Password)
			ToastAndroid.show('两次输入密码不一致',ToastAndroid.SHORT);
		else{
			//添加网络请求，网络请求完才能进行下一步
			fetch(self.state.signupURL+'?password='+self.state.Password+'&username='+self.state.username)
			.then((response)=>response.json())
			.then((jsonObject)=>{
				if(jsonObject.result) {
					ToastAndroid.show('注册成功',ToastAndroid.SHORT);
					this.props.navigator.pop();
				}
				else {
					ToastAndroid.show('注册失败',ToastAndroid.SHORT);
					return ;
				}
			})
			.catch((error)=>{
				ToastAndroid.show(error.message,ToastAndroid.SHORT);
				return ;
			}) ;

	 		
		}
	}

	instrumentsInfoBox() {
		return(
			<View style={styles.infoBoxView}>
				<Text style={styles.inputTitle}>用户名</Text>
				<TextInput
					multiline={false}
					style={styles.inputBox}
					onChangeText={(text) => this.setState({username:text})}
				/>
				<Text style={styles.inputTitle}>密码</Text>
				<TextInput
					multiline={true}
					style={styles.inputBox}
					onChangeText={(text) => this.setState({Password:text})}
				/>
				<Text style={styles.inputTitle}>确认密码</Text>
				<TextInput
					multiline={true}
					style={styles.inputBox}
					onChangeText={(text) => this.setState({rePassword: text})}
				/>

				<TouchableOpacity
					onPress={this._onButtonPress.bind(this)}
					style={styles.inputButton}
				>
					<Text style={styles.inputButtonText}>注册</Text>
				</TouchableOpacity>
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
		width: width,
		height: 40,
		backgroundColor: '#00cc99',
		alignItems: 'center',
		justifyContent: 'center',
	},

	inputButtonText: {
		textAlign: 'center',
		color: 'white',
		fontSize: 15,
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