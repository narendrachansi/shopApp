export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (prod) =>{
    return {type:ADD_TO_CART,product:prod};
}

export const removeFromCart = (prodId) =>{
    return {type:REMOVE_FROM_CART,productId:prodId};
}