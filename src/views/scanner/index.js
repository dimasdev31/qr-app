import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions
} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import {
  BarCodeScanner
} from 'expo-barcode-scanner';

import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";



const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;


const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "#fff";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "red";  

const iconScanColor = "#fff";




export default class Scanner extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  makeSlideOutTranslation(translationType, fromValue) {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18
      },
      to: {
        [translationType]: fromValue
      }
    };
  }


  getPermissionsAsync = async() => {
    const {
      status
    } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    });
  };

  render() {
    const {
      hasCameraPermission,
      scanned
    } = this.state;

    if (hasCameraPermission === null) {
      return <Text> Requesting
      for camera permission </Text>;
    }
    if (hasCameraPermission === false) {
      return <Text> No access to camera </Text>;
    }
    return (      
      <View style = {
          {                    
            flex: 1, 
            flexDirection: 'column',                        
          }
        }>

        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        
        <View style={styles.rectangleContainer}>
          <View style={styles.topOverlay}>
            <Text style={{ fontSize: 30, color: "white" }}>
              QR CODE SCANNER
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.leftAndRightOverlay} />

            <View style={styles.rectangle}>
              <Icon
                name="ios-qr-scanner"
                size={SCREEN_WIDTH * 0.73}
                color={iconScanColor}
              />
              <Animatable.View
                style={styles.scanBar}
                direction="alternate-reverse"
                iterationCount="infinite"
                duration={1700}
                easing="linear"
                animation={this.makeSlideOutTranslation(
                  "translateY",
                  SCREEN_WIDTH * -0.54
                )}
              />
              
            </View>

            <View style={styles.leftAndRightOverlay} />
            
          </View>

          <View style={styles.bottomOverlay} />
        </View>                              

        {
          scanned && ( 
            <Button title = {
              'ketuk untuk scan ulang'
            }
            onPress = {
              () => this.setState({
                scanned: false
              })
            }
            />
          )
        } 
      </View>      
      
    );
  }

  handleBarCodeScanned = ({
    type,
    data
  }) => {
    this.setState({
      scanned: true
    });
    alert(`${data}`);
  };
}

const styles = {
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    zIndex: 10
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",    
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center",    
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  }
};
