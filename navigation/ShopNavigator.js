import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import COLORS from '../colors/Colors';
import {Platform} from 'react-native';
import OrdersScreen from '../screens/shop/OrdersScreen';
import {Ionicons} from '@expo/vector-icons';
const defaultNavOptions={
    headerStyle: {
        backgroundColor: Platform.OS=='android' ? COLORS.primary : ''
    },
    headerTintColor: Platform.OS=='android' ? 'white': COLORS.primary,
};
const ProductNavigator= createStackNavigator({
    productOverview: ProductOverviewScreen,
    productDetail: ProductDetailScreen,
    cart:CartScreen,
},{
    navigationOptions: {
        drawerIcon: drawerConfig => 
        <Ionicons 
        name={Platform.OS==='android' ? 'md-cart' : 'ios-cart'} 
        size={23}
        color={drawerConfig.tintColor}
        />
        
    },
    defaultNavigationOptions: defaultNavOptions
});

const orderNavigator=createStackNavigator({
    order:OrdersScreen
},{
    navigationOptions: {
        drawerIcon: drawerConfig => 
        <Ionicons 
        name={Platform.OS==='android' ? 'md-create' : 'ios-create'} 
        size={23}
        color={drawerConfig.tintColor}
        />
        
    },
    defaultNavigationOptions:defaultNavOptions
});

const shopNavigator= createDrawerNavigator({
    Products: ProductNavigator,
    Orders: orderNavigator
},{
    contentOptions:{
        activeTintColor:COLORS.primary
    }
});

export default createAppContainer(shopNavigator);