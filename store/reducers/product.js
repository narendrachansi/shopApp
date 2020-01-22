import PRODUCTS from '../../data/dummy-data';
const initialState={
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter(prod => prod.owerid==='c1')
};
const productReducer = (state=initialState,action)=> {
    return state;
}