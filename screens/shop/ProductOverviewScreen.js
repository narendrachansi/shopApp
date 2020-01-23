import React from 'react';
import {FlatList,Text} from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
const ProductOverviewScreen = props => {
    const products=useSelector(state=>state.products.availableProducts);
    return (
        <FlatList
        keyExtractor={item=>item.id}
        data={products} 
        renderItem={itemData=> <ProductItem 
            title={itemData.item.title} 
            price={itemData.item.price} 
            imageUrl={itemData.item.imageUrl} 
            onViewDetail={()=>{}}
            onAddCart={()=>{}}
            />
        } 
        />
    );
};

export default ProductOverviewScreen;