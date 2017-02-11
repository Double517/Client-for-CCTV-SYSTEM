import React, { Component } from 'react';
import {   
  StyleSheet,  
  Text,  
  View,
  TouchableOpacity,    
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class MainHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: this.props.pageName,
			selectedResourceMode: this.props.resourceMode,
		}

	}

	instrumentsView() {
		return(
			<View style={styles.instrumentsHeader}>
				<Text style={styles.instrumentsSpace}> </Text>
				<Text style={styles.instrumentsText}>我的设备</Text>
				<TouchableOpacity><Text style={styles.instrumentsInsertButton}>+</Text></TouchableOpacity>
			</View>
		);
	}

	resourceView() {
		return(
			<View style={styles.resourceHeader}>
				<TouchableOpacity style={styles.resourceOpacity} onPress={()=>this.handleResourceModeChange('video')}>
					<View style={styles.resourceViod}></View>
						<Text style={this.state.selectedResourceMode === 'video' ? styles.resourceSelectedText :styles.resourceText}>视频</Text>
					<View style={styles.resourceViod}></View>
				</TouchableOpacity>
				<View style={styles.resourceOpacity}>
					<Text></Text>
					<TouchableOpacity onPress={()=>this.handleResourceModeChange('photo')}><Text style={this.state.selectedResourceMode === 'photo' ? styles.resourceSelectedText :styles.resourceText}>图片</Text></TouchableOpacity>
					<TouchableOpacity style={styles.resourceButtonOpacity}><Icon name='ios-paper-outline' size={15} color='#999999' /></TouchableOpacity>
				</View>
			</View>
		);
	}

	handleResourceModeChange(Mode) {
		let mode = Mode;
		this.setState({
			selectedResourceMode: mode,
		});
		this.props.handleResourceMode(mode);
	}

	planView() {
		return(
			<View style={styles.planHeader}>
				<Text style={styles.planText}>任务管理</Text>
			</View>
		);
	}

	settingView() {
		return(
			<View style={styles.settingHeader}>
				<TouchableOpacity style={styles.settingOpacity}><Icon name='md-qr-scanner' size={19} color='#999999' /></TouchableOpacity>
				<TouchableOpacity style={styles.settingOpacity}><Icon name='md-settings' size={19} color='#999999' /></TouchableOpacity>
			</View>
		);
	}

	render() {
		var onRenderView;
		if(this.state.currentPage === 'instruments'){
			onRenderView = this.instrumentsView();
		}
		if(this.state.currentPage === 'resource'){
			onRenderView = this.resourceView();
		}
		if(this.state.currentPage === 'plan'){
			onRenderView = this.planView();
		}
		if(this.state.currentPage === 'setting'){
			onRenderView = this.settingView();
		}
		return(
			<View>
				{onRenderView}
			</View>
		);
	}
}

const styles = StyleSheet.create({
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
	instrumentsInsertButton: {
		width: 25,
		height: 25,
		borderWidth: 1,
		borderColor: '#999999',
		borderRadius: 20,
		fontSize: 17,
		textAlign: 'center',
		marginRight: 10,
	},
	instrumentsSpace: {
		marginRight: 32,
	},

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

	settingHeader: {
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

	resourceHeader: {
		backgroundColor: '#F5FCFF',
		borderBottomWidth: 0.2,
		borderBottomColor: '#999999',
		height: 50,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'nowrap',
	},
	resourceOpacity: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	resourceText: {
		textAlign: 'center',
		fontSize: 19,
	},
	resourceSelectedText: {
		textAlign: 'center',
		fontSize: 19,
		color: '#00cc99',
	},
	resourceButtonOpacity: {
		width: 25,
		height: 25,
		borderWidth: 1,
		borderColor: '#999999',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
	resourceViod: {
		width: 25,
		height: 25,
		borderWidth: 1,
		borderColor: 'transparent',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
}); 