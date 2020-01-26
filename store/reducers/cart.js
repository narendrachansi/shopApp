import {ADD_TO_CART} from '../actions/cart';
import {REMOVE_FROM_CART} from '../actions/cart';
import AddItem from '../../models/cart';
const initialState={
    items: {},
    totalAmount: 0
};
const cartReducer = (state=initialState,action) => {
    product=action.product;  
    let newOrUpdatedItem; 
    switch(action.type){
        case ADD_TO_CART:
            if(state.items[product.id]){
                /* Update existing  item*/
                newOrUpdatedItem =new AddItem(
                    state.items[product.id].quantity+1,
                    product.price,
                    product.title,
                    state.items[product.id].sum+product.price
                );
            }else{
                /* Add new item  */
                newOrUpdatedItem=new AddItem(1,product.price,product.title,product.price);
            }
            return {
                ...state,
                items:{...state.items,[product.id]:newOrUpdatedItem},
                totalAmount: state.totalAmount+product.price
            };
        case REMOVE_FROM_CART:
            const price=state.items[action.productId].productPrice;
            const quantity=state.items[action.productId].quantity;
            const sum = state.items[action.productId].sum;
            state.totalAmount=state.totalAmount-price;
            if(quantity>1){
                state.items[action.productId].quantity=quantity-1;
                state.items[action.productId].sum=sum-price;
            }else{
                delete state.items[action.productId];
            }
            return state;
        default:
            return state;
    }
};

export default cartReducer;