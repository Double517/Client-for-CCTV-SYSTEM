import React , { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Item extends Component {
	constructor(props) {
		super(props);
	}

	onPressVideo() {
		this.props.changeInsInfo(this.props.data.rtmp, this.props.data.carInfo);
		this.props.onSelect();
	}

	render() {
		return(
			<View style={styles.itemView}>
				<View style={styles.itemHeader}>
					<Text style={styles.instrumentsName}>{this.props.data.Discription}</Text>
				</View>
				<TouchableOpacity onPress={this.onPressVideo.bind(this)}>
					<Image style={styles.itemImage} source={{uri:this.props.data.PhotoUrl}}>
						<View style={styles.itemPlay}>
							<Icon name='ios-play' size={25} color='#FFF'/>
						</View>
					</Image>
				</TouchableOpacity>
				<View style={styles.itemFooter}>
					<Icon name='ios-paper-plane' size={25} color='#00cc99'/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	itemView: {
		height: height/3,
		marginBottom: 5,
	},
	itemHeader: {
		justifyContent: 'center',
		width: width,
		backgroundColor: '#FFF',
		height: height /15,
	},
	itemFooter: {
		justifyContent: 'center',
		width: width,
		backgroundColor: '#FFF',
		height: height /15,
	},
	itemImage: {
		width: width,
		height: height /5,
	},
	itemPlay: {
		position: 'absolute',
		bottom: 10,
		right: 10,

		width: 30,
		height: 30,

		paddingLeft: 10,
		paddingTop: 2,

		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#FFF',

	},
	instrumentsName: {
		marginLeft: 5,
		fontSize: 18,
	},
});