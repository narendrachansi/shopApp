import React from 'react';
import {View,Text,StyleSheet, Image, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { HeaderTitle } from 'react-navigation-stack';
import DefaultText from '../../components/DefaultText';
import DefaultButton from '../../components/DefaultButton';
import * as CartActions from '../../store/actions/cart';
const ProductDetailScreen = props => {
    const getId=props.navigation.getParam('id');
    const availableProducts=useSelector(state=>state.products.availableProducts);
    const selectedProduct=availableProducts.find(prod=>prod.id===getId);
    const dispatch= useDispatch();
    const addCartHandler = (selectedProduct) => {
        dispatch(CartActions.addToCart(selectedProduct));
    };
    return(
        <ScrollView style={styles.container}>
            <Image source={{uri:selectedProduct.imageUrl}} style={styles.image}/>
            <View style={styles.buttonContainer}>
                 <DefaultButton onPressHandler={addCartHandler(selectedProduct)}>Add To Cart</DefaultButton>
            </View>
            <DefaultText style={styles.text}>${selectedProduct.price}</DefaultText>
            <DefaultText style={styles.text}>{selectedProduct.description}</DefaultText>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navData => {
    return(
        {
            headerTitle: navData.navigation.getParam('title')
        }
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1
    },
    image: {
        width: '100%',
        height: 200
    },
    buttonContainer: {
        marginVertical: 10,
        alignItems: "center"
    },
    text: {
        textAlign: "center",
        marginHorizontal: 10,
        marginVertical: 10
    }
});

export default ProductDetailScreen;