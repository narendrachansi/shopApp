import PRODUCTS from '../../data/dummy-data';
import {DELETE_ITEM,UPDATE_PRODUCT,CREATE_PRODUCT} from '../actions/product';
import Product from '../../models/product';
const initialState={
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter(prod => prod.ownerId==='u1')
};
export default  (state=initialState,action)=> {
    switch(action.type){
        case DELETE_ITEM:
            const selectedProductId=action.productId;
            const updateUserProducts=state.userProducts.filter(prod=>prod.id!==selectedProductId);
            const updatedAvailableProducts=state.availableProducts.filter(prod=> prod.id!==selectedProductId);
            return {...state,
            userProducts:updateUserProducts,
            availableProducts: updatedAvailableProducts
            };
        case CREATE_PRODUCT:
            const newProduct=new Product(
                new Date().toString(),
                'c1',
                action.productTitle,
                action.productImageUrl,
                action.productDescription,
                action.productPrice
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            };
        case UPDATE_PRODUCT:
           const selectedUserProductIndex=state.userProducts.findIndex(prod=>prod.id===action.productId);
           const updatedUserProduct=new Product(
               action.productId,
               state.userProducts[selectedUserProductIndex].ownerId,
               action.productTitle,
               action.productImageUrl,
               action.productDescription,
               state.userProducts[selectedUserProductIndex].price
           );          
           const updatedUserState=[...state.userProducts];
           updatedUserState[selectedUserProductIndex]=updatedUserProduct;

           const selectedProductIndex=state.availableProducts.findIndex(prod=>prod.id===action.productId);
           const updatedProduct=new Product(
               action.productId,
               state.availableProducts[selectedProductIndex].ownerId,
               action.productTitle,
               action.productImageUrl,
               action.productDescription,
               state.availableProducts[selectedProductIndex].price
           );
           const updatedAvailableState=[...state.availableProducts];
           updatedAvailableState[selectedProductIndex]=updatedProduct;
           return {
               ...state,
                availableProducts: updatedAvailableState,
                userProducts: updatedUserState
                };
        default:
            return state;  
    }
}

