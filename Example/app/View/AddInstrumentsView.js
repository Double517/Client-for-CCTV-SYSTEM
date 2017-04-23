import React, { Component } from 'react';
import {   
  StyleSheet,  
  Text,  
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  ToastAndroid,
  AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import Localstorage from '../action/Localstorage';
import urlSingleton from '../action/urlSingleton';
import usernameSingleton from '../action/usernameSingleton';

var width = Dimensions.width;

var options = {
    //底部弹出框选项
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
}


export default class AddInstrumentsView extends Component {
	constructor(props) {
		super(props);
		//从外部传来摄像头的名字，地址
		this.state = {
			ID: null,
			Discription: null,
			PhotoUrl: null,
			username: '',
			addURL: '',
		};
	}

	componentWillMount() {
		this.setState({
			addURL: urlSingleton().getUrlSet().addURL,
			username: usernameSingleton().getUsername(),
		});
	}

	goBack() {
		this.props.trigger();
		this.props.navigator.pop();
	}

	AddInstrumentsViewHeader() {
		return(
			<View style={styles.AddInstrumentsViewHeader}>
				<TouchableOpacity style={styles.AddInstrumentsViewOpacity} onPress={this.goBack.bind(this)}>
					<Text style={styles.AddInstrumentsViewText}>&lt; 返回</Text>
				</TouchableOpacity>
				<Text style={styles.AddInstrumentsViewText}>添加设备</Text>  
				<Text style={styles.AddInstrumentsViewSpace}>     </Text>
			</View>
		);
	}

	cameraAction() {
		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
			console.log('User cancelled image picker');
			}
			else if (response.error) {
			console.log('ImagePicker Error: ', response.error);
			}
			else if (response.customButton) {
			console.log('User tapped custom button: ', response.customButton);
			}
			else {
			let source = { uri: response.uri };

			// You can also display the image using data:
			// let source = { uri: 'data:image/jpeg;base64,' + response.data };


			this.setState({
			  PhotoUrl: source,
			});
			}
		});

	}

	renderImage() {
		if(this.state.PhotoUrl == null)
			return(
				<Icon name='md-camera' size={60} color='#999999'/>
			);
		else
			return(
				<Image source={this.state.PhotoUrl} style={styles.samplePhoto}/>
			);
	}

	_onButtonPress() {
		var self = this;
		var {ID,Discription,PhotoUrl} = this.state;
		var rtmp = null;
		var car = null;

		if(PhotoUrl == null){
     		ToastAndroid.show('添加设备失败',ToastAndroid.SHORT);
     		return ;
		}
		//添加网络请求语句
		fetch(self.state.addURL+'?Discription='+Discription+'&onAddInsID='+ID)
		.then((response)=>response.json())
		.then((jsonObject)=>{
			if(jsonObject){
				rtmp = "rtmp://"+jsonObject.rtmp;
				car = jsonObject.car;
				let storageName = self.state.username+"的"+ID;
				let instrumentsInfoJson = {
					"InstrumentsID" : ID,
					"Discription": Discription,
					"PhotoUrl": PhotoUrl.uri,
					"rtmp": rtmp,
					"carInfo": car,
				};
				AsyncStorage.setItem(storageName, JSON.stringify(instrumentsInfoJson))
				.then(()=>self.goBack());
				ToastAndroid.show('设备添加成功',ToastAndroid.SHORT);
				return ;
			}
			else{
				ToastAndroid.show('添加设备失败',ToastAndroid.SHORT);
				return ;
			}
		})
		.catch((error)=>{
			ToastAndroid.show(error.message,ToastAndroid.SHORT);
			return ;
		}) ;
	}

	instrumentsInfoBox() {
		let renderImage = this.renderImage();
		return(
			<View style={styles.infoBoxView}>
				<Text style={styles.inputTitle}>设备ID</Text>
				<TextInput
					multiline={false}
					style={styles.inputBox}
					onChangeText={(text) => this.setState({ID:text})}
				/>
				<Text style={styles.inputTitle}>设备描述</Text>
				<TextInput
					multiline={true}
					style={styles.inputBox}
					onChangeText={(text) => this.setState({Discription:text})}
				/>
				<TouchableOpacity style={styles.addPhoto} onPress={this.cameraAction.bind(this)}>
					{renderImage}
				</TouchableOpacity>
				<TouchableOpacity
					onPress={this._onButtonPress.bind(this)}
					style={styles.inputButton}
				>
					<Text style={styles.inputButtonText}>提交</Text>
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

	samplePhoto: {
		width: 60,
		height: 60,

	},

	addPhoto: {
		marginBottom: 20,
		borderColor: '#999999',
		borderWidth: 1,
		borderRadius: 5,
		height: 70,
		width: 70,
		justifyContent: 'center',
		alignItems: 'center',
	},

	infoBoxView: {
		padding: 10,
		marginTop: 7,
	},

	inputBox: {
		borderColor: '#000',
		marginBottom: 15,
	},

	inputTitle: {
		fontSize: 20,
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