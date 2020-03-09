import React from 'react';
import {FlatList,Text,StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderButtons, HeaderButton, Item} from 'react-navigation-header-buttons';
import DefaultHeaderButton from '../../components/ui/DefaultHeaderButton';
import OrderItem from '../../components/shop/OrderItem';
const OrdersScreen = props => {
    const itemsData= useSelector(state => state.orders.orders);
    //console.log(itemsData);
    return(
       <FlatList 
        keyExtractor={(item,key)=>item.id}
        data={itemsData}
        renderItem = {(itemData) =>{
            return(
                <OrderItem  amount={itemData.item.totalAmount} date={itemData.item.date} cartItems={itemData.item.items} />
            );
        }}
       />
    );
};

OrdersScreen.navigationOptions = navData => {
    return(
        {
            headerLeft: ()=> <HeaderButtons HeaderButtonComponent={DefaultHeaderButton} >
                    <Item 
                    title='menu' 
                    iconName= {Platform.OS==='android' ? 'md-menu' : 'ios-menu'}
                    onPress={()=>{navData.navigation.toggleDrawer()}} />
                </HeaderButtons>,
        }
    );
};


export default OrdersScreen;