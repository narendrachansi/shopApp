import React, {useCallback,useEffect,useReducer,useState} from 'react';
import {ScrollView,View,Text,StyleSheet, Platform, TextInput, Alert, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import DefaultTextInput from '../../components/ui/Input';
import {useSelector,useDispatch} from 'react-redux';
import {HeaderButtons, HeaderButton, Item} from 'react-navigation-header-buttons';
import DefaultHeaderButton from '../../components/ui/DefaultHeaderButton';
import * as ProductActions from '../../store/actions/product';
import Input from '../../components/ui/Input';
const UPDATE_FORM_INPUT='UPDATE_FORM_INPUT';
import COLORS from '../../colors/Colors';
const formReducer= (state,action)=>{
    if(action.type===UPDATE_FORM_INPUT){
        const updatedInputValues={...state.inputValues,
        [action.inputIdentifier]:action.value
        };
        const updatedInputValidities={...state.inputValidities,
        [action.inputIdentifier]:action.isValid
        };
        let isFormValid=true;
        for(const key in updatedInputValidities){
           isFormValid= isFormValid && updatedInputValidities[key];
        }
        return {
            inputValues: updatedInputValues,
            inputValidities: updatedInputValidities,
            isFormValid: isFormValid
        };
    }
    return state;
};

const EditProductScreen = props => {
    const [isLoading,setIsLoading]=useState(false);
    const [errorMsg,setErrorMsg]=useState(null);
    const productId=props.navigation.getParam('id');
    const productItems=useSelector(state=>state.products.userProducts.find(prod=>prod.id===productId));
    const dispatch=useDispatch();


    const [formState,formDispatch]=useReducer(formReducer,{
        inputValues: {
            title: productItems ? productItems.title : '',
            imageUrl: productItems ? productItems.imageUrl : '',
            description: productItems ? productItems.description : '',
            price: productItems ? productItems.price : '',
        },
        inputValidities: {
            title: productItems ? true : false,
            imageUrl: productItems ? true : false,
            description: productItems ? true : false,
            price: productItems ? true : false,
        },
        isFormValid: productItems ? true : false
    });
    
    useEffect(()=>{
        if(errorMsg){
            Alert.alert('Error Message','Error!',[{text:'okay'}]);
        }
    },[errorMsg]);

    const submitHandler = useCallback(async () =>{
        //console.log(formState);
        if(!formState.isFormValid){
            Alert.alert(
                'Wrong input!',
                'Check the errors in the form',
                [
                    {text:'okay'}
                ]
            );
            return;
        }
        setIsLoading(true);
        setErrorMsg(null);
        try{
            if(productItems){
                await dispatch(ProductActions.updateProduct(productId,formState.inputValues.title,formState.inputValues.imageUrl,formState.inputValues.description));
            }else{
                await dispatch(ProductActions.createProduct(formState.inputValues.title,formState.inputValues.imageUrl,formState.inputValues.description,formState.inputValues.price));
            }
            props.navigation.goBack();
        }catch(err){
            console.log(err.message);
            setErrorMsg(err.message);
        }       
        setIsLoading(false);
    },[dispatch,productId,formState,setIsLoading]);

    useEffect(()=>{
        props.navigation.setParams({submit:submitHandler});
    },[submitHandler]);

    const inputHandler= useCallback((textIdentifier,text,isValid) =>{
        formDispatch(
            {
                type:UPDATE_FORM_INPUT,
                value:text,
                inputIdentifier:textIdentifier,
                isValid:isValid
            })
    },[formDispatch]);

    if(isLoading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={COLORS.primary}  />
            </View>
        );
    }

    return(
    <KeyboardAvoidingView
    style={{flex:1}}
    behavior="padding"
    keyboardVerticalOffset={100}
    >
        <ScrollView>
             <Input 
              id='title'
              label='Title:'
              errMsg='Please enter valid title!'
              onInputChange={inputHandler}
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              required
              initialValue={productItems ? productItems.title : ''}
              initiallyValid={productItems ? true : false}
             />
            <Input 
              id='imageUrl'
              label='Image URL:'
              errMsg='Image URL is invalid!'
              onInputChange={inputHandler}
              initialValue={productItems ? productItems.imageUrl : ''}
              initiallyValid={productItems ? true : false}
              keyboardType="default"
              autoCorrect
              returnKeyType="next"
              required
             />
             <Input 
              id='description'
              label='Description:'
              errMsg='Description is not valid!'
              onInputChange={inputHandler}
              initialValue={productItems ? productItems.description : ''}
              initiallyValid={productItems ? true : false}
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              numberOfLines={3}
              required
             />
            {
            productItems ? null : (
                <Input 
                id='price'
                label='Price:'
                errMsg='Price is invalid!'
                onInputChange={inputHandler}
                initialValue={productItems ? productItems.price : ''}
                initiallyValid={productItems ? true : false}
                keyboardType="decimal-pad"
                returnKeyType="next"
                required
                min={0.1}
               />
            )
            }
        </ScrollView>
        </KeyboardAvoidingView>
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
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '100%',
    },
    error: {
        color:'red'
    },
    centered: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    }
});


export default EditProductScreen;