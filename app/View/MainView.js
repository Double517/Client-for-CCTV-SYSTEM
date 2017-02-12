import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator'; 
import Icon from 'react-native-vector-icons/Ionicons';
import {   
  StyleSheet,  
  Text,  
  View,  
} from 'react-native';

import ViewRouter from './ViewRouter'

const TabNavigatorItem =TabNavigator.Item;

export default class MainView extends Component {
	constructor(){  
	    super();  
	    this.state={  
	      selectedTab:'instruments',
	      resourceMode: 'video',  
	    }  
  	}  
  
  /** 
  tab点击方法 
  **/  
  onPress(tabName){  
    if(tabName){  
      this.setState(  
        {  
          selectedTab: tabName,  
        }  
      );  
    }  
  }  

   /** 
   渲染每项 
   **/  
   renderTabView(title,tabName,tabContent,IconName,IconSelectedName){  
     return(  
       <TabNavigatorItem  
        title={title}  
        renderIcon={()=><Icon name={IconName} size={19} color='#000'/>}  
        renderSelectedIcon={()=><Icon name={IconSelectedName} size={19} color='#00cc99'/>}  
        selected={this.state.selectedTab===tabName}  
        selectedTitleStyle={{color:'#00cc99'}}  
        onPress={()=>this.onPress(tabName)}  
       >  
          <ViewRouter pageName={tabName}/>
       </TabNavigatorItem>  
     );  
   }  
  
   /** 
   自定义tabbar 
   **/  
  tabBarView(){  
    return (  
      <TabNavigator  
       tabBarStyle={styles.tab}  
      >  
      {this.renderTabView('设备','instruments','头条板块','ios-videocam-outline','ios-videocam')}  
      {this.renderTabView('本地资源','resource','视频板块','ios-folder-outline','ios-folder')}  
      {this.renderTabView('任务管理','plan','关注板块','ios-stopwatch-outline','ios-stopwatch')}  
      {this.renderTabView('设置','setting','我的板块','ios-cog','ios-cog-outline')}  
      </TabNavigator>  
    );  
  }  
  
  /*若当前页面为本地资源，则render的时候要向子组件header传入一个改变父组件resourceMode的function*/
  change_resourceMode(Mode) {
  	let mode = Mode;
  	this.setState(  
        {  
          resourceMode: mode,  
        }  
    ); 
  }
  
  render() {  
    var tabBarView=this.tabBarView();  
    return (  
      <View style={styles.container}>  
        {tabBarView}  
      </View>  
    );  
  }  
}

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#F5FCFF',  
  },  
  welcome: {  
    fontSize: 20,  
    textAlign: 'center',  
    margin: 10,  
  },  
  instructions: {  
    textAlign: 'center',  
    color: '#333333',  
    marginBottom: 5,  
  },  
  tab:{  
    height: 52,  
    alignItems:'center',  
    backgroundColor:'#F5FCFF', 

  },  
  tabIcon:{  
    width:25,  
    height:25,  
  },  
  badgeView:{  
    width:22,  
    height:14 ,  
    backgroundColor:'#f85959',  
    borderWidth:1,  
    marginLeft:10,  
    marginTop:3,  
    borderColor:'#FFF',  
    alignItems:'center',  
    justifyContent:'center',  
    borderRadius:8,  
  },  
  badgeText:{  
    color:'#fff',  
    fontSize:8,  
  },  
}); 