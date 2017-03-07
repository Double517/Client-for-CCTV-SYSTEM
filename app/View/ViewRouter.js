import React, { Component } from 'react';


import SettingView from './subviewSetting';
import PlanView from './subviewPlan';
import ResourceView from './subviewResource';


export default class ViewRouter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: this.props.pageName,
		}
	}

	render() {
		if(this.state.currentPage === 'resource'){
			return(<ResourceView/>);
		}
		if(this.state.currentPage === 'plan'){
			return(<PlanView />);
		}
		if(this.state.currentPage === 'setting'){
			return(<SettingView />);
		}
	}
}