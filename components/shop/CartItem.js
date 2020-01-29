import React from 'react';
import {View,Text,StyleSheet,Platform, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
const CartItem = props => {
    //console.log(props.itemData);
    return(
        <View style={styles.cartBody}>
            <View style={styles.cartLeftBody}>
    <Text><Text>{props.quantity}</Text><Text>{' '}</Text>{props.title}</Text>
            </View>
            <View style={styles.cartRightBody}>
                <Text>${props.sum.toFixed(2)}</Text>
                {props.showDeleteBtn && <TouchableOpacity onPress={props.onDeleteHandler} style={styles.deleteButton}>
                    <Ionicons 
                    name={Platform.OS==='android' ? 'md-trash' : 'ios-trash'} 
                    size={22}
                    color='red'
                    />
                </TouchableOpacity>}
            </View>
            
        </View>
    );
};

const styles=StyleSheet.create({
    cartBody: {
        flex: 1,
        flexDirection: "row",
        marginTop: 10,
        marginHorizontal:5
    },
    cartLeftBody: {
        flex: 1,
        flexDirection: "row"
    },
    cartRightBody: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "space-between",
    },
    deleteButton: {
        marginLeft: 10
    }
});

export default CartItem;