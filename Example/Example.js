import React from 'react';
import {
    Image,
    StatusBar,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Text,
    Slider,
    View,
    Animated,
    ActivityIndicatorIOS,
    ProgressBarAndroid,
    Platform,
} from 'react-native';
import RCTIJKPlayer from 'react-native-ijkplayer';
import RCTIJKPlayerWithController from 'react-native-ijkplayer/RCTIJKPlayerWithController';
var {height, width} = Dimensions.get('window');
console.log("width, height", width, height);
import Icon from 'react-native-vector-icons/FontAwesome';
const iconSize = 120;

const styles = StyleSheet.create({
    
    player: {
        height: height/2-50,
        backgroundColor: '#000',
        width: width,
    },
});


export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.rctijkplayer = null;
        this.state = {
            playBackInfo: {
            },
            fadeAnim: new Animated.Value(1),
            hasController: false,
            videoURL: this.props.videoURL,
        };
    }
    componentDidMount() {
        let url = this.state.videoURL;
        // let url = "/Users/cong/Downloads/111.mov";
        this.rctijkplayer.start({url: url});
    }
    componentWillUnmount() {
        clearInterval(this.playbackInfoUpdater);
    }

    render() {
        return (
            <View>
                <RCTIJKPlayerWithController
                    ref={(rctijkplayer) => {
                        this.rctijkplayer = rctijkplayer;
                    }}
                    style={styles.player}
                    height={height/2-50}
                    width={width}
                    left={0}
                    top={0}
                >
                </RCTIJKPlayerWithController>
            </View>
        );
    }
}
