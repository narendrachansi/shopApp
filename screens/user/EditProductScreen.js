import React, {useState,useCallback,useEffect} from 'react';
import {ScrollView,View,Text,StyleSheet, Platform} from 'react-native';
import DefaultTextInput from '../../components/ui/DefaultTextInput';
import {useSelector,useDispatch} from 'react-redux';
import {HeaderButtons, HeaderButton, Item} from 'react-navigation-header-buttons';
import DefaultHeaderButton from '../../components/ui/DefaultHeaderButton';
import * as ProductActions from '../../store/actions/product';
const EditProductScreen = props => {
    const productId=props.navigation.getParam('id');
    const productItems=useSelector(state=>state.products.userProducts.find(prod=>prod.id===productId));
    const dispatch=useDispatch();
    const [title,setTitle]=useState(productItems ? productItems.title : '');
    const [imageUrl,setImageUrl]=useState(productItems ? productItems.imageUrl : '');
    const [description,setDescription]=useState(productItems ? productItems.description : '');
    const [price,setPrice]=useState(productItems ? productItems.price : '');
    
    
    const submitHandler = useCallback(() =>{
        if(productItems){
            dispatch(ProductActions.updateProduct(productId,title,imageUrl,description));
        }else{
            dispatch(ProductActions.createProduct(title,imageUrl,description,+price));
        }
        props.navigation.goBack();
    },[dispatch,productId,title,imageUrl,description,price]);

    useEffect(()=>{
        props.navigation.setParams({submit:submitHandler});
    },[submitHandler]);
    return(
        <ScrollView>
             <View>
                <Text style={styles.text}>Title:</Text>
                <DefaultTextInput val={title} changeText={text=>setTitle(text)}/>
            </View>
            <View>
                <Text style={styles.text}>Image URL:</Text>
                <DefaultTextInput val={imageUrl} changeText={text=>setImageUrl(text)}/>
            </View>
            <View>
                <Text style={styles.text}>Description:</Text>
                <DefaultTextInput val={description} changeText={text=>setDescription(text)}/>
            </View>
            {
            productItems ? null : (<View>
                <Text style={styles.text}>Price:</Text>
                <DefaultTextInput val={price} changeText={text=>setPrice(text)}/>
            </View>
            )
            }
        </ScrollView>
    );
};
EditProductScreen.navigationOptions = navData =>{
    const submitFn=navData.navigation.getParam('submit');
    return(
        {
            headerTitle: 'Edit product',
             headerRight: ()=> <HeaderButtons HeaderButtonComponent={DefaultHeaderButton} >
             <Item 
             title='edit' 
             iconName= {Platform.OS==='android' ? 'md-checkmark' : 'ios-checkmark'}
             onPress={submitFn} />
         </HeaderButtons>
        }
    );
};

const styles=StyleSheet.create({
    text: {
        fontWeight:"bold"
    }
});

export default EditProductScreen;