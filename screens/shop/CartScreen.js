import React from 'react';
import {View,Text,StyleSheet,FlatList, Button} from 'react-native';
import {useSelector} from 'react-redux';
import DefaultButton from '../../components/DefaultButton';
import Card from '../../components/Card';
import COLORS from '../../colors/Colors';
import {useDispatch} from 'react-redux';
import {removeFromCart} from '../../store/actions/cart';
import {addOrder} from '../../store/actions/orders';

import CartItem from '../../components/shop/CartItem';
const CartScreen = props => {
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state =>state.cart.items);
    const cartItemsArray=[];
    const dispatch=useDispatch();
   for(const key in cartItems){
        cartItemsArray.push({
            productId: key,
            productTitle: cartItems[key].productTitle,
            productPrice: cartItems[key].productPrice,
            quantity: cartItems[key].quantity,
            sum: cartItems[key].sum,
        });
   }
   //console.log(cartItemsArray);
    return(
        <View>
            <Card style={styles.cart}>
                <View style={styles.cartHeader}>
                    <Text style={styles.text}>Total <Text style={styles.amountText}>${totalAmount.toFixed(2)}</Text></Text>
                    <DefaultButton onPressHandler={()=>{dispatch(addOrder(cartItemsArray,totalAmount))}}>Order Now</DefaultButton>
                </View>
            </Card>            
            <FlatList 
            keyExtractor = {(item,key)=>item.productId}
            data={cartItemsArray}
            renderItem = {(itemData)=>{
               return <CartItem 
               showDeleteBtn
               quantity={itemData.item.quantity}
               title={itemData.item.productTitle}
               sum={itemData.item.sum}
               onDeleteHandler={()=>{dispatch(removeFromCart(itemData.item.productId))}} 
               />
            }}
            />
        </View>        
    );
};

const styles=StyleSheet.create({
    cart: {
        height: 60,
    },
    cartHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 5
    },
    text: {
        fontSize: 20, 
        fontWeight: "bold"
    },
    amountText: {
        color: COLORS.primary,
        fontWeight: "bold",
        fontSize: 20
    },
   
});

export default CartScreen;