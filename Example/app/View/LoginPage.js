import React, { Component } from 'react';
import {   
  StyleSheet,  
  Text,  
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  ToastAndroid,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import urlSingleton from '../action/urlSingleton';
import usernameSingleton from '../action/usernameSingleton';


var {width, height} = Dimensions;
var onLogin = false;

export default class LoginPage extends Component {
	constructor(props) {
		super(props);
		//从外部传来摄像头的名字，地址
		this.state = {
			username: '',
			Password: '',
			loginURL: '',
		};
	}

	goToSignUp() {
		this.props.navigator.push({Component: 'SignUpPage'});
	}


	componentDidMount() {
		this.setState({loginURL: urlSingleton().getUrlSet().loginURL});
	}

	AddInstrumentsViewHeader() {
		return(
			<View style={styles.AddInstrumentsViewHeader}>
				<TouchableOpacity style={styles.AddInstrumentsViewOpacity} onPress={this.goToSignUp.bind(this)}>
					<Text style={styles.AddInstrumentsViewSingUpText}>   注册 </Text>
				</TouchableOpacity>
				<Text style={styles.AddInstrumentsViewText}>用户登陆</Text>  
				<Text style={styles.AddInstrumentsViewSpace}>    </Text>
			</View>
		);
	}

	_onButtonPress() {
		onLogin = true;
		var self = this;
		//网路请求，promise
		fetch(self.state.loginURL+'?password='+self.state.Password+'&username='+self.state.username)
		.then((response)=>response.json())
		.then((jsonObject)=>{
			if(jsonObject.result) {
				AsyncStorage.setItem("username", self.state.username)
				.then(()=>{
					var un = usernameSingleton();
					var interval = setInterval(() => {
						if(un.getUsername()) {
							clearInterval(interval);
							onLogin = false;
							self.props.navigator.replace({Component: 'InstrumentsView'});
							ToastAndroid.show('登陆成功',ToastAndroid.SHORT);
						}
					}, 10);
				});
			}
			else {
				ToastAndroid.show('错误的用户信息',ToastAndroid.SHORT);
				return ;
			}
		})
		.catch((error)=>{
			ToastAndroid.show(error.message,ToastAndroid.SHORT);
			return ;
		}) ;

		
	 	
	}

	instrumentsInfoBox() {
		return(
			<View style={styles.infoBoxView}>
				<Text style={styles.inputTitle}>用户名</Text>
				<TextInput
					multiline={false}
					style={styles.inputBox}
					onChangeText={(text) => this.setState({username: text})}
				/>
				<Text style={styles.inputTitle}>密码</Text>
				<TextInput
					multiline={true}
					style={styles.inputBox}
					onChangeText={(text) => this.setState({Password: text})}
				/>
				<TouchableOpacity
					onPress={this._onButtonPress.bind(this)}
					style={styles.inputButton}
				>
					<Text style={styles.inputButtonText}>登录</Text>
				</TouchableOpacity>
			</View>
		);
	}

	render() {
		var header = this.AddInstrumentsViewHeader();
		var box = this.instrumentsInfoBox();
		return(
			<View>
				{header}
				{box}
			</View>
		);
	}


}

const styles = StyleSheet.create({

	AddInstrumentsViewSingUpText: {
		textAlign: 'center',
		fontSize: 14,
	},

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
		flexDirection: 'row',
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