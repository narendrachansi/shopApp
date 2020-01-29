import React from 'react';
import {FlatList,Text, Platform} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import {HeaderButtons, HeaderButton, Item} from 'react-navigation-header-buttons';
import DefaultHeaderButton from '../../components/ui/DefaultHeaderButton';
const ProductOverviewScreen = props => {
    const products=useSelector(state=>state.products.availableProducts);
    const viewDetailHandler = (productId, productTitle) => {
        props.navigation.navigate({
            routeName: 'productDetail',
            params: {
                id: productId,
                title: productTitle
            }
        });
    };
    const dispatch=useDispatch();
    const addCartHandler = (item) => {
        dispatch(cartActions.addToCart(item));
    };
   
    return (
        <FlatList
        keyExtractor={item=>item.id}
        data={products} 
        renderItem={itemData=> <ProductItem 
            title={itemData.item.title} 
            price={itemData.item.price} 
            imageUrl={itemData.item.imageUrl} 
            onViewDetail={viewDetailHandler.bind(this,itemData.item.id,itemData.item.title)}
            onAddCart={addCartHandler.bind(this,itemData.item)}
            />
        } 
        />
    );
};

ProductOverviewScreen.navigationOptions = navData => {
    return(
        {
            headerLeft: ()=> <HeaderButtons HeaderButtonComponent={DefaultHeaderButton} >
                    <Item 
                    title='menu' 
                    iconName= {Platform.OS==='android' ? 'md-menu' : 'ios-menu'}
                    onPress={()=>{navData.navigation.toggleDrawer()}} />
                </HeaderButtons>,
            headerRight: ()=> <HeaderButtons HeaderButtonComponent={DefaultHeaderButton} >
                    <Item 
                    title='cart' 
                    iconName= {Platform.OS==='android' ? 'md-cart' : 'ios-cart'}
                    onPress={()=>{navData.navigation.navigate({routeName:'cart'})}} />
                </HeaderButtons>
            
        }
    );
};

export default ProductOverviewScreen;