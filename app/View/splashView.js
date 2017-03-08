import React, {
    Component,
    Image,
    StyleSheet,
} from 'react-native'


export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        var {navigator} = props;
        setTimeout(() => {
            navigator.replace({ Component: 'MainView' })
        }, 1000);
    }
    render() {
        return(
             //<Image source={require('../../img/chikka.png') } style={styles.backimagestyle}/>
        );
    }
}

const styles = StyleSheet.create({
    backimagestyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});