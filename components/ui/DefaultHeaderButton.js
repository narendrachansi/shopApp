import React from 'react';
import {Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';
import COLORS from '../../colors/Colors';
const DefaultHeaderButton = props => {
    return(
        <HeaderButton {...props} iconSize={23} IconComponent={Ionicons} color={Platform.OS==='android' ? 'white' : COLORS.primary}  />
    );
};


export default DefaultHeaderButton;