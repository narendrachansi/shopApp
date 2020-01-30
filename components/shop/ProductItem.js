import React from 'react';
import {View,Text,FlatList,StyleSheet, Image, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import DefaultButton from '../DefaultButton';
import DefaultText from '../DefaultText';
import Card from '../Card';
const ProductItem = props => {
    let TouchableCom = TouchableOpacity;
    if(Platform.OS==='android' && Platform.Version>=21){
        TouchableCom = TouchableNativeFeedback;
    }
    return(
        <TouchableCom onPress={props.onViewDetail}>
            <View>
                <Card>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: props.imageUrl}} style={styles.image} />
                    </View>
                    <View style={styles.details}>
                        <DefaultText>{props.title}</DefaultText>
                        <DefaultText>${props.price}</DefaultText>
                    </View>
                    <View style={styles.buttonContainer}>
                        {props.children}
                    </View>
                </Card>
            </View>
        </TouchableCom>
    );
};
const styles=StyleSheet.create({
    image: {
        width: '100%',
        height: '100%'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between", 
        height: '15%',
        marginHorizontal: 10,
        marginBottom: 20,
    },
    details: {
        height: '25%',
        padding: 10,
        alignItems: "center"
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden"
    }
});

export default ProductItem;