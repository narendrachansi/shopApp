import React,{useEffect,useState,useCallback} from 'react';
import {FlatList,Text, Platform, View, ActivityIndicator, StyleSheet, Button} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import {HeaderButtons, HeaderButton, Item} from 'react-navigation-header-buttons';
import DefaultHeaderButton from '../../components/ui/DefaultHeaderButton';
import DefaultButton from '../../components/DefaultButton';
import * as ProductActions from '../../store/actions/product';
import COLORS from '../../colors/Colors';
const ProductOverviewScreen = props => {
    const [isLoading,setIsLoading]=useState(false);
    const [errorMsg,setErrorMsg]=useState('');
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
    const loadProducts=useCallback(async ()=>{
        setErrorMsg(null);
        setIsLoading(true);
        try{
            await dispatch(ProductActions.getProduct());
        }catch(err){
            setErrorMsg(err.message);
        }
        setIsLoading(false);
    },[dispatch,setIsLoading,setErrorMsg]);

    /* re-fetch products on navigation in case details are updated in database or by other user  */
    useEffect(()=>{
        const willFocusSub=props.navigation.addListener('willFocus',loadProducts);
        return ()=>{
            willFocusSub.remove();
        };
    },[loadProducts]);

    /* dispatch loadProducts function that will fetch data provided by API */
    useEffect(()=>{
        loadProducts();
    },[dispatch,loadProducts]);

    if(errorMsg){
        return(
            <View style={styles.centered}>
                <Text>{errorMsg}</Text>
                <DefaultButton onPressHandler={loadProducts}>Try Again</DefaultButton>
            </View>
        );
    }
   
    if(isLoading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={COLORS.primary}  />
            </View>
        );
    }

    if(!isLoading && products.length===0){
        return(
            <View style={styles.centered}>
               <Text>No products found! Start addding products now.</Text>
            </View>
        );
    }

    return (

        <FlatList
        keyExtractor={item=>item.id}
        data={products} 
        renderItem={itemData=> <ProductItem 
            title={itemData.item.title} 
            price={itemData.item.price} 
            imageUrl={itemData.item.imageUrl} 
        >
            <DefaultButton  onPressHandler={viewDetailHandler.bind(this,itemData.item.id,itemData.item.title)} >View Details</DefaultButton>
            <DefaultButton  onPressHandler={addCartHandler.bind(this,itemData.item)} >Add To Cart</DefaultButton>
        </ProductItem>

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

const styles=StyleSheet.create({
    centered: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    }
});
export default ProductOverviewScreen;