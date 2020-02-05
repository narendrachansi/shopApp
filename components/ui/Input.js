import React,{useReducer,useEffect} from 'react';
import {TextInput,View,Text,StyleSheet} from 'react-native';
const INPUT_CHANGE='INPUT_CHANGE';
const INPUT_BLUR='INPUT_BLUR';
const inputReducer= (state,action) =>{
    switch(action.type){
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            };
        default:
            return state;
    }
}
const Input = props => {
    const [inputState,dispatch]=useReducer(inputReducer,{
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched:false
    });
    const {onInputChange,id} = props;
    useEffect(()=>{
        //console.log(inputState);
        if(inputState.touched){
            onInputChange(id,inputState.value,inputState.isValid);
        }        
    },[onInputChange,inputState,id]);
    const inputTextHandler =text=>{
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
          isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
          isValid = false;
        }
        if (props.min != null && +text < props.min) {
          isValid = false;
        }
        if (props.max != null && +text > props.max) {
          isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
          isValid = false;
        }
        dispatch({type:INPUT_CHANGE,value:text,isValid:isValid})
    };
    const lostFocusHandler=()=>{
        dispatch({type:INPUT_BLUR});
    };
   
    return(
        <View>
            <Text style={styles.text}>{props.label}</Text>
            <TextInput 
            {...props}
            value={inputState.value} 
            onChangeText={inputTextHandler} 
            style={styles.input} 
            onBlur={lostFocusHandler}
            />
            {!inputState.isValid && inputState.touched && (
            <Text style={styles.error}>{props.errMsg}</Text>
            )}
        </View>
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
    }
});

export default Input;