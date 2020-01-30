export const DELETE_ITEM='DELETE_ITEM';
export const CREATE_PRODUCT='CREATE_PRODUCT';
export const UPDATE_PRODUCT='UPDATE_PRODUCT';

export const deleteItem = (prodId) => {
    return {type:DELETE_ITEM,productId:prodId};
};

export const createProduct = (title,imageUrl,description,price) => {
    return {type:CREATE_PRODUCT,productTitle:title,productImageUrl:imageUrl,productDescription:description,productPrice:price};
};

export const updateProduct = (prodId,title,imageUrl,description) => {
    return {type:UPDATE_PRODUCT,productId:prodId, productTitle:title,productImageUrl:imageUrl,productDescription:description};
};
