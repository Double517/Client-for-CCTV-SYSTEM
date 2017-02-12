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

export default class ResourceView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: this.props.pageName,
			selectedResourceMode: 'photo',
		}

	}

	resourceHeader() {
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
	}


	render() {
		return(
			<View>
				{this.resourceHeader()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
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