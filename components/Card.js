import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

const Card = props => {
    return(
        <View style={styles.card}>{props.children}</View>
    );
};

const styles=StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        backgroundColor: 'white',
        elevation:8,
        borderRadius: 10,
        marginTop: 15,
        height: 300,
    }
});

export default Card;