import React, { Component } from 'react';
import {   
  StyleSheet,  
  Text,  
  View,
  TouchableOpacity,
  ListView,    
  Image,
  Dimensions,
  TouchableHighlight,
  Navigator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class Item extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<View style={styles.itemView}>
				<View style={styles.itemHeader}>
					<Text style={styles.instrumentsName}>{this.props.data.Name}</Text>
				</View>
				<TouchableOpacity onPress={this.props.onSelect}>
					<Image style={styles.itemImage} source={{uri:this.props.data.Path}}>
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

class List extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); //指定重新render的条件
	    let str = '{"name":111,"age":"23"}'
	    this.state = {
	    	currentPage: this.props.pageName,
			selectedResourceMode: this.props.resourceMode,
	    	dataSource: ds.cloneWithRows([
	    		{
				    "Path": "http://i0.hdslb.com/bfs/archive/4037cf8b3bc2367443e022695f79867c39315806.jpg",
				    "Name": "dfdfdfdfd",
				},
	    		{
				    "Path": "http://i0.hdslb.com/bfs/archive/4037cf8b3bc2367443e022695f79867c39315806.jpg",
				    "Name": "dfdfdfdfd",
				},
				{
				    "Path": "http://i0.hdslb.com/bfs/archive/4037cf8b3bc2367443e022695f79867c39315806.jpg",
				    "Name": "dfdfdfdfd",
				},
				{
				    "Path": "http://i0.hdslb.com/bfs/archive/4037cf8b3bc2367443e022695f79867c39315806.jpg",
				    "Name": "dfdfdfdfd",
				},
	    	]),
	    };
	}

	_onPressButton() {
		this.props.navigator.push({Component: 'CCTVView'});
	}

		
	_renderRow(rowData) {
		let Data = rowData;
		return(
			<Item onSelect={this._onPressButton.bind(this)} data={Data}/>
		);
	}

	render() {
		return(
			<ListView
		        	dataSource={this.state.dataSource}
		        	renderRow={this._renderRow.bind(this)} 
		        	style={styles.listHeight}
		        	showsVerticalScrollIndicator={false}
		        	keyboardShouldPersistTaps="always"

		    />
		);
	}
}

export default class InstrumentsView extends Component {
	constructor(props) {
	    super(props);
	}

	instrumentsHeader() {
		return(
			<View style={styles.instrumentsHeader}>
				<Text style={styles.instrumentsSpace}> </Text>
				<Text style={styles.instrumentsText}>我的设备</Text>
				<TouchableOpacity><Text style={styles.instrumentsInsertButton}>+</Text></TouchableOpacity>
			</View>
		);
	}


	render() {
	    return (
	    	<View>
	    		{this.instrumentsHeader()}
	    		<List navigator={this.props.navigator}/>
		    </View>
	    );
	}
}

const styles = StyleSheet.create({

	listHeight: {
		marginBottom:52,
	},

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
		fontSize: 20,
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
});