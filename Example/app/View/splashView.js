import React, {Component} from 'react';
import  {
    Image,
    StyleSheet,
    View,
    ProgressBarAndroid,
} from 'react-native';
import urlSingleton from '../action/urlSingleton';
import usernameSingleton from '../action/usernameSingleton';


export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        var {navigator} = props;
        var urlgetter = urlSingleton();
        var username = usernameSingleton();
        var interval = setInterval(() => {
                            if(username.getUsername()){
                                if(urlgetter.getUrlSet()){
                                    if(username.getUsername() == 'unknown') { 
                                        clearInterval(interval);
                                        navigator.push({Component: 'LoginPage'});
                                    }
                                    else{
                                        clearInterval(interval);
                                        navigator.push({Component: 'InstrumentsView'});
                                    }
                                }
                            }
                        }, 600);
    }
    render() {
        return(
            <View  style={styles.backimagestyle}>
                <Image source={require('../splashIcon.png') }/>
                <ProgressBarAndroid styleAttr="Inverse" style={styles.progressBar}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    progressBar: {
        position: 'relative',
        top: 100,
    },

    backimagestyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});