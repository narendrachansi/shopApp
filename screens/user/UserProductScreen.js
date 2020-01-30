import React from 'react';
import {View,FlatList,Alert} from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import DefaultButton from '../../components/DefaultButton';
import {HeaderButtons, HeaderButton, Item} from 'react-navigation-header-buttons';
import DefaultHeaderButton from '../../components/ui/DefaultHeaderButton';
import {useDispatch} from 'react-redux';
import * as ProductActions from '../../store/actions/product';
const UserProductScreen = props => {
    const items= useSelector(state=>state.products.userProducts);
    const dispatch=useDispatch();
    const editDetailHandler = (id,title) => {
        props.navigation.navigate('editProduct',{id:id,title:title});
    };
    const deleteHandler=(id)=>{
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete this item?',
            [
                {text:'No',style:'default'},
                {
                    text:'Yes',
                    style:'destructive',
                    onPress: ()=>{
                        dispatch(ProductActions.deleteItem(id));
                    }
                }
            ]
            );
    };
    return(
        <FlatList
        keyExtractor={item=>item.id}
        data={items} 
        renderItem={itemData=> <ProductItem 
            title={itemData.item.title} 
            price={itemData.item.price} 
            imageUrl={itemData.item.imageUrl} 
            >
                <DefaultButton  onPressHandler={editDetailHandler.bind(this,itemData.item.id,itemData.item.title)} >Edit</DefaultButton>
                <DefaultButton  onPressHandler={deleteHandler.bind(this,itemData.item.id)} >Delete</DefaultButton>
            </ProductItem>
        } 
        />
    );
};

UserProductScreen.navigationOptions = navData =>{
    return(
        {
            headerTitle: 'Your Products',
            headerLeft: ()=> <HeaderButtons HeaderButtonComponent={DefaultHeaderButton} >
                <Item 
                title='menu' 
                iconName= {Platform.OS==='android' ? 'md-list' : 'ios-list'}
                onPress={()=>{navData.navigation.toggleDrawer()}} />
            </HeaderButtons>,
             headerRight: ()=> <HeaderButtons HeaderButtonComponent={DefaultHeaderButton} >
             <Item 
             title='add' 
             iconName= {Platform.OS==='android' ? 'md-create' : 'ios-create'}
             onPress={()=>{navData.navigation.navigate('editProduct')}} />
         </HeaderButtons>
        }
    );
};

export default UserProductScreen;
