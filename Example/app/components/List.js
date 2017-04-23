import React , {Component} from 'react';
import {
	StyleSheet,
	ListView,
	Dimensions,
} from 'react-native';

import Item from './Item';

var height = Dimensions.height;


export default class List extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); //指定重新render的条件
	    this.state = {
	    	ds,
	    	dataSource: ds.cloneWithRows(this.props.data),
	    };
	}

	componentWillReceiveProps(nextProps) {
		var newP = nextProps;
		this.setState({
			dataSource: this.state.ds.cloneWithRows(newP.data)
		});
	}

	_onPressVideo() {
		this.props.navigator.push({Component: 'CCTVView'});
	}
		
	_renderRow(rowData) {
		let Data = rowData;
		return(
			<Item 
				onSelect={this._onPressVideo.bind(this)} 
				data={Data}
				changeInsInfo={this.props.changeInsInfo}
			/>
		);
	}

	render() {
		return(
			<ListView
		        	dataSource={this.state.dataSource}
		        	renderRow={this._renderRow.bind(this)} 
		        	style={styles.listHeight}
		        	showsVerticalScrollIndicator={false}
		        	keyboardShouldPersistTaps={true}
		        	enableEmptySections = {true}
		    />
		);
	}
}

const styles = StyleSheet.create({
	listHeight: {
		height: height,
	},
});