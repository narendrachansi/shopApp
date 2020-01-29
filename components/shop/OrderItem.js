import React, {useState} from 'react';
import {View,Text,ScrollView, StyleSheet} from 'react-native';
import Card from '../../components/Card';
import DefaultButton from '../../components/DefaultButton';
import CardItem from '../../components/shop/CartItem';

const OrderItem = props => {
    const [showDetails,setShowDetails]=useState(false);
    return(
        <View>
            <Card style={styles.Card}>
                <View style={styles.content}>
                    <Text>${props.amount.toFixed(2)}</Text>
                    <Text>{props.date.toString()}</Text>
                </View>  
                <View style={styles.button}>
                <DefaultButton onPressHandler={()=>{setShowDetails(prevState=>!prevState)}}>{showDetails ? 'Hide Details' : 'View Details' }</DefaultButton>
                </View>     
                {showDetails && (
                    <View>
                        {props.cartItems.map(cartItem=>{
                        return (<CardItem 
                        quantiy={cartItem.quantiy}
                        title={cartItem.productTitle}
                        sum={cartItem.sum}
                        />);
                        })}
                    </View>
                )}         
            </Card>
        </View>
    );
};

const styles=StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical:5,
        marginHorizontal:5
    },
    Card: {
        height:'auto'
    },
    button:{
        alignItems: "center",
        marginVertical:5
    }
});

export default OrderItem;