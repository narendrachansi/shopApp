import React from 'react';
import {TextInput,StyleSheet} from 'react-native';

const DefaultTextInput = props => {
    return(
        <TextInput style={{...styles.input,...props.style}} value={props.val} onChangeText={props.changeText} />
    );
};

const styles=StyleSheet.create({
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '100%',
    }
});

export default DefaultTextInput;