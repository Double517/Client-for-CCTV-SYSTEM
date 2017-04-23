import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Navigator,
  PermissionsAndroid,
} from 'react-native';
import InstrumentsView from './View/InstrumentsView';
import CCTVView from './View/CCTV_View';
import AddInstrumentsView from './View/AddInstrumentsView';
import LoginPage from './View/LoginPage';
import SignUpPage from './View/SignUpPage';
import SplashScreen from './View/splashView';



export default class app extends Component {

  
  constructor() {
    super();
    this.state = {
      flag: 1,
      onloadVideoURL: '',
      onloadCarURL: '',
      onloadCarHeader: null,
    };
  }

  changeInsFlag() {
    if(this.state.flag == 1)
      this.setState({flag: 0});
    if(this.state.flag == 0)
      this.setState({flag: 1});
  }

  changeInsInfo(url, infoObject) {
    this.setState({
      onloadVideoURL: url,
      onloadCarHeader: infoObject.carHeader,
      onloadCarURL: infoObject.carURL,
    });
  }

  _renderScene(route,navigator) {
    if(route.Component == 'InstrumentsView')
      return(<InstrumentsView navigator={navigator} changeInsInfo={this.changeInsInfo.bind(this)}/>);
    if(route.Component == 'CCTVView'){
      return(
        <CCTVView navigator={navigator} 
          videoURL={this.state.onloadVideoURL}
          carURL={this.state.onloadCarURL}
          carHeader={this.state.onloadCarHeader}
        />);
    }
    if(route.Component == 'AddInstrumentsView'){
      return(<AddInstrumentsView navigator={navigator} trigger={this.changeInsFlag.bind(this)}/>);
    }
    if(route.Component == 'SignUpPage')
      return(<SignUpPage navigator={navigator}/>);
    if(route.Component == 'LoginPage'){
      return(<LoginPage navigator={navigator}/>);
    }
    if(route.Component == 'SplashScreen')
      return(<SplashScreen navigator={navigator}/>);
    
  }

  render() {
    var self = this;
    return (
      <View style={styles.container}>
        <Navigator
              initialRoute={{Component: 'SplashScreen'}}
              renderScene={self._renderScene.bind(self)}
              configureScene={(route) => {
                let fade = Navigator.SceneConfigs.FadeAndroid;
                let  gestureType = Navigator.SceneConfigs.HorizontalSwipeJump;

                gestureType.gestures.jumpForward=null;

                if(route.Component == 'LoginPage' || route.Component == 'InstrumentsView' || route.Component == 'SplashScreen')
                  return fade;
                return gestureType;
              }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    backgroundColor: '#F5FCFF',
  },
});
