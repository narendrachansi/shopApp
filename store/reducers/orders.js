import {ADD_ORDER} from '../actions/orders';
import addOrderItems from '../../models/order';
const initialState= {
   orders: []
};
const orderReducer= (state=initialState,action) => {
    switch(action.type){
        case ADD_ORDER: {
            const orderData = new addOrderItems(
                new Date().toString(),
                action.orderData.items,
                action.orderData.amount,
                new Date()
            );
            return {...state,
            orders: state.orders.concat(orderData)
            };
        }
        default: 
            return state;
    }
};

export default orderReducer;