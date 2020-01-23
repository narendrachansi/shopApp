import React from 'react';
import {TouchableOpacity, View, Text,StyleSheet} from 'react-native';
import COLORS from '../colors/Colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import DefaultText from '../components/DefaultText';
const DefaultButton = props => {
    return(
        <TouchableOpacity onPress={props.onPressHandler}>
            <View style={{...styles.button,...props.style}}>
                <DefaultText style={styles.text}>{props.children}</DefaultText>
            </View>
        </TouchableOpacity>
    );
};

const styles=StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        borderRadius:10,
        width:120,
        padding: 10
    },
    text: {
        color: "white",
        fontWeight: "bold",
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
    }
});

export default DefaultButton;