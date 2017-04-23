import React, { Component } from 'react';
import {   
  StyleSheet,  
  Text,  
  View,
  Dimensions,
  TouchableOpacity,
  Navigator,
  AsyncStorage,
  Modal,
  ToastAndroid,
  Alert,
} from 'react-native'; 

import List from '../components/List';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import urlSingleton from '../action/urlSingleton';
import usernameSingleton from '../action/usernameSingleton';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

/**
本页面的数据获取流程：
在componentWillMount的时候开始获取list的data，注意放在state里面
， 
当在更新设备页面更新数据之后，调用刚果传进去的回调来更新本页面
**/

var un = usernameSingleton();

export default class InstrumentsView extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	Data: [],
	    	ResultKeys: [],
	    	username: '',
	    	modalVisible: false,
	    	onDeleteIns: null,
	    	deleteURL: '',
	    };

	}

	componentWillMount() {
		this._getItemFromStorage();
		this.setState({
			deleteURL: urlSingleton().getUrlSet().deleteURL, 
			username: un.getUsername(),
		});
		
	}


	componentWillReceiveProps() {
		this._getItemFromStorage();
	}

	_getItemFromStorage() {
		var allkeys;
		var self = this;
		var resultKeys = [];
		var resultValue = [];
		AsyncStorage.getAllKeys()
		.then((keys)=>{
			let result = new Array();
			keys.map((x)=>{
				if(x.indexOf(this.state.username+"的") == 0)
					resultKeys.push(x);
			});
			return resultKeys;
		})
		.then((resultKeys)=>{
			if(resultKeys.length == 0)
				self.setState({Data: [],ResultKeys: []});
			resultKeys.map((x)=>{
				AsyncStorage.getItem(x)
				.then((item) => {
					resultValue.push(JSON.parse(item));
					if(resultKeys.length == resultValue.length){
						self.setState({Data: resultValue,ResultKeys: resultKeys});
					}
				});
			})
		});
	}

		
	_onPressAdd() {
		this.props.navigator.push({Component: 'AddInstrumentsView'}); 
	}

	_onPressSub() {
		this.props.navigator.push({Component: 'SubInstrumentsView'}); 
	}

	_logout() {
		var self = this;
		AsyncStorage.removeItem("username")
		.then(()=>{
			Alert.alert('温馨提醒','确定退出吗?',[
	            {text:'确定',onPress:()=>{
	            	un.resetUsername();
	            	self.props.navigator.replace({Component: 'LoginPage'});
	        	}},
	            {text:'取消'}
        	]);
		});
	}

	instrumentsHeader() {
		return(
			<View style={styles.instrumentsHeader}>
				<View style={styles.buttonBox}>
					<TouchableOpacity onPress={this._logout.bind(this)} style={styles.refreshbutton}>
						<Icon name='md-log-out' size={30} color='#999999'/>
					</TouchableOpacity>
					<Text style={styles.instrumentsSpace}> </Text>
				</View>
				<Text style={styles.instrumentsText}>我的设备</Text>
				<View style={styles.buttonBox}>
					<TouchableOpacity onPress={this._setModalVisible.bind(this, true)} style={styles.circleButton}>
						<Icon name='ios-remove-circle-outline' size={32} color='#999999'/>
					</TouchableOpacity>
					<TouchableOpacity onPress={this._onPressAdd.bind(this)} style={styles.circleButton}>
						<Icon name='ios-add-circle-outline' size={32} color='#999999'/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	_setModalVisible(visible) {
    	this.setState({modalVisible: visible});
  	}

  	_deleteIns() {
  		var self = this;
  		//网络请求
  		fetch(self.state.deleteURL+'?onDeleteInsID='+self.state.onDeleteIns)
		.then((response)=>response.json())
		.then((jsonObject)=>{
			if(jsonObject.result) {
				ToastAndroid.show('设备删除成功',ToastAndroid.SHORT);
			}
			else {
				ToastAndroid.show('设备删除失败',ToastAndroid.SHORT);
				return ;
			}
		})
		.catch((error)=>{
			ToastAndroid.show(error.message,ToastAndroid.SHORT);
			return ;
		}) ;

  		AsyncStorage.removeItem(self.state.onDeleteIns)
  		.then(()=>self._getItemFromStorage())
  		.then(()=>self.setState({modalVisible: false}));
  		
  	}

	deleteModal() {
		return(
			<Modal
	          animationType="none"
	          transparent={false}
	          visible={this.state.modalVisible}
	          onRequestClose={() => {this._setModalVisible(false)}}
	        >
	          <View style={styles.modalBackgroundStyle}>
	            <View style={styles.innerModalContainerStyle}>
	              <ModalDropdown 
	              	options={this.state.ResultKeys}
	              	style={styles.dropdownButton}
	              	textStyle={styles.dropdownText}
	              	dropdownStyle={styles.dropdownDropdown}
	              	defaultValue="点击选择要删除的设备"
	              	onSelect={(index, value)=> {
	              		this.setState({onDeleteIns: value});
	              	}}
	              	onDropdownWillShow={()=>{
	              		if(this.state.ResultKeys.length <= 0){
				         	ToastAndroid.show('没有能够删除的对象',ToastAndroid.SHORT);
	              			return false;
	              		}
	              		return true;
	              	}}
	              />
	              <View style={styles.modalButtonBox}>
		              <TouchableOpacity style={styles.modalButtonB} onPress={this._deleteIns.bind(this)}>
		              	<Text style={styles.modalButtonText}>删除</Text>
		              </TouchableOpacity>
		              <TouchableOpacity style={styles.modalButtonA} onPress={this._setModalVisible.bind(this, false)}>
		              	<Text style={styles.modalButtonText}>关闭</Text>
		              </TouchableOpacity>
		          </View>
	            </View>
	          </View>
	        </Modal>
		);
	}

	listBody() {
		if(this.state.Data.length != 0)
			return(
				<List
	    			navigator={this.props.navigator}
	    			data={this.state.Data}
	    			changeInsInfo={this.props.changeInsInfo}
		    	/>
			);
		else
			return(<View></View>);
	}

	render() {
	    return (
	    	<View style={styles.body}>
	    		{this.deleteModal()}
	    		{this.instrumentsHeader()}
	    		{this.listBody()}
		    </View>
	    );
	}
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
	},


	circleButton: {
		marginRight: 10,
	},

	dropdownButton: {
		marginLeft: 60,
		marginTop: 40,
		marginBottom: 40,
	},
	dropdownText: {
		fontSize: 20,
	},
	dropdownDropdown: {
		width: 200,
	},

	modalButtonA: {
		borderWidth: 1,
		borderColor: '#999999',
		borderBottomWidth: 0,
		borderRightWidth: 0,
		width: (width-40)/2,
		justifyContent: 'center',
	},
	modalButtonB: {
		borderWidth: 1,
		borderColor: '#999999',
		borderBottomWidth: 0,
		borderLeftWidth: 0,
		width: (width-40)/2,
		justifyContent: 'center',
	},
	modalButtonText: {
		fontSize: 24,
		textAlign: 'center',
	},
	modalButtonBox: {
		flexDirection: 'row',
		width: width-40,
		height: 50,
	},
	modalBackgroundStyle: {
		flex: 1,
    	justifyContent: 'center',
    	padding: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalCloseButton: {
		color: '#000',
    	marginTop: 10,
  	},
  	innerModalContainerStyle: {
  		borderRadius: 10,
  		backgroundColor: 'white',
  	},

	refreshbutton: {
		marginLeft: 10,
	},

	buttonBox: {
		flexDirection: 'row',
	},

	instrumentsHeader: {
		backgroundColor: '#F5FCFF',
		borderBottomWidth: 0.2,
		borderBottomColor: '#999999',
		height: 50,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	instrumentsText: {
		textAlign: 'center',
		fontSize: 19,
	},
	instrumentsSpace: {
		marginRight: 32,
	},
});